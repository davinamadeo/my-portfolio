"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  index: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  year: string;
  github?: string;
  live?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    index: "01",
    title: "Project Alpha",
    tagline: "A full-stack web app that does something impressive.",
    description:
      "Longer description of what the project does, the problem it solves, and what makes it interesting. Mention your role, any technical challenges you overcame, and the impact it had. Keep it to 2-3 sentences.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    year: "2024",
    github: "https://github.com/davinamadeo/project-alpha",
    live: "https://project-alpha.vercel.app",
    featured: true,
  },
  {
    index: "02",
    title: "Project Beta",
    tagline: "An open-source tool built for developers.",
    description:
      "Describe what this tool does and why you built it. What problem were you solving? What did you learn in the process? Mention any traction it got — stars, users, contributions.",
    tags: ["Python", "FastAPI", "Docker", "Redis"],
    year: "2024",
    github: "https://github.com/davinamadeo/project-beta",
    featured: true,
  },
  {
    index: "03",
    title: "Project Gamma",
    tagline: "A machine learning model wrapped in a clean UI.",
    description:
      "What data did you use? What model did you train? What does the UI let users do? Mention accuracy, dataset size, or any interesting findings from the project.",
    tags: ["Python", "React", "TensorFlow", "Flask"],
    year: "2023",
    github: "https://github.com/davinamadeo/project-gamma",
    live: "https://project-gamma.vercel.app",
  },
  {
    index: "04",
    title: "Project Delta",
    tagline: "A mobile-first productivity app.",
    description:
      "What does this app help users do? How many users does it have? What was the biggest technical challenge? Mention any interesting design decisions you made.",
    tags: ["React Native", "Expo", "Supabase"],
    year: "2023",
    live: "https://project-delta.vercel.app",
  },
  {
    index: "05",
    title: "Project Epsilon",
    tagline: "A browser extension with 1k+ users.",
    description:
      "What does the extension do and why did people find it useful? How did you market it or get your first users? Mention the Chrome Web Store rating or any press coverage.",
    tags: ["JavaScript", "Chrome API", "CSS"],
    year: "2022",
    github: "https://github.com/davinamadeo/project-epsilon",
  },
];

function ProjectRow({
  project,
  visible,
  entryDelay,
}: {
  project: Project;
  visible: boolean;
  entryDelay: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [detailsHeight, setDetailsHeight] = useState(0);

  useEffect(() => {
    if (detailsRef.current) {
      setDetailsHeight(detailsRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      className={`group border-t border-neutral-800/70 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${entryDelay}ms` }}
    >
      {/* Row header — always visible */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-start gap-6 py-7 text-left md:items-center md:gap-10"
        aria-expanded={expanded}
      >
        {/* Index number */}
        <span
          className={`shrink-0 font-serif text-sm transition-colors duration-300 ${
            expanded ? "text-[#18130E]" : "text-neutral-600 group-hover:text-neutral-500"
          }`}
        >
          {project.index}
        </span>

        {/* Title + tagline */}
        <div className="flex flex-1 flex-col gap-1 md:flex-row md:items-center md:gap-8">
          <div className="flex items-center gap-3">
            <h3
              className={`font-serif text-2xl tracking-tight transition-colors duration-200 md:text-3xl ${
                expanded ? "text-neutral-100" : "text-neutral-100 group-hover:text-neutral-200"
              }`}
            >
              {project.title}
            </h3>
            {project.featured && (
              <span className="rounded-full border border-neutral-800 bg-neutral-900/40 px-2 py-0.5 text-[10px] font-light uppercase tracking-widest text-neutral-500">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm font-light text-neutral-500 md:border-l md:border-neutral-800 md:pl-8">
            {project.tagline}
          </p>
        </div>

        {/* Year + chevron */}
        <div className="ml-auto flex shrink-0 items-center gap-4">
          <span className="hidden text-xs font-light text-neutral-700 md:block">
            {project.year}
          </span>
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
              expanded
                ? "border-[#18130E] bg-[#18130E] text-[#F0EBE1] rotate-45"
                : "border-neutral-800 text-neutral-600 group-hover:border-[#18130E] group-hover:text-neutral-100"
            }`}
            aria-hidden="true"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1v8M1 5h8"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </button>

      {/* Expandable details */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: expanded ? `${detailsHeight}px` : "0px" }}
        aria-hidden={!expanded}
      >
        <div ref={detailsRef} className="pb-8 pl-0 md:pl-[calc(theme(spacing.6)+theme(spacing.10))]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto]">

            {/* Description */}
            <div className="flex flex-col gap-5">
              <p className="max-w-xl text-sm font-light leading-relaxed text-neutral-400">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs font-light text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 text-sm font-light text-neutral-500 transition-colors duration-200 hover:text-neutral-100"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    View source
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 rounded-full bg-[#18130E] px-4 py-1.5 text-sm font-medium text-[#F0EBE1] transition-colors duration-200 hover:bg-[#3C3630]"
                  >
                    Live demo
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    >
                      <path
                        d="M1 10L10 1M10 1H4M10 1V7"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Year — mobile only */}
            <div className="flex items-start md:hidden">
              <span className="text-xs font-light text-neutral-700">{project.year}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
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
          Projects
        </span>
      </div>

      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div
          className={`mb-4 flex flex-col gap-4 transition-all duration-700 delay-100 md:flex-row md:items-end md:justify-between ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="font-serif text-5xl leading-tight tracking-tight text-neutral-100 md:text-6xl">
            Things I&apos;ve
            <br />
            <span className="italic text-neutral-500">shipped.</span>
          </h2>
          <p className="max-w-xs text-sm font-light leading-relaxed text-neutral-600 md:text-right">
            Click any project to expand it. Each one taught me something new.
          </p>
        </div>

        {/* Project rows */}
        <div className="mt-10">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.index}
              project={project}
              visible={visible}
              entryDelay={i * 80 + 200}
            />
          ))}

          {/* Final border */}
          <div
            className={`border-t border-neutral-800/70 transition-all duration-700 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: `${projects.length * 80 + 200}ms` }}
          />
        </div>

        {/* GitHub CTA */}
        <div
          className={`mt-12 flex items-center gap-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: `${projects.length * 80 + 350}ms` }}
        >
          <a
            href="https://github.com/davinamadeo"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-light text-neutral-600 transition-colors duration-200 hover:text-neutral-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            See everything on GitHub
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}