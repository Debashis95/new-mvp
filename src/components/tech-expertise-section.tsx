import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const techCategories = [
  {
    title: "Frontend",
    techs: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    techs: ["Node.js", "Python", "Go", "FastAPI", "GraphQL"],
  },
  {
    title: "Databases",
    techs: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
  },
  {
    title: "AI Engineering",
    techs: ["OpenAI API", "LangChain", "Hugging Face", "Vector DBs"],
  },
  {
    title: "Cloud / DevOps",
    techs: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    title: "Mobile",
    techs: ["React Native", "Expo", "iOS", "Android"],
  },
]

export function TechExpertiseSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Technology Expertise
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Modern, battle-tested tech stacks for every layer of your product
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techCategories.map(({ title, techs }) => (
            <Card key={title} className="border-border/50 bg-card shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold tracking-tight text-foreground">{title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="rounded-full border border-border/50 bg-accent px-3 py-0.5 text-xs font-medium text-accent-foreground"
                  >
                    {tech}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
