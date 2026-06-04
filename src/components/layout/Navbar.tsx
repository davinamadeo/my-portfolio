"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// ─────────────────────────────────────────────
// Types & config
// ─────────────────────────────────────────────

export type Section = "home" | "about" | "skills" | "projects" | "contact";

export const SECTION_ORDER: Section[] = [
  "home",
  "about",
  "skills",
  "projects",
  "contact",
];

export const SLIDE_FROM: Record<Section, "left" | "right" | "top" | "bottom"> = {
  home:     "right",
  about:    "left",
  skills:   "top",
  projects: "right",
  contact:  "bottom",
};

export const NAV_EDGE: Partial<Record<Section, "left" | "right" | "top" | "bottom">> = {
  about:    "left",
  skills:   "top",
  projects: "right",
  contact:  "bottom",
};

const ARROW: Record<string, string> = {
  left: "←", right: "→", top: "↑", bottom: "↓",
};

const BORDER_RADIUS: Record<string, string> = {
  left:   "0 12px 12px 0",
  right:  "12px 0 0 12px",
  top:    "0 0 12px 12px",
  bottom: "12px 12px 0 0",
};

const PADDING: Record<string, string> = {
  left:   "14px 18px 14px 10px",
  right:  "14px 10px 14px 18px",
  top:    "10px 20px 16px 20px",
  bottom: "16px 20px 10px 20px",
};

const POSITION_CLASS: Record<string, string> = {
  left:   "fixed left-0 top-1/2 z-50",
  right:  "fixed right-0 top-1/2 z-50",
  top:    "fixed top-0 left-1/2 z-50",
  bottom: "fixed bottom-0 left-1/2 z-50",
};

const BASE_TRANSFORM: Record<string, string> = {
  left:   "translateY(-50%)",
  right:  "translateY(-50%)",
  top:    "translateX(-50%)",
  bottom: "translateX(-50%)",
};

const HIDDEN_TRANSLATE: Record<string, string> = {
  left:   "translateX(-100%)",
  right:  "translateX(100%)",
  top:    "translateY(-100%)",
  bottom: "translateY(100%)",
};

const OPPOSITE: Record<"left" | "right" | "top" | "bottom", "left" | "right" | "top" | "bottom"> = {
  left: "right", right: "left", top: "bottom", bottom: "top",
};

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

import { createContext, useContext } from "react";

interface NavContextValue {
  activeSection: Section;
  leavingSection: Section | null;
  navigateTo: (section: Section) => void;
  isTransitioning: boolean;
  homeSlideFrom: "left" | "right" | "top" | "bottom";
}

const NavContext = createContext<NavContextValue>({
  activeSection: "home",
  leavingSection: null,
  navigateTo: () => {},
  isTransitioning: false,
  homeSlideFrom: "right",
});

export const useNav = () => useContext(NavContext);

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [leavingSection, setLeavingSection] = useState<Section | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [homeSlideFrom, setHomeSlideFrom] = useState<"left" | "right" | "top" | "bottom">("right");

  const navigateTo = useCallback(
    (target: Section) => {
      if (target === activeSection || isTransitioning) return;

      // When returning home, slide in from the opposite of the current section's origin
      if (target === "home") {
        setHomeSlideFrom(OPPOSITE[SLIDE_FROM[activeSection]]);
      }

      setLeavingSection(activeSection);
      setActiveSection(target);
      setIsTransitioning(true);

      setTimeout(() => {
        setLeavingSection(null);
        setIsTransitioning(false);
      }, 500);
    },
    [activeSection, isTransitioning]
  );

  return (
    <NavContext.Provider value={{ activeSection, leavingSection, navigateTo, isTransitioning, homeSlideFrom }}>
      <style>{`
        @keyframes enter-from-left   { from { transform: translateX(-100%); opacity: 0; } to { transform: translate(0,0); opacity: 1; } }
        @keyframes enter-from-right  { from { transform: translateX(100%);  opacity: 0; } to { transform: translate(0,0); opacity: 1; } }
        @keyframes enter-from-top    { from { transform: translateY(-100%); opacity: 0; } to { transform: translate(0,0); opacity: 1; } }
        @keyframes enter-from-bottom { from { transform: translateY(100%);  opacity: 0; } to { transform: translate(0,0); opacity: 1; } }
        @keyframes leave-to-left     { from { transform: translate(0,0); opacity: 1; } to { transform: translateX(-100%); opacity: 0; } }
        @keyframes leave-to-right    { from { transform: translate(0,0); opacity: 1; } to { transform: translateX(100%);  opacity: 0; } }
        @keyframes leave-to-top      { from { transform: translate(0,0); opacity: 1; } to { transform: translateY(-100%); opacity: 0; } }
        @keyframes leave-to-bottom   { from { transform: translate(0,0); opacity: 1; } to { transform: translateY(100%);  opacity: 0; } }
        @keyframes navWave {
          0%   { transform: translate(-50%, -50%) perspective(900px) rotateX(60deg) scale(0);   opacity: 0.7;  }
          60%  { transform: translate(-50%, -50%) perspective(900px) rotateX(25deg) scale(70);  opacity: 0.18; }
          100% { transform: translate(-50%, -50%) perspective(900px) rotateX(6deg)  scale(130); opacity: 0;    }
        }
      `}</style>
      {children}
    </NavContext.Provider>
  );
}

