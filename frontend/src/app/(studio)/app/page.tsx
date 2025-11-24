import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

export default async function StudioHomePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user ?? {};

  const profileRows = [
    { label: "Display name", value: user.name ?? "Unnamed" },
    { label: "Email", value: user.email ?? "—" },
    { label: "Provider", value: user.provider ?? "credentials" },
    { label: "User id", value: user.id ?? "n/a" },
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(0,224,255,0.18),transparent_55%),var(--surface)] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_55px_rgba(3,8,23,0.55)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#9aa5ce]">
              Welcome inside
            </p>
            <h1 className="text-3xl font-semibold">Qyntra Studio Console</h1>
            <p className="text-sm text-[#9aa5ce]">
              This page lives behind authentication so you can verify that the
              full sign-in flow works end to end.
            </p>
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-white/60 md:mt-0"
            >
              Sign out
            </button>
          </form>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-[#9aa5ce]">
              Session snapshot
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Authenticated user</h2>
            <dl className="mt-6 space-y-4 text-sm text-[#cdd3f5]">
              {profileRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3 border-b border-white/5 pb-3"
                >
                  <dt className="text-[#8b93c9]">{row.label}</dt>
                  <dd className="font-medium text-white">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-transparent p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-[#9aa5ce]">
              Quick actions
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Sandbox tools</h2>
            <ul className="mt-6 space-y-4 text-sm text-[#cdd3f5]">
              <li className="rounded-2xl border border-white/10 p-4">
                Use the form on the left to verify that newly created accounts
                can access protected routes immediately after signup.
              </li>
              <li className="rounded-2xl border border-white/10 p-4">
                Switch providers (Google/GitHub/Discord) to ensure OAuth flows
                persist sessions correctly.
              </li>
              <li className="rounded-2xl border border-white/10 p-4">
                Sign out above, then try bookmarking this page to confirm you
                get redirected back to the login screen when unauthenticated.
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href="/"
                className="rounded-2xl border border-white/10 px-4 py-2 text-white transition hover:border-white/50"
              >
                Return to marketing site
              </Link>
              <Link
                href="/signup"
                className="rounded-2xl border border-white/10 px-4 py-2 text-white transition hover:border-white/50"
              >
                Create another profile
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
