"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Strictly monochrome Mermaid theme: white ink on black paper. */
const MONO_THEME = {
  theme: "base" as const,
  themeVariables: {
    background: "#000000",
    primaryColor: "#000000",
    primaryTextColor: "#ffffff",
    primaryBorderColor: "#ffffff",
    secondaryColor: "#000000",
    secondaryTextColor: "#ffffff",
    secondaryBorderColor: "#ffffff",
    tertiaryColor: "#111111",
    tertiaryTextColor: "#ffffff",
    tertiaryBorderColor: "#ffffff",
    lineColor: "#ffffff",
    textColor: "#ffffff",
    mainBkg: "#000000",
    nodeBorder: "#ffffff",
    nodeTextColor: "#ffffff",
    clusterBkg: "#000000",
    clusterBorder: "#ffffff",
    edgeLabelBackground: "#000000",
    actorBkg: "#000000",
    actorBorder: "#ffffff",
    actorTextColor: "#ffffff",
    actorLineColor: "#ffffff",
    signalColor: "#ffffff",
    signalTextColor: "#ffffff",
    labelBoxBkgColor: "#000000",
    labelBoxBorderColor: "#ffffff",
    labelTextColor: "#ffffff",
    loopTextColor: "#ffffff",
    noteBkgColor: "#000000",
    noteBorderColor: "#ffffff",
    noteTextColor: "#ffffff",
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "13px",
  },
};

export function MermaidDiagram({ code }: { code: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, ...MONO_THEME });
        const { svg } = await mermaid.render(`mermaid-${id}`, code);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [code, id]);

  if (error) {
    return (
      <pre className="mermaid-frame font-mono text-[11px] text-white/60">
        {code}
      </pre>
    );
  }

  return <div ref={ref} className="mermaid-frame" />;
}