// ─────────────────────────────────────────────
// SectionSlide
// ─────────────────────────────────────────────

export function SectionSlide({
  id,
  children,
  className = "",
}: {
  id: Section;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeSection, leavingSection, homeSlideFrom } = useNav();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`;
      }
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const isActive = activeSection === id;
  const isLeaving = leavingSection === id;

  // For home: use the dynamic homeSlideFrom; for others: use their fixed SLIDE_FROM
  const slideFrom = id === "home" ? homeSlideFrom : SLIDE_FROM[id];

  let animationName: string | undefined;
  let transform: string;
  let opacity: string | number;

  if (isActive) {
    animationName = `enter-from-${slideFrom}`;
    transform = "translate(0,0)";
    opacity = 1;
  } else if (isLeaving) {
    // Exit toward the opposite of where the incoming section enters from
    const incomingSlideFrom =
      activeSection === "home" ? homeSlideFrom : SLIDE_FROM[activeSection];
    const exitDir = OPPOSITE[incomingSlideFrom];
    animationName = `leave-to-${exitDir}`;
    transform = HIDDEN_TRANSLATE[exitDir];
    opacity = 0;
  } else {
    // Idle: sit off-screen at its own entry edge, no animation
    animationName = undefined;
    transform = HIDDEN_TRANSLATE[slideFrom];
    opacity = 0;
  }

  return (
    <div
      id={id}
      aria-hidden={!isActive}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        transform,
        opacity,
        zIndex: isActive ? 10 : isLeaving ? 5 : 0,
        pointerEvents: isActive ? "auto" : "none",
        animation: animationName
          ? `${animationName} 0.5s cubic-bezier(0.76, 0, 0.24, 1) forwards`
          : "none",
        willChange: "transform, opacity",
      }}
      className={className}
    >
      {/* Cursor-following ambient light */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.1) 0%, rgba(251,191,36,0.035) 45%, transparent 70%)",
          filter: "blur(56px)",
          pointerEvents: "none",
          willChange: "transform",
          zIndex: 0,
        }}
      />

      {/* Dot grid for non-home sections */}
      {id !== "home" && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}

      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────

export default function Navbar() {
  const { activeSection, navigateTo } = useNav();
  const [wave, setWave] = useState<{ x: number; y: number; id: number } | null>(null);

  const fireWave = useCallback(
    (x: number, y: number, section: Section) => {
      setWave({ x, y, id: Date.now() });
      navigateTo(section);
      setTimeout(() => setWave(null), 1500);
    },
    [navigateTo]
  );

  return (
    <>
      {/* Wave rings on click */}
      {wave &&
        [0, 1].map((i) => (
          <div
            key={`${wave.id}-${i}`}
            aria-hidden="true"
            style={{
              position: "fixed",
              left: wave.x,
              top: wave.y,
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: `1px solid rgba(251,191,36,${0.18 - i * 0.07})`,
              background: "transparent",
              transform: "translate(-50%, -50%) scale(0)",
              pointerEvents: "none",
              zIndex: 45,
              animation: `navWave 1.3s ${i * 0.2}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            }}
          />
        ))}

      <nav aria-label="Site navigation" className="pointer-events-none">
        {(Object.keys(NAV_EDGE) as Section[]).map((section) => {
          const edge = NAV_EDGE[section]!;
          const isActive = activeSection === section;
          return (
            <EdgePill
              key={section}
              section={section}
              edge={edge}
              isActive={isActive}
              onClick={(x, y) => fireWave(x, y, isActive ? "home" : section)}
            />
          );
        })}
      </nav>
    </>
  );
}

