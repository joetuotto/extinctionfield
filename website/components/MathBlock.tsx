"use client";

import katex from "katex";
import "katex/dist/katex.min.css";

interface MathBlockProps {
  tex: string;
  display?: boolean;
}

export function MathBlock({ tex, display = true }: MathBlockProps) {
  const html = katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
  });

  if (!display) {
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <span
      className="chart-scroll block max-w-full overflow-y-hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
