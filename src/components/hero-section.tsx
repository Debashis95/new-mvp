import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Rocket, ArrowRight } from "lucide-react"

function JourneyDiagram() {
  return (
    <div className="relative flex h-72 w-full items-center justify-center sm:h-80 lg:h-96">
      <svg
        viewBox="0 0 420 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-w-md"
        aria-hidden="true"
      >
        {/* Dashed path to scale */}
        <path
          d="M 188 168 C 210 140, 250 105, 310 72"
          stroke="var(--border)"
          strokeWidth="2"
          strokeDasharray="5 4"
          fill="none"
        />
        {/* Solid progress path */}
        <path
          d="M 60 295 C 80 255, 100 235, 140 210 C 162 197, 178 182, 188 168"
          stroke="var(--primary)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Scale label */}
        <circle cx="318" cy="68" r="4" fill="var(--border)" />
        <text x="328" y="72" fontSize="11" fill="oklch(0.52 0.03 240)" fontWeight="500">Scale</text>

        {/* Launch */}
        <circle cx="250" cy="112" r="14" fill="var(--primary)" fillOpacity="0.12" />
        <circle cx="250" cy="112" r="8" fill="var(--primary)" />
        <text x="266" y="116" fontSize="11" fill="oklch(0.13 0.02 260)" fontWeight="600">Launch</text>

        {/* Development */}
        <circle cx="188" cy="168" r="14" fill="var(--primary)" fillOpacity="0.12" />
        <circle cx="188" cy="168" r="8" fill="var(--primary)" />
        <text x="205" y="172" fontSize="11" fill="oklch(0.13 0.02 260)" fontWeight="600">Development</text>

        {/* Planning */}
        <circle cx="140" cy="210" r="10" fill="var(--primary)" fillOpacity="0.08" />
        <circle cx="140" cy="210" r="6" fill="var(--primary)" fillOpacity="0.55" />
        <text x="154" y="214" fontSize="11" fill="oklch(0.13 0.02 260)" fontWeight="600">Planning</text>

        {/* Idea */}
        <circle cx="60" cy="295" r="10" fill="var(--primary)" fillOpacity="0.08" />
        <circle cx="60" cy="295" r="6" fill="var(--primary)" fillOpacity="0.4" />
        <text x="74" y="299" fontSize="11" fill="oklch(0.13 0.02 260)" fontWeight="600">Idea</text>
      </svg>
    </div>
  )
}

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Success Rate" },
  { value: "24/7", label: "Support" },
  { value: "4.9/5", label: "Client Rating" },
]

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-7">
          <Badge
            variant="outline"
            className="w-fit gap-1.5 rounded-full border-primary/25 bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground"
          >
            <Rocket className="h-3 w-3 text-primary" />
            Startup MVP Development Specialists
          </Badge>

          <h1 className="scroll-m-20 text-balance text-5xl font-extrabold tracking-tight text-foreground lg:text-[3.25rem] lg:leading-[1.1]">
            Turn Your Startup Idea Into a Working MVP in Weeks
          </h1>

          <p className="text-base leading-7 text-muted-foreground">
            We help ambitious founders go from concept to a market-ready product in weeks — not months. Our full-stack team handles design, engineering, and delivery so you can focus on your vision.
          </p>

          <div className="flex items-center gap-3">
            <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
              Book Free Discovery Call
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="lg" className="text-muted-foreground">
              See our work
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-accent via-card to-card p-6 shadow-2xl shadow-primary/8 lg:max-w-md">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-accent)_0%,transparent_70%)]" />
            <div className="relative">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">Your Journey</p>
              <h3 className="mb-4 text-lg font-bold text-foreground">From Idea to Scale</h3>
              <JourneyDiagram />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border/60 bg-card px-4 py-6 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="text-3xl font-extrabold tracking-tight text-primary">{value}</span>
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
