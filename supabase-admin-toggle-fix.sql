alter table public.registration_responses
  add column if not exists nsme_knowledge text;

-- Drop all CHECK constraints on registration_responses so older value/length
-- rules (e.g. linkedin_url, preferred_department) never block new submissions.
-- Validation is handled by the app forms.
do $$
declare
  r record;
begin
  for r in
    select conname
    from pg_constraint
    where conrelid = 'public.registration_responses'::regclass
      and contype = 'c'
  loop
    execute format('alter table public.registration_responses drop constraint %I', r.conname);
  end loop;
end $$;

create or replace function public.admin_set_registration_enabled(
  p_email text,
  p_enabled boolean,
  p_password text
)
returns table(registration_enabled boolean)
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if not public.verify_admin_login(p_email, p_password) then
    raise exception 'Invalid admin credentials';
  end if;

  update public.app_settings
  set registration_enabled = p_enabled,
      created_at = now()
  where id = 1;

  return query select s.registration_enabled from public.app_settings s where id = 1;
end;
$$;

grant execute on function public.admin_set_registration_enabled(text, boolean, text) to anon, authenticated;

create or replace function public.admin_delete_registration(
  p_email text,
  p_password text,
  p_registration_id text
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if not public.verify_admin_login(p_email, p_password) then
    raise exception 'Invalid admin credentials';
  end if;

  delete from public.registration_responses
  where id::text = p_registration_id;
end;
$$;

grant execute on function public.admin_delete_registration(text, text, text) to anon, authenticated;

create or replace function public.admin_delete_contact_inquiry(
  p_email text,
  p_password text,
  p_contact_id text
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if not public.verify_admin_login(p_email, p_password) then
    raise exception 'Invalid admin credentials';
  end if;

  delete from public.contact_inquiries
  where id::text = p_contact_id;
end;
$$;

grant execute on function public.admin_delete_contact_inquiry(text, text, text) to anon, authenticated;

drop function if exists public.admin_get_registrations(text, text) cascade;
drop function if exists public.admin_get_contact_inquiries(text, text) cascade;

create or replace function public.admin_get_registrations(
  p_email text,
  p_password text
)
returns table(
  id bigint,
  name text,
  email text,
  semester smallint,
  department text,
  cnic text,
  living_status text,
  preferred_department text,
  whatsapp_number text,
  linkedin_url text,
  any_experience text,
  skills text,
  motivation text,
  nsme_knowledge text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if not public.verify_admin_login(p_email, p_password) then
    raise exception 'Invalid admin credentials';
  end if;

  return query 
  select 
    r.id,
    r.name,
    r.email,
    r.semester,
    r.department,
    r.cnic,
    r.living_status,
    r.preferred_department,
    r.whatsapp_number,
    r.linkedin_url,
    r.any_experience,
    r.skills,
    r.motivation,
    r.nsme_knowledge,
    r.created_at
  from public.registration_responses r
  order by r.created_at desc;
end;
$$;

grant execute on function public.admin_get_registrations(text, text) to anon, authenticated;

create or replace function public.admin_get_contact_inquiries(
  p_email text,
  p_password text
)
returns table(
  id bigint,
  name text,
  email text,
  department text,
  semester integer,
  message text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if not public.verify_admin_login(p_email, p_password) then
    raise exception 'Invalid admin credentials';
  end if;

  return query 
  select 
    c.id,
    c.name,
    c.email,
    c.department,
    c.semester,
    c.message,
    c.created_at
  from public.contact_inquiries c
  order by c.created_at desc;
end;
$$;

grant execute on function public.admin_get_contact_inquiries(text, text) to anon, authenticated;

notify pgrst, 'reload schema';
