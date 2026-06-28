import { Zap, Lightbulb, Handshake } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Rapid Development",
    description:
      "We move fast without cutting corners. Our battle-tested processes and experienced team ship production-ready features in days, not weeks.",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
  {
    icon: Lightbulb,
    title: "Product Thinking",
    description:
      "We don't just write code — we think like product owners. Every feature is evaluated for user impact and business value before a single line is written.",
    iconColor: "text-primary",
    iconBg: "bg-accent",
  },
  {
    icon: Handshake,
    title: "Long-Term Partner",
    description:
      "We're invested in your success beyond launch. Our team stays alongside you as you grow, iterate, and scale to thousands of users.",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
]

export function WhyFoundersSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Founders Choose Us
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            We combine engineering excellence with startup-speed execution
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description, iconColor, iconBg }) => (
            <Card
              key={title}
              className="group cursor-default border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary/8"
            >
              <CardContent className="flex flex-col gap-5 p-7">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
