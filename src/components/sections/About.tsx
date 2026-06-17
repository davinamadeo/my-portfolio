"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const facts = [
  { label: "Based in", value: "Surabaya, Indonesia" },
  { label: "Studying", value: "Computer Science" },
  { label: "University", value: "Institut Teknologi Sepuluh Nopember" },
  { label: "Available", value: "June 2026 onwards" },
];

const interests = [
  "Software Engineering",
  "System Design",
  "UI/UX",
  "Machine Learning",
  "Developer Tools",
  "Software Quality",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
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
          About
        </span>
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px] lg:gap-24">

          {/* ── Left: text content ── */}
          <div className="flex flex-col justify-center">

            {/* Heading */}
            <div
              className={`transition-all duration-700 delay-100 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <h2 className="font-serif text-5xl leading-tight tracking-tight text-neutral-100 md:text-6xl">
                A developer who
                <br />
                <span className="italic text-neutral-500">cares about craft.</span>
              </h2>
            </div>

            {/* Bio */}
            <div
              className={`mt-8 space-y-4 transition-all duration-700 delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="font-sans text-base font-light leading-relaxed text-neutral-400">
                Hi! I&apos;m <span className="text-neutral-200">Davin Amadeo Wijaya</span>, a computer science
                student with a deep interest in building things that are both
                technically solid and genuinely enjoyable to use.
              </p>
              <p className="font-sans text-base font-light leading-relaxed text-neutral-400">
                What drives me is the intersection of clean engineering and thoughtful design, writing code that
                doesn&apos;t just work, but works{" "}
                <span className="bold text-neutral-300">well</span>.
              </p>
              <p className="font-sans text-base font-light leading-relaxed text-neutral-400">
                Outside of code I&apos;m really into basketball, music, movies, and TV shows.
                I believe the best developers are curious about everything, not just tech.
              </p>
            </div>

            {/* Facts grid */}
            <div
              className={`mt-10 grid grid-cols-2 gap-4 transition-all duration-700 delay-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {facts.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 border-l border-neutral-800 pl-4"
                >
                  <span className="text-[10px] uppercase tracking-widest text-neutral-600">
                    {label}
                  </span>
                  <span className="text-sm font-light text-neutral-300">{value}</span>
                </div>
              ))}
            </div>

            {/* Interests */}
            <div
              className={`mt-10 transition-all duration-700 delay-[400ms] ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="mb-3 text-[10px] uppercase tracking-widest text-neutral-600">
                Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs font-light text-neutral-400 transition-colors duration-200 hover:border-[#18130E] hover:text-neutral-100"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: photo card ── */}
          <div
            className={`flex flex-col gap-4 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Photo */}
            <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">

              {/* Image — swap src with your actual photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/profile.jpg"
                  alt="Davin Amadeo Wijaya"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 380px"
                  priority
                  onError={(e) => {
                    // Fallback if image doesn't exist yet
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Placeholder shown when no image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-900">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="16" cy="12" r="5" stroke="#525252" strokeWidth="1.5" />
                      <path
                        d="M5 27c0-6.075 4.925-11 11-11s11 4.925 11 11"
                        stroke="#525252"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="text-xs font-light text-neutral-600">
                    Add your photo to{" "}
                    <code className="text-neutral-500">public/images/profile.jpg</code>
                  </p>
                </div>

              </div>

              {/* Card footer */}
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-light text-neutral-200">Davin Amadeo Wijaya</p>
                  <p className="text-xs font-light text-neutral-500">Software Developer</p>
                </div>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-500 transition-all duration-200 hover:border-[#18130E] hover:text-neutral-100"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Mini stat card */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3">
                <span className="font-serif text-2xl text-neutral-100">∞</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-600">
                  Curiosity
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3">
                <span className="font-serif text-2xl text-neutral-100">01</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-600">
                  Focus area
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}