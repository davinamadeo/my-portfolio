"use client";

import { useEffect, useState } from "react";
import { useNav } from "@/components/layout/Navbar";

const roles = [
  "Software Engineer",
  "Frontend Developer",
  "Full Stack Developer",
  "AI Engineer",
  "Technical Writer",
];

export default function Hero() {
  const { navigateTo } = useNav();
  const [mounted, setMounted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 30);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section
      className="relative flex h-screen w-full flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-24"
      aria-label="Introduction"
    >

      {/* ── BACKGROUND LAYER ── */}

      {/* Noise grain — organic, non-repeating texture */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.045 }}
      >
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* Scattered glow orbs — no grid, organic positions */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 45% 30% at 8%  18%,  rgba(251,191,36,0.07) 0%, transparent 100%),
            radial-gradient(ellipse 30% 40% at 88% 78%,  rgba(251,191,36,0.05) 0%, transparent 100%),
            radial-gradient(ellipse 22% 22% at 62% 22%,  rgba(251,191,36,0.06) 0%, transparent 100%),
            radial-gradient(ellipse 35% 22% at 28% 88%,  rgba(99,102,241,0.04) 0%, transparent 100%),
            radial-gradient(ellipse 18% 28% at 75% 48%,  rgba(251,191,36,0.04) 0%, transparent 100%)
          `,
        }}
      />

      {/* Vignette — darkens edges to focus center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Top-edge fade — keeps nav pills readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }}
      />

      {/* Bottom-edge fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
      />

      {/* Left vertical rule */}
      <div
        aria-hidden="true"
        className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-700/40 to-transparent md:left-12 lg:left-24"
      />

      {/* ── CONTENT ── */}
      <div className="relative mx-auto w-full max-w-5xl">

        {/* Main heading */}
        <div className="overflow-hidden">
          <h1
            className={`font-serif text-6xl leading-[1.05] tracking-tight text-neutral-100 sm:text-7xl md:text-8xl lg:text-9xl transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-100 translate-y-full"
            }`}
          >
            Davin Amadeo
            <br />
            <span className="italic text-neutral-500">Wijaya</span>
            <span className="text-amber-400">.</span>
          </h1>
        </div>

        {/* Typewriter role */}
        <div
          className={`mt-6 flex items-center gap-3 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="h-px w-8 bg-amber-400/60" aria-hidden="true" />
          <p className="font-sans text-sm font-light tracking-widest text-neutral-400 uppercase">
            <span className="text-amber-400">{displayed}</span>
            <span
              className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-amber-400"
              aria-hidden="true"
            />
          </p>
        </div>

        {/* Bio */}
        <p
          className={`mt-8 max-w-md font-sans text-base font-light leading-relaxed text-neutral-500 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          I build clean, fast, and thoughtful digital experiences.
          Currently looking for internship and full-time roles in software engineering.
        </p>

        {/* CTA buttons */}
        <div
          className={`mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 delay-[400ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={() => navigateTo("projects")}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-amber-400 px-6 py-3 text-sm font-medium text-neutral-950 transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_24px_rgba(251,191,36,0.4)]"
          >
            <span>View my work</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={() => navigateTo("contact")}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-light text-neutral-300 transition-all duration-300 hover:border-neutral-500 hover:text-neutral-100 hover:bg-white/5"
          >
            Get in touch
          </button>

          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-light text-neutral-600 transition-colors duration-200 hover:text-amber-400"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M6.5 1v8M3 6l3.5 3.5L10 6M1 12h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Resume
          </a>
        </div>

        {/* Stats */}
        <div
          className={`mt-16 flex flex-wrap gap-8 border-t border-neutral-800/60 pt-8 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {[
            { value: "10+", label: "Projects built" },
            { value: "3+",  label: "Years coding" },
            { value: "5+",  label: "Technologies" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-serif text-3xl text-neutral-100">{value}</span>
              <span className="text-xs font-light tracking-wide text-neutral-600">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-4 md:px-12 lg:px-24 transition-all duration-700 delay-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-xs font-light tracking-wide text-neutral-700">
          © {new Date().getFullYear()} Davin Amadeo Wijaya
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/davinamadeo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-neutral-700 transition-colors duration-200 hover:text-amber-400"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/davinamadeo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-neutral-700 transition-colors duration-200 hover:text-amber-400"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </footer>

    </section>
  );
}