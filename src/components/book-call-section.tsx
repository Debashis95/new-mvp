import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Check, Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "03:00 PM", "04:00 PM"]

const projectTypes = [
  "New Product / MVP",
  "Feature Development",
  "Product Redesign",
  "AI Integration",
  "Enterprise App",
  "Mobile App",
]

export function BookCallSection() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>("10:00 AM")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { projectType: "" },
  })

  const projectType = watch("projectType")

  const onSubmit = async (data: FormValues) => {
    setError(null)
    try {
      const { error: dbError } = await supabase.from("discovery_calls").insert({
        name: data.name,
        email: data.email,
        message: data.message ?? null,
        project_type: data.projectType,
        selected_date: date ? format(date, "yyyy-MM-dd") : null,
        selected_time: selectedTime,
      })
      if (dbError) {
        console.error("Supabase insert error:", dbError)
        const msg = dbError.message?.toLowerCase() || ""
        if (dbError.code === "42P01") {
          setError('The "discovery_calls" table does not exist in Supabase. Create it via SQL Editor.')
        } else if (dbError.code === "42501") {
          setError("Insert permission denied. Enable RLS insert policy for the anon role on the discovery_calls table.")
        } else if (msg.includes("failed to fetch") || msg.includes("fetch failed") || msg.includes("networkerror")) {
          setError("Cannot reach Supabase. Your project may be paused (free tier). Go to Supabase Dashboard and unpause it.")
        } else {
          setError(dbError.message)
        }
        return
      }
      setSubmitted(true)
    } catch (err) {
      console.error("Submit error:", err)
      const msg = String(err).toLowerCase()
      if (msg.includes("failed to fetch") || msg.includes("fetch failed") || msg.includes("networkerror")) {
        setError("Cannot reach Supabase. Your project may be paused (free tier). Go to Supabase Dashboard and unpause it.")
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <section id="book-call" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Book a Discovery Call
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            30 minutes to explore your idea and map the fastest path to launch
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border-border/60 shadow-2xl shadow-primary/5">
            <div className="grid lg:grid-cols-2">
              {/* Calendar side */}
              <div className="border-b border-border/50 bg-muted/20 p-6 lg:border-b-0 lg:border-r">
                <div className="mb-4 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Select a Date &amp; Time</span>
                </div>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-xl border border-border/50 bg-card p-3"
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                />

                <div className="mt-5">
                  <div className="mb-2 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs font-medium text-muted-foreground">Available time slots</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={cn(
                          "rounded-lg border px-2 py-1.5 text-xs font-medium transition-all duration-150",
                          selectedTime === slot
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form side */}
              <div className="p-6">
                {submitted ? (
                  <div className="flex h-full flex-col items-center justify-center gap-5 text-center py-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
                      <Check className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">You're booked!</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        We've reserved your{" "}
                        <strong>{date ? format(date, "MMMM d") : ""} at {selectedTime}</strong> slot.
                        Expect a calendar invite within the hour.
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Can't make it? Reply to your confirmation email to reschedule.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="mb-1">
                      <CardTitle className="text-base font-semibold">Your Information</CardTitle>
                      <CardDescription className="mt-0.5 text-xs">
                        Tell us about you and your project idea
                      </CardDescription>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name" className="text-xs font-medium">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Jane Smith"
                        className="h-9 text-sm"
                        {...register("name")}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email" className="text-xs font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@startup.com"
                        className="h-9 text-sm"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium">Project Type</Label>
                      <Select
                        value={projectType}
                        onValueChange={(val) => setValue("projectType", val, { shouldValidate: true })}
                      >
                        <SelectTrigger className="h-9 text-sm" aria-invalid={!!errors.projectType}>
                          <SelectValue placeholder="What are you building?" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-sm">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.projectType && (
                        <p className="text-xs text-destructive">{errors.projectType.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="message" className="text-xs font-medium">
                        Tell us about your project{" "}
                        <span className="text-muted-foreground">(optional)</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="What problem are you solving? Where are you in your journey?"
                        className="resize-none text-sm"
                        rows={3}
                        {...register("message")}
                      />
                    </div>

                    {error && <p className="text-xs text-destructive">{error}</p>}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-1 w-full shadow-md shadow-primary/20"
                    >
                      {isSubmitting ? "Scheduling..." : "Schedule My Free Call"}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      No commitment required. 30-minute call, free of charge.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
