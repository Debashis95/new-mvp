import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const team = [
  {
    name: "Alex Chen",
    title: "Co-Founder & CTO",
    specialty: "Full Stack",
    initials: "AC",
    photo: "/team-alex.webp",
    badgeClass: "bg-blue-100 text-blue-700",
  },
  {
    name: "Jamie Park",
    title: "Lead Frontend Engineer",
    specialty: "React / TypeScript",
    initials: "JP",
    photo: "/team-jamie.webp",
    badgeClass: "bg-violet-100 text-violet-700",
  },
  {
    name: "Marcus Johnson",
    title: "Backend Lead",
    specialty: "Node.js / Go",
    initials: "MJ",
    photo: "/team-marcus.webp",
    badgeClass: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Sofia Reyes",
    title: "Product Manager",
    specialty: "Strategy",
    initials: "SR",
    photo: "/team-sofia.webp",
    badgeClass: "bg-pink-100 text-pink-700",
  },
  {
    name: "Omar Hassan",
    title: "DevOps Engineer",
    specialty: "AWS / Kubernetes",
    initials: "OH",
    photo: "/team-omar.webp",
    badgeClass: "bg-orange-100 text-orange-700",
  },
  {
    name: "Elena Kovacs",
    title: "UI/UX Designer",
    specialty: "Design Systems",
    initials: "EK",
    photo: "/team-elena.webp",
    badgeClass: "bg-cyan-100 text-cyan-700",
  },
  {
    name: "Ryan Tanaka",
    title: "AI Engineer",
    specialty: "LLMs / ML",
    initials: "RT",
    photo: "/team-ryan.webp",
    badgeClass: "bg-amber-100 text-amber-700",
  },
]

export function TeamSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet Your Development Team
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Senior engineers and designers who have shipped products at scale
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {team.map(({ name, title, specialty, initials, photo, badgeClass }) => (
            <Card
              key={name}
              className="group cursor-default border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/8"
            >
              <CardContent className="flex flex-col items-center gap-3 p-5 text-center">
                <Avatar className="h-20 w-20 ring-2 ring-border ring-offset-2">
                  <AvatarImage src={photo} alt={name} className="object-cover object-top" />
                  <AvatarFallback className="text-base font-semibold">{initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-foreground">{name}</span>
                  <span className="text-xs text-muted-foreground">{title}</span>
                  <Badge
                    variant="secondary"
                    className={`mx-auto w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
                  >
                    {specialty}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
