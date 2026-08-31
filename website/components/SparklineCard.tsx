interface SparklineProps {
  data: number[];
  index: number;
}

export function Sparkline({ data, index }: SparklineProps) {
  const w = 120;
  const h = 36;
  const pad = 2;
  if (!data) return null;
  const n = data.length;
  if (n < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = pad + (i / (n - 1)) * (w - 2 * pad);
    const y = pad + (1 - (v - min) / range) * (h - 2 * pad);
    return [x, y] as const;
  });

  const lineD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const areaD = `${lineD} L${points[n - 1][0].toFixed(1)},${h} L${points[0][0].toFixed(1)},${h} Z`;
  const gradId = `spark-g${index}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-9 mt-2" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradId})`} />
      <path d={lineD} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[n - 1][0]} cy={points[n - 1][1]} r="2" fill="var(--accent)" />
    </svg>
  );
}
