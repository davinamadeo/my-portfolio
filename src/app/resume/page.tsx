"use client";

import "../globals.css";
import dynamic from "next/dynamic";

const ResumePDFViewer = dynamic(() => import("./ResumePDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-neutral-950">
      <div className="h-0.5 w-48 overflow-hidden rounded-full bg-neutral-800">
        <div
          className="h-full bg-gradient-to-r from-neutral-800 via-amber-400/40 to-neutral-800"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s ease-in-out infinite",
          }}
        />
      </div>
      <p className="text-xs font-light uppercase tracking-widest text-neutral-600">
        Loading resume…
      </p>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  ),
});

export default function ResumePage() {
  return <ResumePDFViewer />;
}