-- Security hardening for admin-managed tables.
-- Run in Supabase SQL Editor as a privileged role.

begin;

-- 1) Helper: central admin role check.
create or replace function public.is_admin()
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

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- 2) Ensure RLS is enabled.
alter table if exists public.properties enable row level security;
alter table if exists public.property_feature_map enable row level security;
alter table if exists public.faqs enable row level security;
alter table if exists public.media_items enable row level security;
alter table if exists public.users enable row level security;

-- 3) Drop known permissive policies created previously.
drop policy if exists "Authenticated users can manage media items" on public.media_items;
drop policy if exists "Authenticated users can manage FAQs" on public.faqs;

-- 4) Properties: public can read, only admins can write.
drop policy if exists "Public can view properties" on public.properties;
drop policy if exists "Admins can manage properties" on public.properties;
create policy "Public can view properties"
on public.properties
for select
using (true);
create policy "Admins can manage properties"
on public.properties
for all
using (public.is_admin())
with check (public.is_admin());

-- 5) Property feature map: public can read, only admins can write.
drop policy if exists "Public can view property features" on public.property_feature_map;
drop policy if exists "Admins can manage property features" on public.property_feature_map;
create policy "Public can view property features"
on public.property_feature_map
for select
using (true);
create policy "Admins can manage property features"
on public.property_feature_map
for all
using (public.is_admin())
with check (public.is_admin());

-- 6) FAQs: public reads published, admins can read all and manage.
drop policy if exists "Public can view published FAQs" on public.faqs;
drop policy if exists "Public can view published faqs" on public.faqs;
drop policy if exists "Admins can view all FAQs" on public.faqs;
drop policy if exists "Admins can manage FAQs" on public.faqs;
create policy "Public can view published FAQs"
on public.faqs
for select
using (coalesce(published, false) = true);
create policy "Admins can view all FAQs"
on public.faqs
for select
using (public.is_admin());
create policy "Admins can manage FAQs"
on public.faqs
for all
using (public.is_admin())
with check (public.is_admin());

-- 7) Media: public reads published, admins can read all and manage.
drop policy if exists "Public can view published media items" on public.media_items;
drop policy if exists "Admins can view all media items" on public.media_items;
drop policy if exists "Admins can manage media items" on public.media_items;
create policy "Public can view published media items"
on public.media_items
for select
using (coalesce(published, false) = true);
create policy "Admins can view all media items"
on public.media_items
for select
using (public.is_admin());
create policy "Admins can manage media items"
on public.media_items
for all
using (public.is_admin())
with check (public.is_admin());

-- 8) Users table: user can see own record; admin can manage all users.
drop policy if exists "Users can view own profile" on public.users;
drop policy if exists "Users can update own profile" on public.users;
drop policy if exists "Admins can manage users" on public.users;
create policy "Users can view own profile"
on public.users
for select
using (id = auth.uid());
create policy "Users can update own profile"
on public.users
for update
using (id = auth.uid())
with check (id = auth.uid());
create policy "Admins can manage users"
on public.users
for all
using (public.is_admin())
with check (public.is_admin());

commit;

-- Optional incident cleanup query for the properties defacement:
-- delete from public.properties
-- where name ilike '%compromised%'
--    or name ilike '%cleanup failed%'
--    or description ilike '%removed%';
