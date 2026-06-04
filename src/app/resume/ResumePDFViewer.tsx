import { useState, useCallback } from "react";
import Link from "next/link";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Point to the worker bundled with pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function ResumePage() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1.0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setLoaded(true);
    },
    []
  );

  const onDocumentLoadError = useCallback(() => {
    setError(true);
  }, []);

  const zoomIn = () => setZoom((z) => Math.min(+(z + 0.1).toFixed(1), 2.0));
  const zoomOut = () => setZoom((z) => Math.max(+(z - 0.1).toFixed(1), 0.5));
  const zoomReset = () => setZoom(1.0);

  const prevPage = () => setPageNumber((p) => Math.max(p - 1, 1));
  const nextPage = () => setPageNumber((p) => Math.min(p + 1, numPages));

  return (
    <div className="flex h-screen flex-col bg-neutral-950">

      {/* ── Toolbar ── */}
      <header className="relative z-20 flex items-center justify-between border-b border-neutral-800/70 bg-neutral-950/90 px-4 py-3 backdrop-blur-md sm:px-6">

        {/* Left — back */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-light text-neutral-500 transition-colors duration-200 hover:text-neutral-100"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-0.5">
            <path d="M13 7H1M1 7L6 2M1 7L6 12" stroke="currentColor" strokeWidth="1.3"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">Back to portfolio</span>
          <span className="sm:hidden">Back</span>
        </Link>

        {/* Center — title + page nav */}
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
          <span className="font-serif text-sm text-neutral-300">
            Resume<span className="text-amber-400">.</span>
          </span>
          {loaded && numPages > 1 && (
            <div className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-1">
              <button onClick={prevPage} disabled={pageNumber <= 1}
                className="text-neutral-500 transition-colors hover:text-neutral-100 disabled:opacity-30"
                aria-label="Previous page">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M6 2L3 5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="min-w-[48px] text-center text-xs font-light text-neutral-500">
                {pageNumber} / {numPages}
              </span>
              <button onClick={nextPage} disabled={pageNumber >= numPages}
                className="text-neutral-500 transition-colors hover:text-neutral-100 disabled:opacity-30"
                aria-label="Next page">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M4 2l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Right — zoom + download */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900 p-1 sm:flex">
            <button onClick={zoomOut} disabled={zoom <= 0.5} aria-label="Zoom out"
              className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button onClick={zoomReset} aria-label="Reset zoom"
              className="min-w-[44px] rounded-md px-1.5 py-1 text-center text-xs font-light text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100">
              {Math.round(zoom * 100)}%
            </button>
            <button onClick={zoomIn} disabled={zoom >= 2.0} aria-label="Zoom in"
              className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <a href="/resume.pdf" download aria-label="Download resume"
            className="flex items-center gap-2 rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-medium text-neutral-950 transition-colors hover:bg-amber-300">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v7M3 5.5L6 8.5l3-3M1 11h10" stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </header>

      {/* ── Viewer ── */}
      <main className="flex flex-1 flex-col items-center overflow-auto bg-neutral-900/30 py-8 px-4">

        {/* Loading state */}
        {!loaded && !error && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="h-0.5 w-48 overflow-hidden rounded-full bg-neutral-800">
              <div className="h-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-neutral-800 via-amber-400/40 to-neutral-800 bg-[length:200%_100%]" />
            </div>
            <p className="text-xs font-light tracking-widest text-neutral-600 uppercase">
              Loading resume…
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 6v5M10 14h.01M3 10a7 7 0 1014 0A7 7 0 003 10z"
                  stroke="#737373" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-light text-neutral-500">Could not load PDF.</p>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className="text-sm text-amber-400 underline underline-offset-4 hover:text-amber-300">
              Open directly ↗
            </a>
          </div>
        )}

        {/* PDF Document */}
        <Document
          file="/resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
          className="flex flex-col items-center gap-6"
        >
          {/* Render all pages if only a few, otherwise single page */}
          {numPages > 0 && numPages <= 3
            ? Array.from({ length: numPages }, (_, i) => (
                <div key={i} className="relative">
                  <div className="absolute -inset-1 rounded-sm bg-black/50 blur-xl" aria-hidden="true" />
                  <Page
                    pageNumber={i + 1}
                    scale={zoom}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="relative rounded-sm shadow-2xl"
                  />
                </div>
              ))
            : numPages > 3 && (
                <div className="relative">
                  <div className="absolute -inset-1 rounded-sm bg-black/50 blur-xl" aria-hidden="true" />
                  <Page
                    pageNumber={pageNumber}
                    scale={zoom}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="relative rounded-sm shadow-2xl"
                  />
                </div>
              )
          }
        </Document>

        {loaded && (
          <p className="mt-6 text-center text-xs font-light text-neutral-700">
            Having trouble?{" "}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className="text-neutral-500 underline underline-offset-2 transition-colors hover:text-amber-400">
              Open directly
            </a>
          </p>
        )}
      </main>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .react-pdf__Page__canvas {
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}