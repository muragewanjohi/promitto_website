-- Supabase Advisor warning fixes for Promitto.
-- Run this in Supabase SQL Editor after reviewing table names.
--
-- Fixes:
-- 1. Function Search Path Mutable warnings for known trigger functions.
-- 2. RLS Policy Always True warnings caused by policies like USING (true).
--
-- Notes:
-- - Public content tables remain publicly readable, but with explicit role/published predicates.
-- - Personal profile tables are restricted to the owning user plus admins.

begin;

-- Central admin role helper used by RLS policies.
create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.users u
    where u.id = auth.uid()
      and u.role = 'admin'
  );
$$;

revoke all on function public.is_admin_user() from public;
grant execute on function public.is_admin_user() to authenticated;

-- Fix mutable search_path warnings for trigger/helper functions shown by Advisor.
do $$
declare
  function_signature text;
  function_signatures text[] := array[
    'public.update_properties_updatedat()',
    'public.update_property_designs_updatedat()',
    'public.update_updated_at_column()',
    'public.handle_new_user()'
  ];
begin
  foreach function_signature in array function_signatures loop
    if to_regprocedure(function_signature) is not null then
      execute format(
        'alter function %s set search_path = public, pg_temp',
        function_signature
      );
    end if;
  end loop;
end $$;

-- Drop only policies whose expression is literally true, for targeted tables.
do $$
declare
  target_tables text[] := array[
    'properties',
    'property_designs',
    'media_items',
    'faqs',
    'property_feature_map',
    'property_types',
    'property_statuses',
    'roof_types',
    'features',
    'blog_posts',
    'business_entities',
    'customer_details'
  ];
  t text;
  p record;
begin
  foreach t in array target_tables loop
    if to_regclass(format('public.%I', t)) is not null then
      for p in
        select policyname
        from pg_policies
        where schemaname = 'public'
          and tablename = t
          and (
            lower(regexp_replace(coalesce(qual, ''), '[\s\(\)]', '', 'g')) = 'true'
            or lower(regexp_replace(coalesce(with_check, ''), '[\s\(\)]', '', 'g')) = 'true'
          )
      loop
        execute format('drop policy if exists %I on public.%I', p.policyname, t);
      end loop;
    end if;
  end loop;
end $$;

-- Public content tables. These are intentionally public read, admin write.
do $$
declare
  t text;
  public_tables text[] := array[
    'properties',
    'property_designs',
    'property_feature_map',
    'property_types',
    'property_statuses',
    'roof_types',
    'features'
  ];
begin
  foreach t in array public_tables loop
    if to_regclass(format('public.%I', t)) is not null then
      execute format('alter table public.%I enable row level security', t);

      execute format('drop policy if exists %I on public.%I', t || '_public_read', t);
      execute format('drop policy if exists %I on public.%I', t || '_admin_write', t);

      execute format(
        'create policy %I on public.%I for select to anon, authenticated using (auth.role() in (''anon'', ''authenticated''))',
        t || '_public_read',
        t
      );

      execute format(
        'create policy %I on public.%I for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user())',
        t || '_admin_write',
        t
      );
    end if;
  end loop;
end $$;

-- Published content tables. Public can read published rows only; admins can manage all.
do $$
declare
  t text;
  published_tables text[] := array['media_items', 'faqs', 'blog_posts'];
  has_published boolean;
  public_expr text;
begin
  foreach t in array published_tables loop
    if to_regclass(format('public.%I', t)) is not null then
      execute format('alter table public.%I enable row level security', t);

      select exists (
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = t
          and column_name = 'published'
      ) into has_published;

      public_expr := case
        when has_published then 'coalesce(published, false) = true'
        else 'auth.role() in (''anon'', ''authenticated'')'
      end;

      execute format('drop policy if exists %I on public.%I', t || '_public_read', t);
      execute format('drop policy if exists %I on public.%I', t || '_public_published_read', t);
      execute format('drop policy if exists %I on public.%I', t || '_admin_manage', t);

      execute format(
        'create policy %I on public.%I for select to anon, authenticated using (%s)',
        t || '_public_published_read',
        t,
        public_expr
      );

      execute format(
        'create policy %I on public.%I for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user())',
        t || '_admin_manage',
        t
      );
    end if;
  end loop;
end $$;

-- User-owned profile/application tables. Owner can manage own row; admins can manage all.
do $$
declare
  t text;
  owned_tables text[] := array['business_entities', 'customer_details'];
begin
  foreach t in array owned_tables loop
    if to_regclass(format('public.%I', t)) is not null then
      execute format('alter table public.%I enable row level security', t);

      execute format('drop policy if exists %I on public.%I', t || '_owner_select', t);
      execute format('drop policy if exists %I on public.%I', t || '_owner_insert', t);
      execute format('drop policy if exists %I on public.%I', t || '_owner_update', t);
      execute format('drop policy if exists %I on public.%I', t || '_owner_delete', t);
      execute format('drop policy if exists %I on public.%I', t || '_admin_manage', t);

      execute format(
        'create policy %I on public.%I for select to authenticated using (user_id = auth.uid())',
        t || '_owner_select',
        t
      );
      execute format(
        'create policy %I on public.%I for insert to authenticated with check (user_id = auth.uid())',
        t || '_owner_insert',
        t
      );
      execute format(
        'create policy %I on public.%I for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())',
        t || '_owner_update',
        t
      );
      execute format(
        'create policy %I on public.%I for delete to authenticated using (user_id = auth.uid())',
        t || '_owner_delete',
        t
      );
      execute format(
        'create policy %I on public.%I for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user())',
        t || '_admin_manage',
        t
      );
    end if;
  end loop;
end $$;

commit;

