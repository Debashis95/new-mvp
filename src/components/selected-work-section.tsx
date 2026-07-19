import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const projects = [
  {
    name: "HealthSync",
    category: "Healthcare SaaS Platform",
    status: "Live",
    statusClass: "bg-emerald-100 text-emerald-700",
    tags: ["React", "Node.js", "PostgreSQL"],
    gradient: "from-blue-500 to-indigo-600",
    icon: "🏥",
  },
  {
    name: "LearnFlow",
    category: "E-Learning Marketplace",
    status: "Live",
    statusClass: "bg-emerald-100 text-emerald-700",
    tags: ["Next.js", "Python", "Redis"],
    gradient: "from-emerald-500 to-teal-600",
    icon: "📚",
  },
  {
    name: "CloudOps Hub",
    category: "DevOps Dashboard",
    status: "Beta",
    statusClass: "bg-amber-100 text-amber-700",
    tags: ["React", "Go", "Kubernetes"],
    gradient: "from-violet-500 to-purple-600",
    icon: "☁️",
  },
  {
    name: "NeuralSearch",
    category: "AI-Powered Search Engine",
    status: "Live",
    statusClass: "bg-emerald-100 text-emerald-700",
    tags: ["OpenAI", "FastAPI", "Pinecone"],
    gradient: "from-orange-500 to-rose-600",
    icon: "🤖",
  },
  {
    name: "MarketFlow",
    category: "E-Commerce Platform",
    status: "In Dev",
    statusClass: "bg-blue-100 text-blue-700",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
    gradient: "from-cyan-500 to-blue-600",
    icon: "🛒",
  },
  {
    name: "FinTrack Pro",
    category: "Fintech Dashboard",
    status: "Live",
    statusClass: "bg-emerald-100 text-emerald-700",
    tags: ["React", "Go", "TimescaleDB"],
    gradient: "from-amber-500 to-yellow-600",
    icon: "📊",
  },
]

export function SelectedWorkSection() {
  return (
    <section id="selected-work" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Selected Work
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Products we've designed, built, and shipped for founders worldwide
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ name, category, status, statusClass, tags, gradient, icon }) => (
            <Card
              key={name}
              className="group cursor-default overflow-hidden border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/8"
            >
              <div
                className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${gradient}`}
              >
                <span className="text-5xl drop-shadow-sm">{icon}</span>
                <div className="absolute right-3 top-3">
                  <Badge
                    className={`border-0 text-xs font-semibold ${statusClass} bg-white/90 backdrop-blur`}
                  >
                    {status}
                  </Badge>
                </div>
              </div>
              <CardContent className="flex flex-col gap-3 p-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{name}</h3>
                  <p className="text-xs text-muted-foreground">{category}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-full border border-border/40 px-2.5 py-0.5 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
