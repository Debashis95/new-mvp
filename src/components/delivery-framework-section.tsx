import { Search, Palette, Code2, TestTube2, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: Search,
    label: "Discovery",
    duration: "1-2 Weeks",
    description: "Requirements, architecture & roadmap",
    active: true,
  },
  {
    icon: Palette,
    label: "Design",
    duration: "1-3 Weeks",
    description: "UI/UX wireframes & prototypes",
    active: true,
  },
  {
    icon: Code2,
    label: "Development",
    duration: "2-6 Weeks",
    description: "Full-stack engineering & integrations",
    active: true,
  },
  {
    icon: TestTube2,
    label: "Testing",
    duration: "1-2 Weeks",
    description: "QA, performance & security review",
    active: false,
  },
  {
    icon: TrendingUp,
    label: "Scale",
    duration: null,
    description: "Launch support & growth",
    active: false,
  },
]

export function DeliveryFrameworkSection() {
  return (
    <section id="delivery-framework" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our MVP Delivery Framework
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            A proven process built for speed, quality, and predictability
          </p>
        </div>

        <div className="relative">
          <div className="flex items-start justify-between gap-0 overflow-x-auto pb-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isLast = index === steps.length - 1
              return (
                <div
                  key={step.label}
                  className="relative flex min-w-[110px] flex-1 flex-col items-center gap-4"
                >
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-sm transition-all ${
                        step.active
                          ? "border-primary bg-primary text-primary-foreground shadow-primary/20"
                          : "border-border bg-card text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {!isLast && (
                    <div className="absolute left-[calc(50%+28px)] top-7 h-0.5 w-[calc(100%-56px)] -translate-y-1/2">
                      <div className="h-full w-full rounded-full bg-border" />
                      {step.active && (
                        <div
                          className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-700"
                          style={{ width: steps[index + 1]?.active ? "100%" : "55%" }}
                        />
                      )}
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-0.5 text-center px-1">
                    <span
                      className={`text-sm font-semibold ${step.active ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {step.label}
                    </span>
                    {step.duration && (
                      <span className="text-xs font-medium text-primary">{step.duration}</span>
                    )}
                    <span className="mt-0.5 text-xs leading-snug text-muted-foreground">{step.description}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
