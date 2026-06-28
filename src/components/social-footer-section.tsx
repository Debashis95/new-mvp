import { Rocket, Link2, GitBranch, AtSign, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const socialLinks = [
  { icon: Link2, label: "LinkedIn", href: "#" },
  { icon: GitBranch, label: "GitHub", href: "#" },
  { icon: AtSign, label: "X / Twitter", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "#" },
]

const footerLinks = {
  Product: ["Features", "Pricing", "Blog"],
  Company: ["About", "Term", "Contact"],
  Account: ["Log In", "Sign Up"],
}

export function SocialFooterSection() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-14">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Connect with us
            </p>
            <h3 className="mb-6 text-xl font-bold text-foreground">Let's build something great</h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map(({ icon: Icon, label }) => (
                <Button
                  key={label}
                  variant="outline"
                  className="h-16 w-36 flex-col gap-1.5 rounded-xl border-border/60 text-xs font-semibold text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent hover:text-foreground hover:shadow-sm"
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <Separator className="mb-10" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Rocket className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-foreground">MVP Engineering Studio</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We help founders ship faster. From idea to launch in weeks, not months.
              </p>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">{category}</h3>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MVP Engineering Studio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Built for ambitious founders</p>
        </div>
      </div>
    </footer>
  )
}
