-- Incident hardening baseline for Promitto (Supabase)
-- Run in Supabase SQL editor as project owner.
-- Review table/bucket names before executing in production.

begin;

-- 1) Helper: admin check based on public.users.role
create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
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

-- 2) Enable RLS
alter table if exists public.users enable row level security;
alter table if exists public.properties enable row level security;
alter table if exists public.property_designs enable row level security;
alter table if exists public.media_items enable row level security;
alter table if exists public.faqs enable row level security;
alter table if exists public.property_feature_map enable row level security;
alter table if exists public.property_types enable row level security;
alter table if exists public.property_statuses enable row level security;
alter table if exists public.roof_types enable row level security;
alter table if exists public.features enable row level security;

-- 3) Users table
drop policy if exists users_self_read on public.users;
drop policy if exists users_self_update on public.users;
drop policy if exists users_admin_all on public.users;

create policy users_self_read
  on public.users
  for select
  to authenticated
  using (id = auth.uid());

create policy users_self_update
  on public.users
  for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy users_admin_all
  on public.users
  for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

-- 4) Content tables: public read, admin write
drop policy if exists properties_public_read on public.properties;
drop policy if exists properties_admin_write on public.properties;
create policy properties_public_read
  on public.properties
  for select
  to anon, authenticated
  using (true);
create policy properties_admin_write
  on public.properties
  for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists property_designs_public_read on public.property_designs;
drop policy if exists property_designs_admin_write on public.property_designs;
create policy property_designs_public_read
  on public.property_designs
  for select
  to anon, authenticated
  using (true);
create policy property_designs_admin_write
  on public.property_designs
  for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists media_items_public_read on public.media_items;
drop policy if exists media_items_admin_write on public.media_items;
create policy media_items_public_read
  on public.media_items
  for select
  to anon, authenticated
  using (true);
create policy media_items_admin_write
  on public.media_items
  for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists faqs_public_read on public.faqs;
drop policy if exists faqs_admin_write on public.faqs;
create policy faqs_public_read
  on public.faqs
  for select
  to anon, authenticated
  using (true);
create policy faqs_admin_write
  on public.faqs
  for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

-- Mapping/config tables (readable, admin mutable)
drop policy if exists property_feature_map_public_read on public.property_feature_map;
drop policy if exists property_feature_map_admin_write on public.property_feature_map;
create policy property_feature_map_public_read
  on public.property_feature_map
  for select
  to anon, authenticated
  using (true);
create policy property_feature_map_admin_write
  on public.property_feature_map
  for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists property_types_public_read on public.property_types;
drop policy if exists property_types_admin_write on public.property_types;
create policy property_types_public_read
  on public.property_types
  for select
  to anon, authenticated
  using (true);
create policy property_types_admin_write
  on public.property_types
  for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists property_statuses_public_read on public.property_statuses;
drop policy if exists property_statuses_admin_write on public.property_statuses;
create policy property_statuses_public_read
  on public.property_statuses
  for select
  to anon, authenticated
  using (true);
create policy property_statuses_admin_write
  on public.property_statuses
  for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists roof_types_public_read on public.roof_types;
drop policy if exists roof_types_admin_write on public.roof_types;
create policy roof_types_public_read
  on public.roof_types
  for select
  to anon, authenticated
  using (true);
create policy roof_types_admin_write
  on public.roof_types
  for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

-- `public.features` is optional in some deployments.
do $$
begin
  if to_regclass('public.features') is not null then
    execute 'drop policy if exists features_public_read on public.features';
    execute 'drop policy if exists features_admin_write on public.features';
    execute $sql$
      create policy features_public_read
        on public.features
        for select
        to anon, authenticated
        using (true)
    $sql$;
    execute $sql$
      create policy features_admin_write
        on public.features
        for all
        to authenticated
        using (public.is_admin_user())
        with check (public.is_admin_user())
    $sql$;
  end if;
end $$;

-- 5) Storage policies (bucket names: properties, media)
-- Some environments do not grant ownership of storage.objects in SQL editor.
-- In that case, skip storage policy DDL here and apply via Dashboard UI.
do $$
begin
  begin
    execute 'alter table if exists storage.objects enable row level security';

    execute 'drop policy if exists storage_public_read_properties on storage.objects';
    execute 'drop policy if exists storage_admin_write_properties on storage.objects';
    execute $sql$
      create policy storage_public_read_properties
        on storage.objects
        for select
        to anon, authenticated
        using (bucket_id = 'properties')
    $sql$;
    execute $sql$
      create policy storage_admin_write_properties
        on storage.objects
        for all
        to authenticated
        using (bucket_id = 'properties' and public.is_admin_user())
        with check (bucket_id = 'properties' and public.is_admin_user())
    $sql$;

    execute 'drop policy if exists storage_public_read_media on storage.objects';
    execute 'drop policy if exists storage_admin_write_media on storage.objects';
    execute $sql$
      create policy storage_public_read_media
        on storage.objects
        for select
        to anon, authenticated
        using (bucket_id = 'media')
    $sql$;
    execute $sql$
      create policy storage_admin_write_media
        on storage.objects
        for all
        to authenticated
        using (bucket_id = 'media' and public.is_admin_user())
        with check (bucket_id = 'media' and public.is_admin_user())
    $sql$;
  exception
    when insufficient_privilege then
      raise notice 'Skipping storage.objects policy changes: insufficient privilege (must be owner). Apply storage policies in Supabase Dashboard.';
  end;
end $$;

commit;