// ─────────────────────────────────────────────
// EdgePill
// ─────────────────────────────────────────────

function EdgePill({
  section,
  edge,
  isActive,
  onClick,
}: {
  section: Section;
  edge: "left" | "right" | "top" | "bottom";
  isActive: boolean;
  onClick: (x: number, y: number) => void;
}) {
  const label = section.charAt(0).toUpperCase() + section.slice(1);
  const isVertical = edge === "left" || edge === "right";

  return (
    <button
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        onClick(r.left + r.width / 2, r.top + r.height / 2);
      }}
      aria-label={`Go to ${label}`}
      aria-current={isActive ? "page" : undefined}
      style={{
        borderRadius: BORDER_RADIUS[edge],
        padding: PADDING[edge],
        transform: BASE_TRANSFORM[edge],
      }}
      className={[
        POSITION_CLASS[edge],
        "pointer-events-auto group",
        "flex items-center",
        "border backdrop-blur-md",
        "transition-all duration-200 ease-out cursor-pointer select-none",
        "overflow-hidden",
        isActive
          ? "bg-amber-400 border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.35)]"
          : "bg-neutral-950/90 border-white/10 hover:border-white/20 hover:brightness-125",
      ].join(" ")}
    >
      {!isActive && (
        <span
          className={[
            "absolute transition-all duration-200",
            "bg-amber-400/60 group-hover:bg-amber-400",
            edge === "left"   ? "right-0 top-[20%] h-[60%] w-[2px] group-hover:h-[100%] group-hover:top-[0%]" : "",
            edge === "right"  ? "left-0 top-[20%] h-[60%] w-[2px] group-hover:h-[100%] group-hover:top-[0%]"  : "",
            edge === "top"    ? "bottom-0 left-[20%] w-[60%] h-[2px] group-hover:w-[100%] group-hover:left-[0%]" : "",
            edge === "bottom" ? "top-0 left-[20%] w-[60%] h-[2px] group-hover:w-[100%] group-hover:left-[0%]"   : "",
          ].join(" ")}
        />
      )}

      {isVertical
        ? <VerticalLabel edge={edge} label={label} isActive={isActive} />
        : <HorizontalLabel edge={edge} label={label} isActive={isActive} />
      }
    </button>
  );
}

// ─────────────────────────────────────────────
// Labels
// ─────────────────────────────────────────────

function HorizontalLabel({
  edge,
  label,
  isActive,
}: {
  edge: string;
  label: string;
  isActive: boolean;
}) {
  const arrowCls = `text-base leading-none ${isActive ? "text-amber-900" : "text-amber-400"}`;
  const textCls  = `text-[11px] font-semibold tracking-[0.14em] uppercase ${isActive ? "text-amber-950" : "text-neutral-300"}`;
  return (
    <span className="flex items-center gap-2">
      {edge === "top" && (
        <span
          className={arrowCls}
          style={{
            display: "inline-block",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ↑
        </span>
      )}
      <span className={textCls}>{label}</span>
      {edge === "bottom" && (
        <span
          className={arrowCls}
          style={{
            display: "inline-block",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ↓
        </span>
      )}
    </span>
  );
}

function VerticalLabel({
  edge,
  label,
  isActive,
}: {
  edge: string;
  label: string;
  isActive: boolean;
}) {
  const arrowCls = `text-base leading-none ${isActive ? "text-amber-900" : "text-amber-400"}`;
  const textCls  = `text-[11px] font-semibold tracking-[0.14em] uppercase ${isActive ? "text-amber-950" : "text-neutral-300"}`;
  return (
    <span className="flex flex-col items-center gap-1.5">
      {edge === "right" && (
        <span
          className={arrowCls}
          style={{
            writingMode: "horizontal-tb",
            display: "inline-block",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          →
        </span>
      )}
      <span
        className={textCls}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: edge === "left" ? "rotate(180deg)" : "none",
        }}
      >
        {label}
      </span>
      {edge === "left" && (
        <span
          className={arrowCls}
          style={{
            writingMode: "horizontal-tb",
            display: "inline-block",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ←
        </span>
      )}
    </span>
  );
}