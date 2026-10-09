import { cn } from "@/lib/utils"

// Full-width band of white handmade paper with torn top and bottom edges.
// The edges are jagged SVG masks (seeded, so server and client match) with a white
// fibrous rim peeking out along the tear; the paper grain is SVG noise.

function tornEdge(seed: number, side: "top" | "bottom") {
  let s = seed
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647
  const W = 1200
  const pts: string[] = []
  for (let x = 0; x <= W; x += 6) {
    const wave = Math.sin(x / 47 + seed) * 4 + Math.sin(x / 13 + seed * 2) * 1.6
    const tear = rand() < 0.08 ? -6 * rand() : 0 // the odd fibre sticking out
    const y = x === 0 || x === W ? 16 : 16 + wave + (rand() - 0.5) * 5 + tear
    pts.push(`${x},${y.toFixed(1)}`)
  }
  const base = side === "top" ? 32 : 0
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} 32' preserveAspectRatio='none'><polygon fill='black' points='0,${base} ${pts.join(" ")} ${W},${base}'/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

function mask(top: string, bottom: string, edge: string): React.CSSProperties {
  const image = `${top}, linear-gradient(#000, #000), ${bottom}`
  const size = `100% ${edge}, 100% calc(100% - 2 * ${edge} + 2px), 100% ${edge}`
  return {
    maskImage: image,
    maskSize: size,
    maskPosition: "top, center, bottom",
    maskRepeat: "no-repeat",
    WebkitMaskImage: image,
    WebkitMaskSize: size,
    WebkitMaskPosition: "top, center, bottom",
    WebkitMaskRepeat: "no-repeat",
  }
}

const paperTop = tornEdge(7, "top")
const paperBottom = tornEdge(23, "bottom")
const rimTop = tornEdge(41, "top")
const rimBottom = tornEdge(58, "bottom")

const svgUrl = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
const grain = svgUrl(
  "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.33 0 0 0 0 0.3 0 0 0 0.1 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"
)
const fibres = svgUrl(
  "<svg xmlns='http://www.w3.org/2000/svg' width='420' height='420'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.035 0.11' numOctaves='3' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 -0.3'/></filter><rect width='100%' height='100%' filter='url(#f)'/></svg>"
)

export function TornPaper({ className, children }: { className?: string; children: React.ReactNode }) {
  const edge = "clamp(18px, 2.4vw, 32px)"
  return (
    <div className={cn("relative", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 drop-shadow-[0_2px_3px_rgba(60,50,35,0.14)]">
        <div className="absolute inset-x-0 -inset-y-[4px] bg-[#f3efe8]" style={mask(rimTop, rimBottom, edge)} />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#ffffff",
            backgroundImage: `${fibres}, ${grain}, radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.45), transparent 70%)`,
            ...mask(paperTop, paperBottom, edge),
          }}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
