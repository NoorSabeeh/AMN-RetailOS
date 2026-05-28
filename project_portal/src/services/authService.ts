import type { SupabaseClient } from "@supabase/supabase-js";
import type { CurrentUser, PortalRole } from "../types/portal";

type SupabaseAuthUser = {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
};

type PortalProfileRow = {
  member_slug: string;
  display_name: string;
  portal_role: PortalRole;
  role_label: string;
};

export async function signInWithAssignedAccount(client: SupabaseClient, email: string, password: string) {
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) {
    return { user: null, error: error.message };
  }

  const portalUser = await loadPortalUserFromProfile(client, data.user);
  if (!portalUser.user) {
    await client.auth.signOut();
  }

  return portalUser;
}

export async function signOutAssignedAccount(client: SupabaseClient) {
  await client.auth.signOut();
}

export async function getSignedInPortalUser(client: SupabaseClient) {
  const { data } = await client.auth.getUser();
  if (!data.user) return null;

  const result = await loadPortalUserFromProfile(client, data.user);
  if (result.error) {
    throw new Error(result.error);
  }

  return result.user;
}

export function mapSupabaseUser(user: SupabaseAuthUser | null, profile?: PortalProfileRow | null): CurrentUser | null {
  if (!user) return null;

  if (profile) {
    return {
      slug: profile.member_slug,
      name: profile.display_name,
      role: profile.portal_role,
      roleLabel: profile.role_label,
      authMode: "supabase"
    };
  }

  const metadata = user.user_metadata ?? {};
  const role = coercePortalRole(metadata.portal_role);
  const slug = typeof metadata.portal_member_slug === "string" ? metadata.portal_member_slug : role === "admin" ? "noor" : "viewer";
  const name = typeof metadata.display_name === "string" ? metadata.display_name : user.email ?? "Signed-in user";
  const roleLabel = typeof metadata.role_label === "string" ? metadata.role_label : role === "admin" ? "Admin" : role === "member" ? "Member" : "Viewer";

  return { slug, name, role, roleLabel, authMode: "supabase" };
}

function coercePortalRole(value: unknown): PortalRole {
  return value === "admin" || value === "member" || value === "viewer" ? value : "viewer";
}

async function loadPortalUserFromProfile(client: SupabaseClient, user: SupabaseAuthUser | null) {
  if (!user) return { user: null, error: "No signed-in Supabase user was returned." };

  const { data, error } = await client
    .from("profiles")
    .select("member_slug, display_name, portal_role, role_label")
    .eq("id", user.id)
    .maybeSingle<PortalProfileRow>();

  if (error) {
    return { user: null, error: `Signed in, but the portal profile could not be loaded: ${error.message}` };
  }

  if (!data) {
    return { user: null, error: "Signed in, but no portal profile exists for this Auth user." };
  }

  return { user: mapSupabaseUser(user, data), error: undefined };
}
