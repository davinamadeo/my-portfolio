"use client";

import { useEffect, useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const socials = [
  {
    label: "GitHub",
    handle: "@davinamadeo",
    href: "https://github.com/davinamadeo",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "Davin Amadeo Wijaya",
    href: "https://linkedin.com/in/davin-amadeo-3a250a288",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "davinamadeo1110@email.com",
    href: "mailto:davinamadeo1110@email.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      // Replace YOUR_FORM_ID with your Formspree form ID
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });

      if (res.ok) {
        setFormState("success");
        setFields({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-neutral-900/50 px-4 py-3 text-sm font-light text-neutral-200 placeholder-neutral-600 outline-none transition-all duration-200";

  const inputIdle = "border-neutral-800";
  const inputFocused = "border-[#18130E] bg-neutral-900/80 shadow-[0_0_0_3px_rgba(24,19,14,0.06)]";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-28 md:px-12 lg:px-24"
    >
      {/* Section label */}
      <div
        className={`mb-16 flex items-center gap-4 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <span className="h-px w-12 bg-[#18130E]/30" aria-hidden="true" />
        <span className="text-xs font-light uppercase tracking-[0.2em] text-neutral-500">
          Contact
        </span>
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_420px]">

          {/* ── Left: form ── */}
          <div>
            {/* Heading */}
            <div
              className={`mb-10 transition-all duration-700 delay-100 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <h2 className="font-serif text-5xl leading-tight tracking-tight text-neutral-100 md:text-6xl">
                Let&apos;s build
                <br />
                <span className="italic text-neutral-500">something.</span>
              </h2>
              <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-neutral-500">
                Open to internships, full-time roles, and interesting collaborations.
                Drop me a message and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Form */}
            <div
              className={`transition-all duration-700 delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {formState === "success" ? (
                <div className="flex flex-col items-start gap-4 rounded-2xl border border-emerald-900/50 bg-emerald-950/30 p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-800 bg-emerald-900/40">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M3 9l4 4 8-8" stroke="#34d399" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-serif text-xl text-neutral-100">Message sent.</p>
                    <p className="mt-1 text-sm font-light text-neutral-500">
                      Thanks for reaching out — I&apos;ll be in touch soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-2 text-xs font-light text-neutral-600 underline underline-offset-4 hover:text-neutral-400 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-light uppercase tracking-widest text-neutral-600">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={fields.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} ${focused === "name" ? inputFocused : inputIdle}`}
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-light uppercase tracking-widest text-neutral-600">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={fields.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} ${focused === "email" ? inputFocused : inputIdle}`}
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-light uppercase tracking-widest text-neutral-600">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about the role, project, or just say hi…"
                      value={fields.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} resize-none ${focused === "message" ? inputFocused : inputIdle}`}
                    />
                  </div>

                  {/* Error */}
                  {formState === "error" && (
                    <p className="text-xs font-light text-red-400">
                      Something went wrong. Try emailing me directly instead.
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="group mt-2 flex items-center gap-2 self-start rounded-full bg-[#18130E] px-6 py-3 text-sm font-medium text-[#F0EBE1] transition-all duration-200 hover:bg-[#3C3630] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "submitting" ? (
                      <>
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14"
                          fill="none" aria-hidden="true">
                          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"
                            strokeDasharray="8 6" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <path d="M1 12L12 1M12 1H5M12 1V8" stroke="currentColor"
                            strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Right: info panel ── */}
          <div
            className={`flex flex-col gap-6 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Response time */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs uppercase tracking-widest text-neutral-600">
                  Status
                </span>
              </div>
              <p className="font-serif text-2xl text-neutral-100">
                Available for work
              </p>
              <p className="mt-1 text-sm font-light text-neutral-500">
                Actively looking for internship and full-time opportunities starting{" "}
                <span className="text-neutral-300">June 2026</span>.
              </p>
            </div>

            {/* Socials */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
              <p className="mb-4 text-xs uppercase tracking-widest text-neutral-600">
                Find me elsewhere
              </p>
              <ul className="flex flex-col gap-3" role="list">
                {socials.map(({ label, handle, href, icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5 transition-all duration-200 hover:border-neutral-800 hover:bg-neutral-900/60"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-600 transition-colors group-hover:text-neutral-100">
                          {icon}
                        </span>
                        <div>
                          <p className="text-xs font-light text-neutral-500">{label}</p>
                          <p className="text-sm font-light text-neutral-300">{handle}</p>
                        </div>
                      </div>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                        aria-hidden="true"
                        className="text-neutral-700 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-100">
                        <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor"
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/30 px-5 py-4">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                className="shrink-0 text-neutral-600">
                <path d="M7 1C4.791 1 3 2.791 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.209-1.791-4-4-4z"
                  stroke="currentColor" strokeWidth="1.2" />
                <circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-600">Location</p>
                <p className="text-sm font-light text-neutral-400">Surabaya, Indonesia</p>
              </div>
              <span className="ml-auto text-xs font-light text-neutral-600">
                GMT+7
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}