import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MinusIcon, PlusIcon } from "lucide-react"
import type { Proposal } from "../types"

interface ProposalCardProps {
  proposal: Proposal
  onVote: (id: number, amount: number) => void
  disabled?: boolean
}

export function ProposalCard({ proposal, onVote, disabled }: ProposalCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{proposal.title}</CardTitle>
        <CardDescription>{proposal.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onVote(proposal.id, -1)}
              disabled={disabled || proposal.votes === 0}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="text-2xl font-bold">{proposal.votes}</span>
            <Button variant="outline" size="icon" onClick={() => onVote(proposal.id, 1)} disabled={disabled}>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Cost: {Math.pow(proposal.votes + 1, 2) - Math.pow(proposal.votes, 2)} credits
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

