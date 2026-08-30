import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [registrationEnabled, setRegistrationEnabled] = useState<boolean | null>(null);
  const [preferredTeam, setPreferredTeam] = useState("Technical");
  const [technicalBranch, setTechnicalBranch] = useState("Design & Analysis");

  useEffect(() => {
    // fetch public settings; if not available, assume enabled
    (async () => {
      try {
        const { data, error } = await supabase.rpc("get_public_settings");
        if (!error && data && data.length && data[0].registration_enabled !== undefined) {
          setRegistrationEnabled(Boolean(data[0].registration_enabled));
        } else if (!error && data && data.registration_enabled !== undefined) {
          // sometimes rpc returns object
          setRegistrationEnabled(Boolean((data as any).registration_enabled));
        } else {
          setRegistrationEnabled(true);
        }
      } catch (e) {
        setRegistrationEnabled(true);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const f = e.currentTarget;
    const fd = new FormData(f);
    const name = (fd.get("name") as string) || "";
    const semester = Number(fd.get("semester")) || 1;
    const department = (fd.get("department") as string) || "";
    const cnic = (fd.get("cnic") as string) || "";
    const living_status = (fd.get("living_status") as string) || "Hostelite";
    const preferred_team = (fd.get("preferred_team") as string) || "Technical";
    const preferred_department =
      preferred_team === "Technical"
        ? (fd.get("technical_branch") as string) || "Design & Analysis"
        : preferred_team;
    const email = (fd.get("email") as string) || "";
    const any_experience = (fd.get("any_experience") as string) || null;
    const skills = (fd.get("skills") as string) || "";
    const whatsapp_number = (fd.get("whatsapp_number") as string) || "";
    const linkedin_url = (fd.get("linkedin_url") as string) || null;
    const motivation = (fd.get("motivation") as string) || "";
    const nsme_knowledge = (fd.get("nsme_knowledge") as string) || "";

    if (name.length < 2 || name.length > 100) return setError("Name must be 2-100 characters");
    if (cnic.length !== 13 || !/^[0-9]{13}$/.test(cnic)) return setError("CNIC must be 13 digits");
    if (skills.length === 0 || skills.length > 300) return setError("Skills required (max 300 chars)");
    if (whatsapp_number.length < 11 || whatsapp_number.length > 13) return setError("WhatsApp number must be 11-13 digits");
    if (motivation.length < 20 || motivation.length > 1000) return setError("Motivation must be 20-1000 characters");
    if (nsme_knowledge.length < 5 || nsme_knowledge.length > 500) return setError("Please share what you know about NSME (5-500 characters)");

    setLoading(true);
    const { data, error: supaErr } = await supabase.from("registration_responses").insert([
      {
        name,
        semester,
        department,
        cnic,
        living_status,
        preferred_department,
        email,
        any_experience,
        skills,
        whatsapp_number,
        linkedin_url,
        motivation,
        nsme_knowledge,
      },
    ]);
    setLoading(false);
    if (supaErr) {
      setError(supaErr.message);
      return;
    }
    setSuccess("Registration submitted — thank you!");
    f.reset();
  };

  if (registrationEnabled === false) {
    return (
      <div className="container mx-auto px-6 py-14">
        <div className="max-w-2xl mx-auto rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl p-8 text-center shadow-card">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15 text-red-300">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Registrations are currently closed</h3>
          <p className="text-sm text-muted-foreground">Check back later. We will reopen applications in the next recruitment cycle.</p>
        </div>
      </div>
    );
  }

  if (registrationEnabled === null) {
    return (
      <section className="container mx-auto px-6 py-14">
        <div className="max-w-3xl mx-auto rounded-2xl border border-border/80 bg-card/80 p-8 text-center">
          <Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin text-cyan-soft" />
          <p className="text-sm text-muted-foreground">Loading registration status...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-12 sm:py-14">
      <div className="max-w-4xl mx-auto rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-cyan-glow/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-navy-light/35 blur-3xl pointer-events-none" />

        <div className="relative">
          <p className="inline-flex rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-1 text-xs tracking-wide uppercase text-cyan-soft">Membership Application</p>
          <h3 className="mt-3 text-2xl sm:text-3xl font-semibold">Join NSME</h3>
          <p className="mt-2 text-sm text-muted-foreground">Share your profile and motivation to become part of the team.</p>
        </div>

        {(success || error) && (
          <div className="mt-5 space-y-2">
            {success && (
              <div className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-100 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{success}</span>
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

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Full Name</label>
            <input name="name" placeholder="Your full name" className="input w-full rounded-xl border border-border/80 bg-background/70" required minLength={2} maxLength={100} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Semester</label>
            <select name="semester" className="input w-full rounded-xl border border-border/80 bg-background/70">
              {Array.from({ length: 8 }, (_, i) => i + 1).map((s) => (
                <option value={s} key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Department</label>
            <input name="department" placeholder="Your department" className="input w-full rounded-xl border border-border/80 bg-background/70" required minLength={2} maxLength={100} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">CNIC</label>
            <input name="cnic" placeholder="13 digits (without dashes)" className="input w-full rounded-xl border border-border/80 bg-background/70" required />
          </div>

          <div className="md:col-span-2 rounded-xl border border-border/80 bg-background/40 p-4">
            <p className="text-sm font-medium mb-2">Living Status</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2"><input type="radio" name="living_status" value="Hostelite" defaultChecked /> Hostelite</label>
              <label className="flex items-center gap-2"><input type="radio" name="living_status" value="Out Living" /> Out Living</label>
            </div>
          </div>

          <div className="md:col-span-2 rounded-xl border border-border/80 bg-background/40 p-4">
            <p className="text-sm font-medium mb-2">Preferred Team</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="preferred_team"
                  value="Technical"
                  checked={preferredTeam === "Technical"}
                  onChange={() => setPreferredTeam("Technical")}
                />
                Technical
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="preferred_team"
                  value="Marketing"
                  checked={preferredTeam === "Marketing"}
                  onChange={() => setPreferredTeam("Marketing")}
                />
                Marketing
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="preferred_team"
                  value="Media & Communication"
                  checked={preferredTeam === "Media & Communication"}
                  onChange={() => setPreferredTeam("Media & Communication")}
                />
                Media & Communication
              </label>
            </div>

            {preferredTeam === "Technical" && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Choose your technical branch</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="technical_branch"
                      value="Design & Analysis"
                      checked={technicalBranch === "Design & Analysis"}
                      onChange={() => setTechnicalBranch("Design & Analysis")}
                    />
                    Design & Analysis
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="technical_branch"
                      value="Fabrication Unit"
                      checked={technicalBranch === "Fabrication Unit"}
                      onChange={() => setTechnicalBranch("Fabrication Unit")}
                    />
                    Fabrication Unit
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="technical_branch"
                      value="Automation & Control"
                      checked={technicalBranch === "Automation & Control"}
                      onChange={() => setTechnicalBranch("Automation & Control")}
                    />
                    Automation & Control
                  </label>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input name="email" type="email" placeholder="you@example.com" className="input w-full rounded-xl border border-border/80 bg-background/70" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">WhatsApp Number</label>
            <input name="whatsapp_number" placeholder="03XXXXXXXXX" className="input w-full rounded-xl border border-border/80 bg-background/70" required />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">LinkedIn Profile (Optional)</label>
            <input name="linkedin_url" placeholder="https://linkedin.com/in/your-profile" className="input w-full rounded-xl border border-border/80 bg-background/70" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Any Experience (Optional)</label>
            <textarea name="any_experience" placeholder="Tell us about relevant projects or work" className="input min-h-24 w-full rounded-xl border border-border/80 bg-background/70" maxLength={500} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Skills</label>
            <textarea name="skills" placeholder="Share your key strengths" className="input min-h-24 w-full rounded-xl border border-border/80 bg-background/70" required maxLength={300} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Motivation</label>
            <textarea name="motivation" placeholder="What motivates you to join NSME?" className="input min-h-32 w-full rounded-xl border border-border/80 bg-background/70" required minLength={20} maxLength={1000} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">What do you know about NSME?</label>
            <textarea name="nsme_knowledge" placeholder="Share your understanding of the society, its projects, and achievements" className="input min-h-24 w-full rounded-xl border border-border/80 bg-background/70" required minLength={5} maxLength={500} />
          </div>

          <div className="md:col-span-2 flex flex-col items-center gap-3 pt-2">
            <button className="btn inline-flex items-center gap-2" type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? "Submitting..." : "Submit Application"}
            </button>
            <p className="text-xs text-muted-foreground text-center">Fields marked required must be completed before submission.</p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterForm;
