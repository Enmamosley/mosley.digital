import React, { useState, useEffect, useRef } from "react";

type ViewMode = "desktop" | "tablet" | "mobile";

interface Props {
  url: string;
  projectName: string;
}

const IFRAME_W = 1800;
const IFRAME_H = 1200;

const WorkShowcase: React.FC<Props> = ({ url, projectName }) => {
  const [loaded, setLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    if (window.innerWidth < 768) setViewMode("mobile");
    const onResize = () => { if (window.innerWidth < 768) setViewMode("mobile"); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.offsetWidth);
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Desktop: scale to fill the exact container width, no gray strip
  const desktopScale = containerWidth / IFRAME_W;
  const desktopHeight = Math.round(IFRAME_H * desktopScale);

  const containerHeight = viewMode === "desktop" ? desktopHeight : 580;

  const iframeStyle: React.CSSProperties =
    viewMode === "desktop"
      ? {
          width: IFRAME_W,
          height: IFRAME_H,
          transformOrigin: "top left",
          transform: `scale(${desktopScale})`,
          border: "none",
          flexShrink: 0,
        }
      : viewMode === "tablet"
      ? {
          width: 820,
          height: 1180,
          transformOrigin: "center center",
          transform: "scale(0.45)",
          borderRadius: 25,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25), 0 0 0 8px #1a1a1a, 0 0 0 12px #333",
          border: "none",
          flexShrink: 0,
        }
      : {
          width: 414,
          height: 896,
          transformOrigin: "center center",
          transform: "scale(0.5)",
          borderRadius: 35,
          boxShadow: "0 15px 50px rgba(0,0,0,0.3), 0 0 0 4px #1a1a1a, 0 0 0 6px #333",
          border: "none",
          flexShrink: 0,
        };

  return (
    <div className="rounded-3xl overflow-hidden border border-dark/10">
      {/* Browser chrome */}
      <div className="bg-light border-b border-dark/10 px-4 py-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>

        <div className="flex-1 mx-4 bg-white/70 rounded-full px-4 py-1 text-xs text-text-dark/50 font-secondary truncate text-center border border-dark/10">
          {url}
        </div>

        <div className="flex items-center gap-1 bg-white rounded-lg p-0.5 border border-dark/10">
          {(["desktop", "tablet", "mobile"] as ViewMode[]).map((mode) => {
            const icons: Record<ViewMode, React.ReactNode> = {
              desktop: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              ),
              tablet: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <circle cx="12" cy="18" r="1" />
                </svg>
              ),
              mobile: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="7" y="2" width="10" height="20" rx="2" />
                  <circle cx="12" cy="18" r="1" />
                </svg>
              ),
            };
            return (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                title={mode}
                className={`p-1.5 rounded transition-all duration-200 ${
                  viewMode === mode
                    ? "bg-primary text-white"
                    : "text-text-dark/50 hover:text-text-dark"
                }`}
              >
                {icons[mode]}
              </button>
            );
          })}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 text-text-dark/40 hover:text-primary transition-colors"
          title="Abrir en nueva pestaña"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      {/* iframe container */}
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden bg-gray-100 ${
          viewMode !== "desktop" ? "flex items-center justify-center py-6" : ""
        }`}
        style={{ height: `${containerHeight}px` }}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-text-dark/40">
            Cargando vista previa…
          </div>
        )}
        <iframe
          src={url}
          title={`Vista previa de ${projectName}`}
          style={iframeStyle}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
};

export default WorkShowcase;
