import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, Vote } from "lucide-react"

interface RoomDescriptionProps {
  name?: string
  description?: string
  creator?: string
  totalSessions?: number
  totalParticipants?: number
  createdAt?: string
}

export function RoomDescription({
  name,
  description,
  creator,
  totalSessions,
  totalParticipants,
  createdAt,
}: RoomDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
          <Separator />
          <div className="grid gap-4 md:grid-cols-3">
            {/* <div className="flex gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Created</p>
                // {/* <p className="text-sm text-muted-foreground">{new Date(createdAt)?.toLocaleDateString()}</p> *
              </div>
            </div> */}
            <div className="flex gap-2">
              <Vote className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Sessions</p>
                <p className="text-sm text-muted-foreground">{totalSessions}</p>
              </div>
            </div>
            {/* <div className="flex gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Participants</p>
                <p className="text-sm text-muted-foreground">{totalParticipants}</p>
              </div>
            </div> */}
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium">Admin Address</p>
            <p className="mt-1 font-mono text-sm text-muted-foreground">{creator}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

