"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VotingInterface } from "@/components/room/voting-interface"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation";
import { VotingResults } from "@/components/voting-results"
import { NavBar } from "@/components/shared/navbar"


export default function SessionPage() {
  const params = useParams();
  const roomId = Number(params.id);
  const sessionId = Number(params.sessionId);


  return (
    <>
   <NavBar isApp={true} />
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link
            href={`/room/${roomId}`}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Room
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Q1 2024 Funding Round
          </h1>
          <p className="mt-2 text-muted-foreground">Vote on project funding allocations for Q1 2024</p>
        </div>
        <Tabs defaultValue="vote" className="space-y-4">
          <TabsList className="bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="vote">Vote</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          <TabsContent value="vote" className="space-y-4">
            <VotingInterface sessionId={sessionId} roomId={roomId} initialCredits={100} />
          </TabsContent>
          <TabsContent value="results">
           <VotingResults roomId={roomId} sessionId={sessionId} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
    </>
  )
}

