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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DateTimePicker } from "@/components/shared/DateTimePicker"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useRoom } from "@/hooks/useRoom"

interface CreateSessionFormProps {
  roomId: string
}

export function CreateSessionForm({ roomId }: CreateSessionFormProps) {
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [proposals, setProposals] = useState<string[]>([])
  const [newProposal, setNewProposal] = useState("")
  const [error, setError] = useState<string>("")
  
  const { createVotingSession, isLoading } = useRoom()

  const handleAddProposal = () => {
    if (newProposal.trim()) {
      setProposals([...proposals, newProposal.trim()])
      setNewProposal("")
    }
  }

  const handleRemoveProposal = (index: number) => {
    setProposals(proposals.filter((_, i) => i !== index))
  }

  const resetForm = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    setProposals([])
    setNewProposal("")
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    try {
      // Validate inputs
      if (!startDate || !endDate) {
        setError("Please select both start and end dates")
        return
      }

      if (proposals.length === 0) {
        setError("Please add at least one proposal")
        return
      }

      const form = e.currentTarget
      const formData = new FormData(form)
      const title = formData.get("title") as string
      const description = formData.get("description") as string

      if (!title || !description) {
        setError("Please fill in all required fields")
        return
      }



      // Convert dates to Unix timestamps
      const startTimestamp = Math.floor(startDate.getTime() / 1000)
      const endTimestamp = Math.floor(endDate.getTime() / 1000)

      console.log('Submitting session with data:', {
        roomId: Number(roomId),
        title,
        description,
        startTime: startTimestamp,
        endTime: endTimestamp,
        proposals
      })

      await createVotingSession(
        Number(roomId),
        title,
        description,
        startTimestamp,
        endTimestamp,
        100, // Default credits per voter
        proposals
      )

      // if (success) {
      //   console.log('Session created successfully')
      //   resetForm()
      //   setOpen(false)
      // } else {
      //   console.log();
        
      //   setError("Failed to create session")
      // }
    } catch (err) {
      console.error('Error creating session:', err)
      setError(err instanceof Error ? err.message : "Failed to create session")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Voting Session</DialogTitle>
          <DialogDescription>Set up a new voting session with proposals and timing</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm font-medium text-red-500 dark:text-red-400">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="title">Session Title</Label>
            <Input id="title" name="title" placeholder="Enter session title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Describe the voting session" required />
          </div>
          <div className="space-y-2">
            <Label>Start Date & Time</Label>
            <DateTimePicker date={startDate} setDate={setStartDate} />
          </div>
          <div className="space-y-2">
            <Label>End Date & Time</Label>
            <DateTimePicker date={endDate} setDate={setEndDate} />
          </div>
          <div className="space-y-2">
            <Label>Proposals</Label>
            <div className="flex gap-2">
              <Input
                value={newProposal}
                onChange={(e) => setNewProposal(e.target.value)}
                placeholder="Add a proposal"
              />
              <Button type="button" variant="outline" onClick={handleAddProposal}>
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {proposals.map((proposal, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border p-2">
                  <span className="text-sm">{proposal}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveProposal(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading('createVotingSession') || !startDate || !endDate || proposals.length === 0}
          >
            {isLoading('createVotingSession') ? "Creating..." : "Create Session"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}