"use client";

import { NavProvider, SectionSlide, useNav } from "@/components/layout/Navbar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import type { Section } from "@/components/layout/Navbar";

// ── Per-section background definitions ──
// Each is a fixed layer that fades in/out with the active section.
const SECTION_BACKGROUNDS: Record<Section, React.ReactNode> = {

  // Home — warm amber orbs, organic glow
  home: (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 45% 30% at 8%  18%, rgba(251,191,36,0.10) 0%, transparent 100%),
          radial-gradient(ellipse 30% 40% at 88% 78%, rgba(251,191,36,0.07) 0%, transparent 100%),
          radial-gradient(ellipse 22% 22% at 62% 22%, rgba(251,191,36,0.08) 0%, transparent 100%),
          radial-gradient(ellipse 35% 22% at 28% 88%, rgba(99,102,241,0.05) 0%, transparent 100%),
          radial-gradient(ellipse 18% 28% at 75% 48%, rgba(251,191,36,0.05) 0%, transparent 100%)
        `,
      }} />
    </>
  ),

  // About — cool blue-indigo, calm and personal
  about: (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 50% 40% at 15% 30%, rgba(99,102,241,0.10) 0%, transparent 100%),
          radial-gradient(ellipse 35% 50% at 85% 70%, rgba(139,92,246,0.07) 0%, transparent 100%),
          radial-gradient(ellipse 25% 30% at 55% 80%, rgba(99,102,241,0.05) 0%, transparent 100%)
        `,
      }} />
    </>
  ),

  // Skills — teal/emerald, technical, fresh
  skills: (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 40% 35% at 20% 15%, rgba(16,185,129,0.09) 0%, transparent 100%),
          radial-gradient(ellipse 30% 40% at 80% 80%, rgba(6,182,212,0.07) 0%, transparent 100%),
          radial-gradient(ellipse 20% 25% at 60% 50%, rgba(16,185,129,0.05) 0%, transparent 100%)
        `,
      }} />
    </>
  ),

  // Projects — amber/orange, energetic, creative
  projects: (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 45% 35% at 85% 20%, rgba(251,191,36,0.10) 0%, transparent 100%),
          radial-gradient(ellipse 35% 45% at 10% 75%, rgba(249,115,22,0.07) 0%, transparent 100%),
          radial-gradient(ellipse 25% 25% at 50% 55%, rgba(251,191,36,0.05) 0%, transparent 100%)
        `,
      }} />
    </>
  ),

  // Contact — rose/pink, warm, inviting
  contact: (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 40% 35% at 75% 25%, rgba(244,63,94,0.08) 0%, transparent 100%),
          radial-gradient(ellipse 35% 40% at 20% 70%, rgba(251,191,36,0.07) 0%, transparent 100%),
          radial-gradient(ellipse 22% 28% at 50% 85%, rgba(244,63,94,0.05) 0%, transparent 100%)
        `,
      }} />
    </>
  ),
};

// ── Shared elements always visible ──
function SharedBackground() {
  return (
    <>
      {/* Base dark */}
      <div style={{ position: "absolute", inset: 0, background: "#0a0a0a" }} />

      {/* Dot grid — always present */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Vignette — always present */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Edge fades */}
      <div aria-hidden="true" style={{ position: "absolute", inset: "0 0 auto 0", height: "8rem", background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: "auto 0 0 0", height: "8rem", background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
    </>
  );
}

// ── Crossfading background layer ──
function SectionBackground() {
  const { activeSection } = useNav();

  return (
    <>
      {(Object.keys(SECTION_BACKGROUNDS) as Section[]).map((section) => (
        <div
          key={section}
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            opacity: activeSection === section ? 1 : 0,
            transition: "opacity 0.7s ease",
            pointerEvents: "none",
          }}
        >
          {SECTION_BACKGROUNDS[section]}
        </div>
      ))}
    </>
  );
}

// ── Page ──
export default function Home() {
  return (
    <NavProvider>
      <Navbar />

      {/* Fixed background — always behind everything */}
      <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <SharedBackground />
        <SectionBackground />
      </div>

      {/* Sections */}
      <main className="relative w-full h-screen overflow-hidden" style={{ zIndex: 1 }}>
        <SectionSlide id="home" className="overflow-y-auto"><Hero /></SectionSlide>
        <SectionSlide id="about"><About /></SectionSlide>
        <SectionSlide id="skills"><Skills /></SectionSlide>
        <SectionSlide id="projects"><Projects /></SectionSlide>
        <SectionSlide id="contact"><Contact /></SectionSlide>
      </main>
    </NavProvider>
  );
}