import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function ContactForm({ id = "contact" }: { id?: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const department = (formData.get("department") as string) || "";
    const semester = Number(formData.get("semester")) || 1;
    const message = (formData.get("message") as string) || "";

    if (name.length < 2 || name.length > 100) return setError("Name must be 2-100 characters");
    if (message.length < 10 || message.length > 1000) return setError("Message must be 10-1000 characters");

    setLoading(true);
    const { data, error: supaErr } = await supabase.from("contact_inquiries").insert([
      { name, email, department, semester, message },
    ]);
    setLoading(false);
    if (supaErr) {
      setError(supaErr.message);
      return;
    }
    setSuccess("Message sent — thank you!");
    form.reset();
  };

  return (
    <section id={id} className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="absolute -top-16 -right-20 h-56 w-56 rounded-full bg-cyan-glow/10 blur-3xl pointer-events-none" />

        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-1 text-xs tracking-wide uppercase text-cyan-soft">
            <MessageSquare className="h-3.5 w-3.5" />
            Contact NSME
          </p>
          <h3 className="mt-3 text-2xl sm:text-3xl font-semibold">Get in touch</h3>
          <p className="mt-2 text-sm text-muted-foreground">Send us your query, feedback, or collaboration request.</p>
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
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input name="name" placeholder="Your name" className="input w-full rounded-xl border border-border/80 bg-background/70" required minLength={2} maxLength={100} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input name="email" type="email" placeholder="you@example.com" className="input w-full rounded-xl border border-border/80 bg-background/70" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Department</label>
            <input name="department" placeholder="Your department" className="input w-full rounded-xl border border-border/80 bg-background/70" required minLength={2} maxLength={100} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Semester</label>
            <select name="semester" defaultValue={"1"} className="input w-full rounded-xl border border-border/80 bg-background/70">
              {Array.from({ length: 8 }, (_, i) => i + 1).map((s) => (
                <option value={s} key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Message</label>
            <textarea name="message" placeholder="Your message" className="input min-h-32 w-full rounded-xl border border-border/80 bg-background/70" required minLength={10} maxLength={1000} />
          </div>

          <div className="md:col-span-2 flex flex-col items-center gap-3">
            <button
              type="submit"
              className="btn inline-flex items-center gap-2 border border-cyan-glow/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? "Sending..." : "Send Message"}
            </button>
            <p className="text-xs text-muted-foreground text-center">We usually reply within 1 to 2 working days.</p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
