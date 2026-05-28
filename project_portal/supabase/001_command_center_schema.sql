-- AMN RetailOS Command Center v2.1 Supabase setup.
-- Internal AMN TEAM portal only. This is not the AMN RetailOS POS product backend.
-- Do not store passwords, private keys, license secrets, local machine paths, or customer production data here.

create extension if not exists pgcrypto;

do $$
begin
  create type public.portal_role as enum ('admin', 'member', 'viewer');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.phase_status as enum ('completed', 'active', 'blocked', 'planned', 'deferred', 'ready_for_approval');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.task_priority as enum ('P0', 'P1', 'P2', 'Deferred');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.task_status as enum ('not_started', 'in_progress', 'blocked', 'done', 'deferred');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.blocker_severity as enum ('low', 'medium', 'high', 'critical');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.blocker_status as enum ('open', 'resolved');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  member_slug text not null,
  display_name text not null,
  portal_role public.portal_role not null default 'viewer',
  role_label text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  slug text primary key,
  display_name text not null,
  role_label text not null,
  portal_role public.portal_role not null default 'member',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_settings (
  id text primary key default 'amn-retailos-command-center',
  project_name text not null,
  mission text not null,
  current_phase_id text,
  mvp_focus text not null,
  sync_mode_notes text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

create table if not exists public.phases (
  id text primary key,
  title text not null,
  status public.phase_status not null default 'planned',
  objective text not null,
  allowed_scope text[] not null default '{}',
  out_of_scope text[] not null default '{}',
  order_index integer not null default 0,
  next_phase_id text references public.phases(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'project_settings_current_phase_fk'
  ) then
    alter table public.project_settings
      add constraint project_settings_current_phase_fk
      foreign key (current_phase_id) references public.phases(id) deferrable initially deferred;
  end if;
end $$;

create table if not exists public.phase_members (
  id uuid primary key default gen_random_uuid(),
  phase_id text not null references public.phases(id) on delete cascade,
  member_slug text not null references public.team_members(slug) on delete cascade,
  role_in_phase text not null,
  required_for_completion boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (phase_id, member_slug)
);

create table if not exists public.roadmap_items (
  id text primary key,
  title text not null,
  phase_id text references public.phases(id) on delete set null,
  status public.phase_status not null default 'planned',
  priority public.task_priority not null default 'P1',
  order_index integer not null default 0,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

create table if not exists public.tasks (
  id text primary key,
  title text not null,
  description text not null default '',
  phase_id text not null references public.phases(id) on delete cascade,
  owner_slug text not null references public.team_members(slug),
  priority public.task_priority not null default 'P1',
  status public.task_status not null default 'not_started',
  due_date date,
  dependency_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

create table if not exists public.checklist_items (
  id text primary key,
  task_id text references public.tasks(id) on delete cascade,
  phase_id text not null references public.phases(id) on delete cascade,
  owner_slug text not null references public.team_members(slug),
  title text not null,
  is_done boolean not null default false,
  weight numeric not null default 1 check (weight > 0),
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

create table if not exists public.blockers (
  id text primary key,
  title text not null,
  description text not null default '',
  owner_slug text not null references public.team_members(slug),
  severity public.blocker_severity not null default 'medium',
  phase_id text references public.phases(id) on delete set null,
  task_id text references public.tasks(id) on delete set null,
  status public.blocker_status not null default 'open',
  resolution_note text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  updated_at timestamptz not null default now(),
  updated_by text
);

create table if not exists public.member_updates (
  id text primary key,
  member_slug text not null references public.team_members(slug) on delete cascade,
  phase_id text references public.phases(id) on delete set null,
  title text not null,
  done_text text not null default '',
  blocked_text text not null default '',
  next_text text not null default '',
  notes text not null default '',
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

create table if not exists public.docs_links (
  id text primary key,
  title text not null,
  repo_path text not null check (repo_path !~ '^[A-Za-z]:\\' and repo_path !~* '^file:'),
  github_url text,
  raw_url text,
  assigned_to_slug text references public.team_members(slug) on delete set null,
  phase_id text references public.phases(id) on delete set null,
  category text not null default 'General',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

create table if not exists public.decisions (
  id text primary key,
  title text not null,
  description text not null default '',
  reason text not null default '',
  impact text not null default '',
  status text not null default 'active',
  phase_id text references public.phases(id) on delete set null,
  decided_by text not null,
  decided_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.phase_transitions (
  id text primary key,
  from_phase_id text not null references public.phases(id),
  to_phase_id text not null references public.phases(id),
  approved_by text not null,
  approved_at timestamptz not null default now(),
  approval_notes text not null default '',
  blockers_snapshot jsonb not null default '[]'::jsonb,
  completion_summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id text primary key,
  actor_id uuid references auth.users(id) on delete set null,
  actor_slug text,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  before_summary jsonb,
  after_summary jsonb,
  phase_id text references public.phases(id) on delete set null,
  task_id text references public.tasks(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id text primary key,
  recipient_slug text references public.team_members(slug) on delete cascade,
  title text not null,
  message text not null,
  type text not null,
  is_read boolean not null default false,
  related_entity_type text,
  related_entity_id text,
  created_at timestamptz not null default now()
);

-- Optional backup/export/debug table only. The frontend must not use this as primary shared sync.
create table if not exists public.workspace_snapshots (
  id text primary key,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

create or replace function public.current_member_slug()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.member_slug from public.profiles p where p.id = auth.uid()
$$;

create or replace function public.current_portal_role()
returns public.portal_role
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select p.portal_role from public.profiles p where p.id = auth.uid()), 'viewer'::public.portal_role)
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_portal_role() = 'admin'::public.portal_role
$$;

create or replace function public.is_member_self(slug text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_member_slug() = slug
$$;

alter table public.profiles enable row level security;
alter table public.team_members enable row level security;
alter table public.project_settings enable row level security;
alter table public.phases enable row level security;
alter table public.phase_members enable row level security;
alter table public.roadmap_items enable row level security;
alter table public.tasks enable row level security;
alter table public.checklist_items enable row level security;
alter table public.blockers enable row level security;
alter table public.member_updates enable row level security;
alter table public.docs_links enable row level security;
alter table public.decisions enable row level security;
alter table public.phase_transitions enable row level security;
alter table public.audit_events enable row level security;
alter table public.notifications enable row level security;
alter table public.workspace_snapshots enable row level security;

drop policy if exists profiles_select_own_or_admin on public.profiles;
create policy profiles_select_own_or_admin on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all on public.profiles
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists shared_select_authenticated on public.team_members;
create policy shared_select_authenticated on public.team_members for select to authenticated using (true);
drop policy if exists shared_admin_all on public.team_members;
create policy shared_admin_all on public.team_members for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists settings_select_authenticated on public.project_settings;
create policy settings_select_authenticated on public.project_settings for select to authenticated using (true);
drop policy if exists settings_admin_all on public.project_settings;
create policy settings_admin_all on public.project_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists phases_select_authenticated on public.phases;
create policy phases_select_authenticated on public.phases for select to authenticated using (true);
drop policy if exists phases_admin_all on public.phases;
create policy phases_admin_all on public.phases for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists phase_members_select_authenticated on public.phase_members;
create policy phase_members_select_authenticated on public.phase_members for select to authenticated using (true);
drop policy if exists phase_members_admin_all on public.phase_members;
create policy phase_members_admin_all on public.phase_members for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists roadmap_select_authenticated on public.roadmap_items;
create policy roadmap_select_authenticated on public.roadmap_items for select to authenticated using (true);
drop policy if exists roadmap_admin_all on public.roadmap_items;
create policy roadmap_admin_all on public.roadmap_items for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists tasks_select_authenticated on public.tasks;
create policy tasks_select_authenticated on public.tasks for select to authenticated using (true);
drop policy if exists tasks_admin_all on public.tasks;
create policy tasks_admin_all on public.tasks for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists tasks_member_update_own on public.tasks;
create policy tasks_member_update_own on public.tasks
  for update to authenticated
  using (public.current_portal_role() = 'member' and public.is_member_self(owner_slug))
  with check (public.current_portal_role() = 'member' and public.is_member_self(owner_slug));

drop policy if exists checklist_select_authenticated on public.checklist_items;
create policy checklist_select_authenticated on public.checklist_items for select to authenticated using (true);
drop policy if exists checklist_admin_all on public.checklist_items;
create policy checklist_admin_all on public.checklist_items for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists checklist_member_update_own on public.checklist_items;
create policy checklist_member_update_own on public.checklist_items
  for update to authenticated
  using (public.current_portal_role() = 'member' and public.is_member_self(owner_slug))
  with check (public.current_portal_role() = 'member' and public.is_member_self(owner_slug));

drop policy if exists blockers_select_authenticated on public.blockers;
create policy blockers_select_authenticated on public.blockers for select to authenticated using (true);
drop policy if exists blockers_admin_all on public.blockers;
create policy blockers_admin_all on public.blockers for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists blockers_member_insert_own on public.blockers;
create policy blockers_member_insert_own on public.blockers
  for insert to authenticated
  with check (public.current_portal_role() = 'member' and public.is_member_self(owner_slug));
drop policy if exists blockers_member_update_own on public.blockers;
create policy blockers_member_update_own on public.blockers
  for update to authenticated
  using (public.current_portal_role() = 'member' and public.is_member_self(owner_slug))
  with check (public.current_portal_role() = 'member' and public.is_member_self(owner_slug));

drop policy if exists updates_select_authenticated on public.member_updates;
create policy updates_select_authenticated on public.member_updates for select to authenticated using (true);
drop policy if exists updates_admin_all on public.member_updates;
create policy updates_admin_all on public.member_updates for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists updates_member_insert_own on public.member_updates;
create policy updates_member_insert_own on public.member_updates
  for insert to authenticated
  with check (public.current_portal_role() = 'member' and public.is_member_self(member_slug));
drop policy if exists updates_member_update_own on public.member_updates;
create policy updates_member_update_own on public.member_updates
  for update to authenticated
  using (public.current_portal_role() = 'member' and public.is_member_self(member_slug))
  with check (public.current_portal_role() = 'member' and public.is_member_self(member_slug));
drop policy if exists updates_member_delete_own on public.member_updates;
create policy updates_member_delete_own on public.member_updates
  for delete to authenticated
  using (public.current_portal_role() = 'member' and public.is_member_self(member_slug));

drop policy if exists docs_select_authenticated on public.docs_links;
create policy docs_select_authenticated on public.docs_links for select to authenticated using (true);
drop policy if exists docs_admin_all on public.docs_links;
create policy docs_admin_all on public.docs_links for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists decisions_select_authenticated on public.decisions;
create policy decisions_select_authenticated on public.decisions for select to authenticated using (true);
drop policy if exists decisions_admin_all on public.decisions;
create policy decisions_admin_all on public.decisions for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists transitions_select_authenticated on public.phase_transitions;
create policy transitions_select_authenticated on public.phase_transitions for select to authenticated using (true);
drop policy if exists transitions_admin_all on public.phase_transitions;
create policy transitions_admin_all on public.phase_transitions for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists audit_admin_select on public.audit_events;
create policy audit_admin_select on public.audit_events for select to authenticated using (public.is_admin() or actor_slug = public.current_member_slug());
drop policy if exists audit_insert_authenticated on public.audit_events;
create policy audit_insert_authenticated on public.audit_events
  for insert to authenticated
  with check (public.is_admin() or actor_slug = public.current_member_slug());

drop policy if exists notifications_select_target on public.notifications;
create policy notifications_select_target on public.notifications
  for select to authenticated
  using (public.is_admin() or recipient_slug is null or recipient_slug = public.current_member_slug());
drop policy if exists notifications_admin_all on public.notifications;
create policy notifications_admin_all on public.notifications for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists notifications_member_update_own on public.notifications;
create policy notifications_member_update_own on public.notifications
  for update to authenticated
  using (recipient_slug = public.current_member_slug())
  with check (recipient_slug = public.current_member_slug());

drop policy if exists snapshots_admin_all on public.workspace_snapshots;
create policy snapshots_admin_all on public.workspace_snapshots for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.team_members (slug, display_name, role_label, portal_role, is_active)
values
  ('noor', 'Noor', 'Admin / Product & Backend Coordinator', 'admin', true),
  ('mohammed', 'Mohammed', 'Frontend/UI Owner', 'member', true),
  ('ali', 'Ali', 'Backend/Data Owner', 'member', true),
  ('murtadha', 'Murtadha', 'UX/QA/Field Feedback Owner', 'member', true),
  ('viewer', 'Viewer', 'Read-only External Viewer', 'viewer', true)
on conflict (slug) do update set
  display_name = excluded.display_name,
  role_label = excluded.role_label,
  portal_role = excluded.portal_role,
  is_active = excluded.is_active,
  updated_at = now();

-- Seed phases in two steps: first create every phase without next_phase_id links,
-- then update the links after all referenced phases exist.
insert into public.phases (id, title, status, objective, allowed_scope, out_of_scope, order_index, next_phase_id)
values
  ('phase-0', 'Phase 0: Project Foundation Documentation', 'completed', 'Create the planning foundation, product scope, architecture notes, workflow docs, and acceptance criteria.', array['Documentation','Scope definition','Roadmap','Decision log'], array['Runtime code','Product UI','Cloud services'], 0, null),
  ('phase-t1', 'Phase T1: Team Alignment & Work Preparation', 'active', 'Align roles, reading assignments, deliverables, blockers, and environment preparation.', array['Task distribution','Reading assignments','Status updates','Environment readiness'], array['Backend implementation','Database migrations','Final UI screens'], 1, null),
  ('phase-b1', 'Phase B1: Backend Foundation', 'blocked', 'Create schema, migrations, backend skeleton, and core business rule foundations after tooling is ready.', array['Local backend skeleton','SQLite schema','Migrations','Tests'], array['Frontend UI','Final license activation','Cloud services','Full POS workflow'], 2, null),
  ('phase-u1', 'Phase U1: Claude UI Planning', 'planned', 'Prepare frontend planning assets for the future AMN RetailOS product UI without implementing product screens here.', array['Screen inventory','UX questions','Design handoff planning'], array['Production product UI','Backend rules','Delayed modes'], 3, null),
  ('phase-b2', 'Phase B2: Core Catalog & Inventory', 'planned', 'Implement products, categories, barcodes, units, unit conversion, and inventory movement foundation.', array['Catalog','Inventory movements','Unit conversion'], array['Batch/expiry production workflow','Serial/warranty workflow'], 4, null),
  ('phase-b3', 'Phase B3: Sales & Invoice Foundation', 'planned', 'Implement transactional sales, invoices, payments, idempotency, and cashier-safe backend behavior.', array['Sales services','Invoice lifecycle','Payment rules','Idempotency'], array['Online payments','Full UI','Complex accounting'], 5, null),
  ('phase-b4', 'Phase B4: Business Safety', 'planned', 'Add returns, debt, suppliers, shifts, reports, audit, and backup flows.', array['Returns','Debt','Suppliers','Cash sessions','Audit logs','Backup'], array['Enterprise accounting','Cloud backup','Advanced modes'], 6, null),
  ('phase-h1', 'Phase H1: Hardening', 'planned', 'Harden licensing, diagnostics, installer process, Arabic/RTL receipt validation, and update safety.', array['Diagnostics','License status','Installer planning','Update/rollback'], array['Final AMN Control Center','Cloud SaaS'], 7, null),
  ('phase-p1', 'Phase P1: Pilot Store Testing', 'planned', 'Validate core workflows in real Retail/Grocery and basic Wholesale conditions.', array['Pilot testing','Bug reports','Field feedback','Training notes'], array['Scope expansion','Delayed product modes'], 8, null)
on conflict (id) do update set
  title = excluded.title,
  status = excluded.status,
  objective = excluded.objective,
  allowed_scope = excluded.allowed_scope,
  out_of_scope = excluded.out_of_scope,
  order_index = excluded.order_index,
  next_phase_id = null,
  updated_at = now();

update public.phases
set next_phase_id = case id
  when 'phase-0' then 'phase-t1'
  when 'phase-t1' then 'phase-u1'
  when 'phase-u1' then 'phase-b1'
  when 'phase-b1' then 'phase-b2'
  when 'phase-b2' then 'phase-b3'
  when 'phase-b3' then 'phase-b4'
  when 'phase-b4' then 'phase-h1'
  when 'phase-h1' then 'phase-p1'
  else null
end,
updated_at = now()
where id in ('phase-0', 'phase-t1', 'phase-u1', 'phase-b1', 'phase-b2', 'phase-b3', 'phase-b4', 'phase-h1', 'phase-p1');

insert into public.project_settings (id, project_name, mission, current_phase_id, mvp_focus, sync_mode_notes, updated_by)
values (
  'amn-retailos-command-center',
  'AMN RetailOS Command Center v2.1',
  'Coordinate AMN RetailOS planning around a local-first Windows POS platform for Retail/Grocery and Basic Wholesale only.',
  'phase-t1',
  'Retail/Grocery Mode + Basic Wholesale/Grocery Mode',
  'Primary shared sync uses normalized Supabase tables. workspace_snapshots is backup/export only.',
  'seed'
)
on conflict (id) do update set
  project_name = excluded.project_name,
  mission = excluded.mission,
  current_phase_id = excluded.current_phase_id,
  mvp_focus = excluded.mvp_focus,
  sync_mode_notes = excluded.sync_mode_notes,
  updated_at = now(),
  updated_by = excluded.updated_by;

insert into public.phase_members (phase_id, member_slug, role_in_phase, required_for_completion)
values
  ('phase-t1', 'noor', 'Phase coordination and approval gate', true),
  ('phase-t1', 'mohammed', 'Claude UI Planning Phase U1 preparation', true),
  ('phase-t1', 'ali', 'Backend B1 readiness and SDK blocker tracking', true),
  ('phase-t1', 'murtadha', 'QA and field feedback preparation', true)
on conflict (phase_id, member_slug) do update set
  role_in_phase = excluded.role_in_phase,
  required_for_completion = excluded.required_for_completion,
  updated_at = now();

insert into public.tasks (id, title, description, phase_id, owner_slug, priority, status, due_date, dependency_notes, updated_by)
values
  ('t1-scope-confirm', 'Confirm MVP scope remains Retail/Grocery + Basic Wholesale only', 'Use documentation foundation and current blockers as source of truth.', 'phase-t1', 'noor', 'P0', 'in_progress', null, null, 'seed'),
  ('t1-sdk-blocker', 'Confirm .NET SDK readiness before Backend B1 resumes', 'Backend B1 cannot be marked complete without build/test/migration validation.', 'phase-t1', 'ali', 'P0', 'blocked', null, null, 'seed'),
  ('t1-ui-questions', 'Prepare Claude UI Planning Phase U1 questions', 'Questions must respect backend-owned business rules.', 'phase-u1', 'mohammed', 'P0', 'not_started', null, 'Depends on T1 scope confirmation.', 'seed'),
  ('t1-qa-checklist', 'Prepare QA and field feedback checklist', 'Focus on cashier workflow, printer issues, Arabic/RTL receipt output, backup, and offline operation.', 'phase-t1', 'murtadha', 'P0', 'not_started', null, null, 'seed')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  phase_id = excluded.phase_id,
  owner_slug = excluded.owner_slug,
  priority = excluded.priority,
  status = excluded.status,
  due_date = excluded.due_date,
  dependency_notes = excluded.dependency_notes,
  updated_at = now(),
  updated_by = excluded.updated_by;

insert into public.checklist_items (id, task_id, phase_id, owner_slug, title, is_done, weight, order_index, updated_by)
values
  ('scope-review', 't1-scope-confirm', 'phase-t1', 'noor', 'Review MVP docs', true, 1, 1, 'seed'),
  ('scope-delayed', 't1-scope-confirm', 'phase-t1', 'noor', 'Confirm delayed scope', true, 1, 2, 'seed'),
  ('scope-note', 't1-scope-confirm', 'phase-t1', 'noor', 'Share scope note', false, 1, 3, 'seed'),
  ('sdk-install', 't1-sdk-blocker', 'phase-t1', 'ali', 'Install SDK', false, 2, 1, 'seed'),
  ('sdk-info', 't1-sdk-blocker', 'phase-t1', 'ali', 'Run dotnet --info', false, 2, 2, 'seed'),
  ('sdk-build-path', 't1-sdk-blocker', 'phase-t1', 'ali', 'Confirm restore/build/test path', false, 1, 3, 'seed'),
  ('ui-read-handoff', 't1-ui-questions', 'phase-u1', 'mohammed', 'Read UI handoff', true, 1, 1, 'seed'),
  ('ui-screens', 't1-ui-questions', 'phase-u1', 'mohammed', 'List MVP screens', false, 1, 2, 'seed'),
  ('ui-contracts', 't1-ui-questions', 'phase-u1', 'mohammed', 'List backend contract dependencies', false, 1, 3, 'seed'),
  ('qa-read-docs', 't1-qa-checklist', 'phase-t1', 'murtadha', 'Read QA docs', true, 1, 1, 'seed'),
  ('qa-field', 't1-qa-checklist', 'phase-t1', 'murtadha', 'Draft field checklist', false, 1, 2, 'seed'),
  ('qa-hardware', 't1-qa-checklist', 'phase-t1', 'murtadha', 'Draft hardware checklist', false, 1, 3, 'seed')
on conflict (id) do update set
  task_id = excluded.task_id,
  phase_id = excluded.phase_id,
  owner_slug = excluded.owner_slug,
  title = excluded.title,
  is_done = excluded.is_done,
  weight = excluded.weight,
  order_index = excluded.order_index,
  updated_at = now(),
  updated_by = excluded.updated_by;

insert into public.blockers (id, title, description, owner_slug, severity, phase_id, task_id, status, updated_by)
values ('blocker-dotnet-sdk', '.NET SDK unavailable for Backend B1 validation', 'Backend B1 cannot be completed until dotnet --info, restore, build, tests, and migration validation can run.', 'ali', 'critical', 'phase-b1', 't1-sdk-blocker', 'open', 'seed')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  owner_slug = excluded.owner_slug,
  severity = excluded.severity,
  phase_id = excluded.phase_id,
  task_id = excluded.task_id,
  status = excluded.status,
  updated_at = now(),
  updated_by = excluded.updated_by;

insert into public.docs_links (id, title, repo_path, github_url, raw_url, category, phase_id, updated_by)
values
  ('doc-readme', 'README', 'README.md', null, null, 'Root', null, 'seed'),
  ('doc-tasks', 'TASKS', 'TASKS.md', null, null, 'Root', null, 'seed'),
  ('doc-status', 'CODEX STATUS', 'CODEX_STATUS.md', null, null, 'Root', null, 'seed'),
  ('doc-backend-architecture', 'Backend Architecture', 'docs/05_BACKEND_ARCHITECTURE.md', null, null, 'Backend', 'phase-b1', 'seed'),
  ('doc-schema', 'Database Conceptual Schema', 'docs/06_DATABASE_CONCEPTUAL_SCHEMA.md', null, null, 'Backend', 'phase-b1', 'seed'),
  ('doc-acceptance', 'Acceptance Criteria', 'docs/19_ACCEPTANCE_CRITERIA.md', null, null, 'QA', 'phase-t1', 'seed')
on conflict (id) do update set
  title = excluded.title,
  repo_path = excluded.repo_path,
  github_url = excluded.github_url,
  raw_url = excluded.raw_url,
  category = excluded.category,
  phase_id = excluded.phase_id,
  updated_at = now(),
  updated_by = excluded.updated_by;

insert into public.roadmap_items (id, title, phase_id, status, priority, order_index, notes, updated_by)
values
  ('roadmap-phase-0', 'Project Foundation Documentation', 'phase-0', 'completed', 'P0', 0, 'Foundation docs completed.', 'seed'),
  ('roadmap-phase-t1', 'Team Alignment & Work Preparation', 'phase-t1', 'active', 'P0', 1, 'Current coordination phase.', 'seed'),
  ('roadmap-phase-b1', 'Backend Foundation', 'phase-b1', 'blocked', 'P0', 2, 'Blocked until .NET SDK validation.', 'seed'),
  ('roadmap-phase-u1', 'Claude UI Planning', 'phase-u1', 'planned', 'P0', 3, 'Future product UI planning only.', 'seed')
on conflict (id) do update set
  title = excluded.title,
  phase_id = excluded.phase_id,
  status = excluded.status,
  priority = excluded.priority,
  order_index = excluded.order_index,
  notes = excluded.notes,
  updated_at = now(),
  updated_by = excluded.updated_by;
