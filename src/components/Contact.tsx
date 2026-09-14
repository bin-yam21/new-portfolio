"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Loader2, Mail, Send } from "lucide-react";

import { GithubIcon, LinkedinIcon, TelegramIcon, XIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Button } from "./ui/button";
import { site } from "@/lib/site";

const fieldClass =
  "w-full rounded-xl border border-border bg-input px-4 py-3 text-[0.95rem] text-foreground " +
  "placeholder:text-subtle-foreground transition-colors duration-200 " +
  "hover:border-border-strong focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

const labelClass =
  "mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle-foreground";

const elsewhere = [
  { label: "Telegram", href: site.socials.telegram, Icon: TelegramIcon },
  { label: "GitHub", href: site.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon },
  { label: "X", href: site.socials.x, Icon: XIcon },
];

const MESSAGE_MAX = 5000;

const emptyForm = { name: "", email: "", message: "", company: "" };

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // The route explains *why* it refused (validation, rate limit, missing
      // config); passing that through beats a generic "try again".
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          (data as { error?: string } | null)?.error ??
            "Couldn't send that. Try again, or email me directly."
        );
      }

      toast.success("Message sent — I'll get back to you shortly.");
      setForm(emptyForm);
    } catch (err) {
      toast.error(
        err instanceof Error && err.message
          ? err.message
          : "Couldn't send that. Try again, or email me directly."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-28 py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* ---- Pitch ---- */}
          <div>
            <SectionHeading
              eyebrow="05 — Contact"
              title="Got something worth building?"
              description="Freelance work, a collaboration, or a full-time role — if you're building something that needs to hold up, I'd like to hear about it."
            />

            <Reveal delay={0.15} className="mt-10 space-y-6">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-3 text-[0.95rem]"
              >
                <span className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                  <Mail className="size-[18px]" />
                </span>
                <span className="font-medium underline-offset-4 group-hover:text-accent group-hover:underline">
                  {site.email}
                </span>
              </a>

              <a
                href={site.socials.telegram}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 text-[0.95rem]"
              >
                <span className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                  <TelegramIcon className="size-[18px]" />
                </span>
                <span className="font-medium underline-offset-4 group-hover:text-accent group-hover:underline">
                  Message me on Telegram
                </span>
              </a>

              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle-foreground">
                  Elsewhere
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {elsewhere.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground"
                      >
                        <Icon className="size-4" />
                        {label}
                        <ArrowUpRight className="size-3.5 text-subtle-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ---- Form ---- */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={fieldClass}
                    maxLength={120}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="ada@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={fieldClass}
                    maxLength={200}
                    required
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <span
                    aria-hidden
                    className="mb-2 font-mono text-[0.7rem] text-subtle-foreground"
                  >
                    {form.message.length}/{MESSAGE_MAX}
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me what you're building, roughly when you need it, and where I'd fit."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${fieldClass} resize-none`}
                  minLength={10}
                  maxLength={MESSAGE_MAX}
                  required
                />
              </div>

              {/* Honeypot — hidden from people, irresistible to bots. Not
                  `display: none`, which some bots skip. */}
              <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company (leave this empty)</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="mt-6 w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="size-4" />
                  </>
                )}
              </Button>

              <p className="mt-4 text-center text-xs text-subtle-foreground">
                Usually replies within a day.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
