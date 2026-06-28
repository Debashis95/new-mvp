import { useState } from "react"
import { Rocket, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = ["Features", "Pricing", "Blog", "Term"]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Rocket className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            MVP Engineering Studio
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button key={link} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              {link}
            </Button>
          ))}
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Log In
          </Button>
          <Button size="sm" className="ml-2">
            Book Call
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="mt-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Button
                  key={link}
                  variant="ghost"
                  className="justify-start text-muted-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link}
                </Button>
              ))}
              <Button variant="ghost" className="justify-start text-muted-foreground" onClick={() => setOpen(false)}>
                Log In
              </Button>
              <Button className="mt-2" onClick={() => setOpen(false)}>
                Book Call
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
