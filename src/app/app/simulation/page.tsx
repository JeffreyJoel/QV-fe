"use client"

import { VotingResults } from "@/components/voting-results"
import { simulateVotingSession } from "@/utils/simulation"
import { useEffect, useState } from "react"
import type { VotingResults as VotingResultsType } from "@/types/voting"

export default function VoteResults() {
  const [results, setResults] = useState<VotingResultsType | null>(null)

  useEffect(() => {
    const simulationResults = simulateVotingSession()
    setResults(simulationResults)
  }, [])

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading simulation...</h2>
          <p className="text-muted-foreground">Please wait while we process the voting data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-y bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-24 items-center px-4">
          <div>
            <h1 className="text-2xl font-bold">Second Semester Budget allocation Voting Results</h1>
            <p className="text-sm text-muted-foreground">Quadratic voting session with a sample size of 5 voters</p>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {/* <VotingResults {...results} /> */}
      </main>
    </div>
  )
}

