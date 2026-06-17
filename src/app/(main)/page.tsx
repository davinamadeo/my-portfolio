"use client";

import { NavProvider, SectionSlide, useNav } from "@/components/layout/Navbar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import type { Section } from "@/components/layout/Navbar";

const B = "#18130E";
const T = "#BEB9B0";

interface BlockState {
  tx: string;
  ty: string;
  width: number;
  height: number;
  rotate: number;
  opacity: number;
}

interface BlockConfig {
  color: string;
  sections: Record<Section, BlockState>;
}

// Each block is a "character" that moves between positions as the active section changes.
// All blocks sit at top:0/left:0 and are positioned entirely via CSS transform: translate+rotate.
// CSS transitions animate all properties simultaneously → blocks appear to physically move.
const BLOCKS: BlockConfig[] = [
  // Block 0: T — large taupe corner base (migrates between corners)
  {
    color: T,
    sections: {
      home:     { tx: "calc(100vw - 348px)", ty: "-16px",                    width: 300, height: 180, rotate: 0,  opacity: 1 },
      about:    { tx: "-20px",               ty: "8vh",                      width: 320, height: 200, rotate: 0,  opacity: 1 },
      skills:   { tx: "calc(100vw - 336px)", ty: "-16px",                    width: 320, height: 560, rotate: 0,  opacity: 1 },
      projects: { tx: "-16px",               ty: "-16px",                    width: 360, height: 240, rotate: 0,  opacity: 1 },
      contact:  { tx: "calc(100vw - 276px)", ty: "-16px",                    width: 260, height: 190, rotate: 0,  opacity: 1 },
    },
  },
  // Block 1: B — primary dark anchor (dominant corner slab)
  {
    color: B,
    sections: {
      home:     { tx: "calc(100vw - 220px)", ty: "0px",                      width: 220, height: 260, rotate: -3, opacity: 1 },
      about:    { tx: "0px",                 ty: "14vh",                     width: 200, height: 300, rotate: -2, opacity: 1 },
      skills:   { tx: "calc(100vw - 210px)", ty: "0px",                      width: 210, height: 400, rotate: 0,  opacity: 1 },
      projects: { tx: "0px",                 ty: "0px",                      width: 270, height: 170, rotate: 3,  opacity: 1 },
      contact:  { tx: "calc(100vw - 180px)", ty: "0px",                      width: 180, height: 280, rotate: 0,  opacity: 1 },
    },
  },
  // Block 2: B — secondary top accent
  {
    color: B,
    sections: {
      home:     { tx: "0px",                 ty: "0px",                      width: 180, height: 120, rotate: 0,  opacity: 1 },
      about:    { tx: "calc(100vw - 140px)", ty: "0px",                      width: 140, height:  90, rotate: 0,  opacity: 1 },
      skills:   { tx: "calc(100vw + 200px)", ty: "-300px",                   width: 180, height: 120, rotate: 0,  opacity: 0 },
      projects: { tx: "calc(100vw - 14px)",  ty: "22vh",                     width:  14, height: 220, rotate: 0,  opacity: 1 },
      contact:  { tx: "8vw",                 ty: "38vh",                     width:  56, height:  56, rotate: -4, opacity: 1 },
    },
  },
  // Block 3: B — thin stripe / mid accent
  {
    color: B,
    sections: {
      home:     { tx: "0px",                 ty: "32vh",                     width:  12, height: 160, rotate: 1,  opacity: 1 },
      about:    { tx: "0px",                 ty: "50vh",                     width:  12, height: 180, rotate: 0,  opacity: 1 },
      skills:   { tx: "4vw",                 ty: "42vh",                     width:  64, height:  64, rotate: 3,  opacity: 1 },
      projects: { tx: "2vw",                ty: "35vh",                     width:  60, height: 350, rotate: -10,  opacity: 1 },
      contact:  { tx: "-100px",              ty: "-100px",                   width:  12, height: 160, rotate: 0,  opacity: 0 },
    },
  },
  // Block 4: B — small floating square / thin bar
  {
    color: B,
    sections: {
      home:     { tx: "calc(92vw - 56px)",   ty: "48vh",                     width:  56, height:  56, rotate: 6,  opacity: 1 },
      about:    { tx: "calc(100vw - 142px)", ty: "70px",                     width:  52, height:  52, rotate: 5,  opacity: 1 },
      skills:   { tx: "calc(4vw + 70px)",    ty: "42vh",                     width:  14, height: 160, rotate: 0,  opacity: 1 },
      projects: { tx: "calc(100vw - 124px)", ty: "36vh",                     width:  72, height:  72, rotate: -4, opacity: 1 },
      contact:  { tx: "calc(100vw + 100px)", ty: "48vh",                     width:  56, height:  56, rotate: 0,  opacity: 0 },
    },
  },
  // Block 5: T — large taupe bottom base
  {
    color: T,
    sections: {
      home:     { tx: "-16px",               ty: "calc(100vh - 164px)",      width: 260, height: 180, rotate: 0,  opacity: 1 },
      about:    { tx: "calc(100vw - 356px)", ty: "calc(100vh - 164px)",      width: 340, height: 180, rotate: 0,  opacity: 1 },
      skills:   { tx: "-400px",              ty: "calc(100vh - 164px)",      width: 260, height: 180, rotate: 0,  opacity: 0 },
      projects: { tx: "calc(110vw - 356px)", ty: "calc(100vh - 224px)",      width: 240, height: 240, rotate: 0,  opacity: 1 },
      contact:  { tx: "-16px",               ty: "calc(100vh - 184px)",      width: 300, height: 200, rotate: 0,  opacity: 1 },
    },
  },
  // Block 6: B — bottom dark anchor
  {
    color: B,
    sections: {
      home:     { tx: "0px",                 ty: "calc(100vh - 200px)",      width: 180, height: 200, rotate: 2,  opacity: 1 },
      about:    { tx: "calc(100vw - 240px)", ty: "calc(100vh - 110px)",      width: 240, height: 110, rotate: 1,  opacity: 1 },
      skills:   { tx: "-16px",               ty: "calc(100vh - 150px)",      width: 240, height: 150, rotate: 0,  opacity: 1 },
      projects: { tx: "calc(100vw - 250px)", ty: "calc(100vh - 170px)",      width: 250, height: 170, rotate: -3, opacity: 1 },
      contact:  { tx: "0px",                 ty: "calc(100vh - 140px)",      width: 210, height: 140, rotate: 2,  opacity: 1 },
    },
  },
  // Block 7: T — wide accent strip / small square
  {
    color: T,
    sections: {
      home:     { tx: "calc(100vw - 200px)", ty: "calc(100vh - 112px)",      width: 200, height:  72, rotate: -2, opacity: 1 },
      about:    { tx: "calc(100vw + 300px)", ty: "calc(100vh - 112px)",      width: 200, height:  72, rotate: -2, opacity: 0 },
      skills:   { tx: "200px",               ty: "calc(100vh - 202px)",      width:  52, height:  52, rotate: 0,  opacity: 1 },
      projects: { tx: "0px",                 ty: "calc(100vh - 90px)",       width: 150, height:  90, rotate: 0,  opacity: 1 },
      contact:  { tx: "calc(100vw + 300px)", ty: "calc(100vh - 112px)",      width: 200, height:  72, rotate: -2, opacity: 0 },
    },
  },
  // Block 8: B — bottom-right corner block
  {
    color: B,
    sections: {
      home:     { tx: "calc(100vw - 100px)", ty: "calc(100vh - 100px)",      width: 100, height: 100, rotate: 0,  opacity: 1 },
      about:    { tx: "calc(100vw + 200px)", ty: "calc(100vh - 100px)",      width: 100, height: 100, rotate: 0,  opacity: 0 },
      skills:   { tx: "calc(100vw + 200px)", ty: "calc(100vh - 100px)",      width: 100, height: 100, rotate: 0,  opacity: 0 },
      projects: { tx: "calc(100vw - 100px)", ty: "calc(5vh - 100px)",      width: 300, height: 200, rotate: 20,  opacity: 1 },
      contact:  { tx: "calc(100vw - 180px)", ty: "calc(100vh - 120px)",      width: 180, height: 120, rotate: 0,  opacity: 1 },
    },
  },
];

const BLOCK_TRANSITION = [
  "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
  "width 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
  "height 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
  "opacity 0.4s ease",
].join(", ");

function AnimatedBackground() {
  const { activeSection } = useNav();

  return (
    <div
      className="hidden md:block"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {BLOCKS.map((block, i) => {
        const pos = block.sections[activeSection];
        return (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${pos.width}px`,
              height: `${pos.height}px`,
              backgroundColor: block.color,
              transform: `translate(${pos.tx}, ${pos.ty}) rotate(${pos.rotate}deg)`,
              opacity: pos.opacity,
              transition: BLOCK_TRANSITION,
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <NavProvider>
      <Navbar />

      {/* Fixed background — base colour + blocks that physically move between section compositions */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ backgroundColor: "#D9D4C8" }}
      >
        <AnimatedBackground />
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
