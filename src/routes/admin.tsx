import React, { useMemo, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Database,
  Loader2,
  Lock,
  LockOpen,
  LogOut,
  Mail,
  RefreshCw,
  Shield,
  Trash2,
  Users,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "NSME Admin" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [authLoading, setAuthLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [regEnabled, setRegEnabled] = useState<boolean | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const totalRecords = useMemo(() => registrations.length + contacts.length, [registrations.length, contacts.length]);

  const clearMessages = () => {
    setError(null);
    setNotice(null);
  };

  // Restore login from localStorage on mount
  useEffect(() => {
    const restoreSession = async () => {
      const stored = localStorage.getItem("adminSession");
      if (stored) {
        try {
          const { email: storedEmail, password: storedPassword } = JSON.parse(stored);
          // Validate credentials by attempting to fetch registrations
          const { data, error: rpcError } = await supabase.rpc("admin_get_registrations", { 
            p_email: storedEmail, 
            p_password: storedPassword 
          });
          
          if (rpcError) {
            // Credentials invalid, clear session
            localStorage.removeItem("adminSession");
            return;
          }

          // Valid session, restore all data
          setEmail(storedEmail);
          setPassword(storedPassword);
          setRegistrations(Array.isArray(data) ? data : []);
          
          const contactsRes = await supabase.rpc("admin_get_contact_inquiries", { 
            p_email: storedEmail, 
            p_password: storedPassword 
          });
          if (!contactsRes.error) {
            setContacts(Array.isArray(contactsRes.data) ? contactsRes.data : []);
          }
          
          const settingsRes = await supabase.rpc("get_public_settings");
          if (!settingsRes.error && settingsRes.data) {
            const regData = Array.isArray(settingsRes.data) ? settingsRes.data[0] : settingsRes.data;
            setRegEnabled(Boolean(regData?.registration_enabled));
          }
          
          setLoggedIn(true);
        } catch (e) {
          localStorage.removeItem("adminSession");
        }
      }
    };
    restoreSession();
  }, []);

  const fetchRegistrations = async () => {
    setDataLoading(true);
    clearMessages();
    const { data, error: rpcError } = await supabase.rpc("admin_get_registrations", { p_email: email, p_password: password });
    setDataLoading(false);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    setRegistrations(Array.isArray(data) ? data : []);
    setNotice("Registration responses updated.");
  };

  const tryLogin = async () => {
    setAuthLoading(true);
    clearMessages();
    // try fetching registrations to verify credentials
    const { data, error: rpcError } = await supabase.rpc("admin_get_registrations", { p_email: email, p_password: password });
    setAuthLoading(false);
    if (rpcError) {
      setError("Login failed: " + rpcError.message);
      return;
    }
    setRegistrations(Array.isArray(data) ? data : []);
    setLoggedIn(true);
    // Save session to localStorage
    localStorage.setItem("adminSession", JSON.stringify({ email, password }));
    setNotice("Welcome to the admin dashboard.");
    await fetchSettings();
    await fetchContacts();
  };

  const fetchContacts = async () => {
    setDataLoading(true);
    clearMessages();
    const { data, error: rpcError } = await supabase.rpc("admin_get_contact_inquiries", { p_email: email, p_password: password });
    setDataLoading(false);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    setContacts(Array.isArray(data) ? data : []);
    setNotice("Contact inquiries updated.");
  };

  const deleteRegistration = async (id: string) => {
    if (!confirm("Delete this registration entry?")) return;
    setDeleteLoading(`registration-${id}`);
    clearMessages();
    const { error: rpcError } = await supabase.rpc("admin_delete_registration", {
      p_email: email,
      p_password: password,
      p_registration_id: id,
    });
    setDeleteLoading(null);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    await fetchRegistrations();
    setNotice("Registration entry deleted.");
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this contact inquiry?")) return;
    setDeleteLoading(`contact-${id}`);
    clearMessages();
    const { error: rpcError } = await supabase.rpc("admin_delete_contact_inquiry", {
      p_email: email,
      p_password: password,
      p_contact_id: id,
    });
    setDeleteLoading(null);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    await fetchContacts();
    setNotice("Contact inquiry deleted.");
  };

  const fetchSettings = async () => {
    try {
      clearMessages();
      const { data, error } = await supabase.rpc("get_public_settings");
      console.log("get_public_settings response:", { data, error });
      if (error) {
        setError("Failed to fetch settings: " + error.message);
        return;
      }
      if (data && data.length > 0) {
        if (Array.isArray(data)) setRegEnabled(Boolean(data[0].registration_enabled));
        else setRegEnabled(Boolean((data as any).registration_enabled));
        setNotice("Public settings refreshed.");
      } else if (data && !Array.isArray(data)) {
        setRegEnabled(Boolean((data as any).registration_enabled));
        setNotice("Public settings refreshed.");
      } else {
        setError("No settings found in database. Please ensure app_settings table has an entry with id=1.");
      }
    } catch (e) {
      setError("Error fetching settings: " + String(e));
      console.error("fetchSettings error:", e);
    }
  };

  const toggleRegistration = async () => {
    if (!confirm("Toggle registration open/closed?")) return;
    setDataLoading(true);
    clearMessages();
    const newVal = !regEnabled;
    const { data, error } = await supabase.rpc("admin_set_registration_enabled", {
      p_email: email,
      p_enabled: newVal,
      p_password: password,
    });
    setDataLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setRegEnabled(Boolean((data as any).registration_enabled));
    setNotice(`Registration is now ${newVal ? "open" : "closed"}.`);
  };

  const getRegistrationStatus = () => {
    if (regEnabled === null) return "Unknown";
    return regEnabled ? "Open" : "Closed";
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setLoggedIn(false);
    setRegistrations([]);
    setContacts([]);
    setRegEnabled(null);
    clearMessages();
  };

  const statusTone = regEnabled === null
    ? "bg-amber-500/15 text-amber-200 border-amber-400/30"
    : regEnabled
      ? "bg-emerald-500/15 text-emerald-200 border-emerald-400/30"
      : "bg-red-500/15 text-red-200 border-red-400/30";

  const formatDate = (value: string) => {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };

  const csvEscape = (value: any) => {
    const str = value === null || value === undefined ? "" : String(value);
    if (/[",\n\r]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const downloadRegistrationsCsv = () => {
    if (registrations.length === 0) {
      setError("No registration data to download. Load registrations first.");
      return;
    }
    clearMessages();
    const headers = [
      "Name",
      "Email",
      "Semester",
      "Department",
      "CNIC",
      "Living Status",
      "Preferred Department",
      "WhatsApp Number",
      "LinkedIn URL",
      "Any Experience",
      "Skills",
      "Motivation",
      "NSME Knowledge",
      "Submitted",
    ];
    const rows = registrations.map((r) => [
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
      r.created_at,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nsme-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setNotice("Registrations exported to CSV.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-cyan-glow/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-navy-light/40 blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-10 sm:pb-14">
        <div className="mb-8 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl p-5 sm:p-7 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-1 text-xs tracking-wide uppercase text-cyan-soft">
                <Shield className="h-3.5 w-3.5" />
                Admin Access
              </p>
              <h1 className="mt-3 text-2xl sm:text-3xl font-bold">NSME Control Center</h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                Manage registration availability and review incoming submissions from membership and contact forms.
              </p>
            </div>
            {loggedIn && (
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm hover:bg-background transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>
        </div>

        {!loggedIn ? (
          <div className="max-w-lg mx-auto rounded-2xl border border-border/80 bg-card/75 p-6 sm:p-8 backdrop-blur-xl shadow-card">
            <h2 className="text-xl font-semibold">Sign in to continue</h2>
            <p className="mt-1 text-sm text-muted-foreground">Use admin credentials to access records and controls.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="input w-full rounded-xl border border-border/80 bg-background/70 pl-11 pr-4 py-2.5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    className="input w-full rounded-xl border border-border/80 bg-background/70 pl-4 pr-11 py-2.5"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button className="btn inline-flex items-center gap-2" onClick={tryLogin} disabled={authLoading}>
                  {authLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
                  {authLoading ? "Checking..." : "Login"}
                </button>
                <button className="btn inline-flex items-center gap-2" onClick={fetchSettings}>
                  <RefreshCw className="h-4 w-4" />
                  Refresh Settings
                </button>
              </div>

              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${statusTone}`}>
                {regEnabled ? <LockOpen className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                Registration: {getRegistrationStatus()}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-border/80 bg-card/75 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Registrations</p>
                <p className="mt-2 text-2xl font-semibold inline-flex items-center gap-2">
                  <Users className="h-5 w-5 text-cyan-soft" />
                  {registrations.length}
                </p>
              </div>
              <div className="rounded-xl border border-border/80 bg-card/75 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Contact Inquiries</p>
                <p className="mt-2 text-2xl font-semibold inline-flex items-center gap-2">
                  <Mail className="h-5 w-5 text-cyan-soft" />
                  {contacts.length}
                </p>
              </div>
              <div className="rounded-xl border border-border/80 bg-card/75 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Total Records</p>
                <p className="mt-2 text-2xl font-semibold inline-flex items-center gap-2">
                  <Database className="h-5 w-5 text-cyan-soft" />
                  {totalRecords}
                </p>
              </div>
              <div className="rounded-xl border border-border/80 bg-card/75 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Registration Status</p>
                <p className="mt-2 text-2xl font-semibold">{getRegistrationStatus()}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card/75 p-4 sm:p-5 flex flex-wrap items-center gap-3">
              <button
                className="btn inline-flex items-center gap-2"
                onClick={fetchRegistrations}
                disabled={dataLoading}
              >
                {dataLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Users className="h-4 w-4" />}
                Load Registrations
              </button>

              <button className="btn inline-flex items-center gap-2" onClick={fetchContacts} disabled={dataLoading}>
                {dataLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Load Contacts
              </button>

              <button
                className="btn inline-flex items-center gap-2"
                onClick={downloadRegistrationsCsv}
                disabled={registrations.length === 0}
              >
                <Download className="h-4 w-4" />
                Download CSV
              </button>

              <button className="btn inline-flex items-center gap-2" onClick={async () => { await fetchSettings(); }}>
                <RefreshCw className="h-4 w-4" />
                Refresh Public Settings
              </button>

              <button
                className={`btn inline-flex items-center gap-2 ${regEnabled ? "border-red-500/40 text-red-300" : "border-emerald-500/40 text-emerald-300"}`}
                onClick={toggleRegistration}
                disabled={regEnabled === null || dataLoading}
              >
                {regEnabled ? <Lock className="h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
                {regEnabled ? "Close Registrations" : "Open Registrations"}
              </button>
            </div>

            {(notice || error) && (
              <div className="space-y-2">
                {notice && (
                  <div className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-100 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{notice}</span>
                  </div>
                )}
                {error && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-100 text-sm">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-xl border border-border/80 bg-card/75 px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Registration status</p>
                <p className="text-base font-semibold">{getRegistrationStatus()}</p>
              </div>
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${statusTone}`}>
                {regEnabled ? <LockOpen className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                {regEnabled === null ? "Awaiting settings" : regEnabled ? "Accepting applications" : "Registrations closed"}
              </div>
            </div>

            <section>
              <h2 className="text-xl font-semibold mb-2">Registrations</h2>
              <div className="overflow-x-auto rounded-xl border border-border/80 bg-card/75 p-4">
                {registrations.length === 0 ? <p>No registrations loaded.</p> : (
                  <table className="w-full text-sm">
                    <thead className="text-left text-muted-foreground">
                      <tr className="border-b border-border/70">
                        <th className="pb-3 pr-3">Name</th>
                        <th className="pb-3 pr-3">Email</th>
                        <th className="pb-3 pr-3">Semester</th>
                        <th className="pb-3 pr-3">Department</th>
                        <th className="pb-3 pr-3">CNIC</th>
                        <th className="pb-3 pr-3">Living Status</th>
                        <th className="pb-3 pr-3">Preferred</th>
                        <th className="pb-3 pr-3">WhatsApp</th>
                        <th className="pb-3 pr-3">LinkedIn</th>
                        <th className="pb-3 pr-3">Experience</th>
                        <th className="pb-3 pr-3">Skills</th>
                        <th className="pb-3 pr-3">Motivation</th>
                        <th className="pb-3 pr-3">NSME Knowledge</th>
                        <th className="pb-3">Submitted</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((r: any) => (
                        <tr key={r.id} className="border-b border-border/40 align-top">
                          <td className="py-3 pr-3 font-medium">{r.name}</td>
                          <td className="py-3 pr-3">{r.email}</td>
                          <td className="py-3 pr-3">{r.semester}</td>
                          <td className="py-3 pr-3">{r.department}</td>
                          <td className="py-3 pr-3">{r.cnic}</td>
                          <td className="py-3 pr-3">{r.living_status}</td>
                          <td className="py-3 pr-3">{r.preferred_department}</td>
                          <td className="py-3 pr-3">{r.whatsapp_number}</td>
                          <td className="py-3 pr-3 max-w-xs whitespace-pre-wrap wrap-break-word">{r.linkedin_url}</td>
                          <td className="py-3 pr-3 max-w-xs whitespace-pre-wrap wrap-break-word">{r.any_experience}</td>
                          <td className="py-3 pr-3 max-w-xs whitespace-pre-wrap wrap-break-word">{r.skills}</td>
                          <td className="py-3 pr-3 max-w-xs whitespace-pre-wrap wrap-break-word">{r.motivation}</td>
                          <td className="py-3 pr-3 max-w-xs whitespace-pre-wrap wrap-break-word">{r.nsme_knowledge}</td>
                          <td className="py-3">{formatDate(r.created_at)}</td>
                          <td className="py-3 text-right">
                            <button
                              className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition-colors hover:border-red-400/50 hover:bg-red-500/15 disabled:opacity-60"
                              onClick={() => deleteRegistration(String(r.id))}
                              disabled={deleteLoading === `registration-${r.id}`}
                            >
                              {deleteLoading === `registration-${r.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Contact Inquiries</h2>
              <div className="overflow-x-auto rounded-xl border border-border/80 bg-card/75 p-4">
                {contacts.length === 0 ? <p>No contacts loaded.</p> : (
                  <table className="w-full text-sm">
                    <thead className="text-left text-muted-foreground">
                      <tr className="border-b border-border/70">
                        <th className="pb-3 pr-3">Name</th>
                        <th className="pb-3 pr-3">Email</th>
                        <th className="pb-3 pr-3">Dept</th>
                        <th className="pb-3 pr-3">Semester</th>
                        <th className="pb-3 pr-3">Message</th>
                        <th className="pb-3">Submitted</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((c: any) => (
                        <tr key={c.id} className="border-b border-border/40 align-top">
                          <td className="py-3 pr-3 font-medium">{c.name}</td>
                          <td className="py-3 pr-3">{c.email}</td>
                          <td className="py-3 pr-3">{c.department}</td>
                          <td className="py-3 pr-3">{c.semester}</td>
                          <td className="py-3 pr-3 max-w-xs whitespace-pre-wrap wrap-break-word">{c.message}</td>
                          <td className="py-3">{formatDate(c.created_at)}</td>
                          <td className="py-3 text-right">
                            <button
                              className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition-colors hover:border-red-400/50 hover:bg-red-500/15 disabled:opacity-60"
                              onClick={() => deleteContact(String(c.id))}
                              disabled={deleteLoading === `contact-${c.id}`}
                            >
                              {deleteLoading === `contact-${c.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
