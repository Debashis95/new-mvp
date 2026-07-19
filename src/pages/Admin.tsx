import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ExternalLink, Video, Mail, CheckCircle, XCircle, Clock, Copy } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"

type Booking = {
  id: number
  created_at: string
  name: string
  email: string
  message: string | null
  project_type: string
  selected_date: string | null
  selected_time: string | null
  status: string | null
  meet_link: string | null
  notes: string | null
}

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  completed: "bg-blue-100 text-blue-700 border-blue-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
}

export default function Admin() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [meetLink, setMeetLink] = useState("")
  const [editStatus, setEditStatus] = useState("pending")
  const [editNotes, setEditNotes] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [])

  async function fetchBookings() {
    setLoading(true)
    const { data, error } = await supabase
      .from("discovery_calls")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) {
      toast.error("Failed to load bookings: " + error.message)
    } else {
      setBookings(data ?? [])
    }
    setLoading(false)
  }

  function openEditDialog(booking: Booking) {
    setSelectedBooking(booking)
    setMeetLink(booking.meet_link ?? "")
    setEditStatus(booking.status ?? "pending")
    setEditNotes(booking.notes ?? "")
  }

  async function saveMeeting() {
    if (!selectedBooking) return
    setSaving(true)
    const { error } = await supabase
      .from("discovery_calls")
      .update({
        meet_link: meetLink || null,
        status: editStatus,
        notes: editNotes || null,
      })
      .eq("id", selectedBooking.id)
    if (error) {
      toast.error("Failed to update: " + error.message)
    } else {
      toast.success("Booking updated successfully")
      setSelectedBooking(null)
      fetchBookings()
    }
    setSaving(false)
  }

  function copyMeetLink(link: string) {
    navigator.clipboard.writeText(link)
    toast.success("Meet link copied to clipboard")
  }

  return (
    <div className="min-h-svh bg-muted/20">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Site
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={fetchBookings}>
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Discovery Call Bookings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage incoming booking requests and send Google Meet links.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Clock className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Loading bookings...</span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20">
            <Video className="h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">No bookings yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Meet Link</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.name}</TableCell>
                    <TableCell className="text-muted-foreground">{booking.email}</TableCell>
                    <TableCell>
                      {booking.selected_date
                        ? format(new Date(booking.selected_date), "MMM d, yyyy")
                        : "—"}
                    </TableCell>
                    <TableCell>{booking.selected_time ?? "—"}</TableCell>
                    <TableCell className="max-w-[140px] truncate" title={booking.project_type}>
                      {booking.project_type}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusStyles[booking.status ?? "pending"] ?? ""}
                      >
                        {booking.status ?? "pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {booking.meet_link ? (
                        <div className="flex items-center gap-1">
                          <a
                            href={booking.meet_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Open
                          </a>
                          <button
                            type="button"
                            onClick={() => copyMeetLink(booking.meet_link!)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => {
                            navigator.clipboard.writeText(booking.email)
                            toast.success("Email copied")
                          }}
                        >
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => openEditDialog(booking)}
                        >
                          <Video className="h-3 w-3" />
                          Manage
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      <Dialog
        open={!!selectedBooking}
        onOpenChange={(open) => { if (!open) setSelectedBooking(null) }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Booking</DialogTitle>
            <DialogDescription>
              Update status and add Google Meet link for {selectedBooking?.name}.
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-muted/30 p-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Name</span>
                    <p className="font-medium">{selectedBooking.name}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Email</span>
                    <p className="font-medium">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Date</span>
                    <p className="font-medium">
                      {selectedBooking.selected_date
                        ? format(new Date(selectedBooking.selected_date), "MMM d, yyyy")
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Time</span>
                    <p className="font-medium">{selectedBooking.selected_time ?? "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-muted-foreground">Project</span>
                    <p className="font-medium">{selectedBooking.project_type}</p>
                  </div>
                  {selectedBooking.message && (
                    <div className="col-span-2">
                      <span className="text-xs text-muted-foreground">Message</span>
                      <p className="text-muted-foreground">{selectedBooking.message}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger id="status" className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="meetLink">Google Meet Link</Label>
                  <Input
                    id="meetLink"
                    placeholder="https://meet.google.com/abc-defg-hij"
                    value={meetLink}
                    onChange={(e) => setMeetLink(e.target.value)}
                    className="h-9"
                  />
                  <p className="text-xs text-muted-foreground">
                    Paste the Google Meet link to send to the user.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="notes">Admin Notes (optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Internal notes about this booking"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter showCloseButton>
            <Button onClick={saveMeeting} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
