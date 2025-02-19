"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
// import { useToast } from "@/components/ui/use-toast"
import toast from "react-hot-toast"

interface JoinRoomDialogProps {
  roomId: number
  onJoinRoom: (roomId: number, entryKey: string) => Promise<boolean>
}

export function JoinRoomDialog({ roomId, onJoinRoom }: JoinRoomDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [entryKey, setEntryKey] = useState("")
//   const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onJoinRoom(roomId, entryKey)
    //   toast({
    //     title: "Success",
    //     description: "Successfully joined the room",
    //   })
    toast.success("Successfully joined the room");
      setOpen(false)
    } catch (error) {
        console.log(error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to join room. Please check your entry key.",
    //     variant: "destructive",
    //   })
    toast.error("Failed to join room. Please check your entry key.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Join Room</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Room</DialogTitle>
          <DialogDescription>Enter the room's entry key to join and participate in voting sessions.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter room key"
              value={entryKey}
              onChange={(e) => setEntryKey(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Joining..." : "Join Room"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

