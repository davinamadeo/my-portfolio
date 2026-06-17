"use client";

import { useEffect, useRef, useState } from "react";

type Skill = {
  name: string;
  level: number; // 0–100
};

type Category = {
  label: string;
  icon: React.ReactNode;
  skills: Skill[];
};

const categories: Category[] = [
  {
    label: "Languages",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 4l4 4-4 4M8 12h4" stroke="currentColor" strokeWidth="1.2"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    skills: [
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 80 },
      { name: "Java", level: 70 },
      { name: "C++", level: 60 },
    ],
  },
  {
    label: "Frontend",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1 5h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="3.5" cy="3.5" r="0.5" fill="currentColor" />
        <circle cx="5.5" cy="3.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    skills: [
      { name: "React", level: 88 },
      { name: "Next.js", level: 82 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML / CSS", level: 92 },
      { name: "Figma", level: 70 },
    ],
  },
  {
    label: "Backend",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <ellipse cx="7" cy="3.5" rx="5" ry="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 3.5v3c0 .828 2.239 1.5 5 1.5s5-.672 5-1.5v-3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 6.5v3c0 .828 2.239 1.5 5 1.5s5-.672 5-1.5v-3" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    skills: [
      { name: "Node.js", level: 78 },
      { name: "Express", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "MongoDB", level: 68 },
      { name: "REST APIs", level: 85 },
    ],
  },
  {
    label: "Tools & DevOps",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.93 2.93l1.414 1.414M9.656 9.656l1.414 1.414M2.93 11.07l1.414-1.414M9.656 4.344l1.414-1.414"
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "Docker", level: 65 },
      { name: "Vercel", level: 85 },
      { name: "Linux", level: 72 },
      { name: "CI/CD", level: 60 },
    ],
  },
];

function SkillBar({
  skill,
  animate,
  delay,
}: {
  skill: Skill;
  animate: boolean;
  delay: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-neutral-300">{skill.name}</span>
        <span
          className={`text-xs font-light text-neutral-600 transition-opacity duration-500 ${
            animate ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: `${delay + 400}ms` }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="h-px w-full bg-neutral-800 overflow-hidden">
        <div
          className="h-full bg-[#18130E] transition-all duration-700 ease-out"
          style={{
            width: animate ? `${skill.level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

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

  return (
    <section
      id="skills"
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
          Skills
        </span>
      </div>

      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div
          className={`mb-14 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="font-serif text-5xl leading-tight tracking-tight text-neutral-100 md:text-6xl">
            What I work
            <br />
            <span className="italic text-neutral-500">with.</span>
          </h2>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Category tabs */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-light transition-all duration-200 ${
                  activeCategory === i
                    ? "border-[#18130E] bg-[#18130E] text-[#F0EBE1]"
                    : "border-neutral-800 bg-neutral-900/40 text-neutral-500 hover:border-[#18130E] hover:text-neutral-100"
                }`}
              >
                <span
                  className={
                    activeCategory === i ? "text-[#F0EBE1]" : "text-neutral-600"
                  }
                >
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills panel */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12">

            {/* Skill bars */}
            <div className="flex flex-col gap-5 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
              <p className="text-[10px] uppercase tracking-widest text-neutral-600">
                Proficiency
              </p>
              {categories[activeCategory].skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  animate={visible}
                  delay={i * 80 + 300}
                />
              ))}
            </div>

            {/* Right panel — all categories overview */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] uppercase tracking-widest text-neutral-600">
                All technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.flatMap((cat) =>
                  cat.skills.map((skill) => (
                    <span
                      key={`${cat.label}-${skill.name}`}
                      className={`rounded-full border px-3 py-1 text-xs font-light transition-all duration-200 ${
                        categories[activeCategory].skills.some(
                          (s) => s.name === skill.name
                        )
                          ? "border-[#18130E] bg-[#18130E] text-[#F0EBE1]"
                          : "border-neutral-800 bg-neutral-900/40 text-neutral-500"
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))
                )}
              </div>

              {/* Currently learning */}
              <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5">
                <p className="mb-3 text-[10px] uppercase tracking-widest text-neutral-600">
                  Currently learning
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Rust", "AWS", "GraphQL", "Three.js"].map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-1.5 rounded-full border border-neutral-800 px-3 py-1 text-xs font-light text-neutral-500"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#18130E]/40" aria-hidden="true" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Philosophy quote */}
              <div className="mt-2 rounded-2xl border border-neutral-800/60 bg-neutral-900/20 p-5">
                <p className="font-serif text-lg italic leading-relaxed text-neutral-400">
                  &ldquo;Tools are just tools. What matters is the thinking behind them.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}