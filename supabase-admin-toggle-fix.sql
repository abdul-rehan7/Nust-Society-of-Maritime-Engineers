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
  preferred_department text,
  whatsapp_number text,
  skills text,
  motivation text,
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
    r.preferred_department,
    r.whatsapp_number,
    r.skills,
    r.motivation,
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
