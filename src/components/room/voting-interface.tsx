import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useVoter } from "@/hooks/useVoter";
import { useRoom } from "@/hooks/useRoom";
import toast from "react-hot-toast"

interface Proposal {
  id: number;
  title: string;
  description: string;
  votes: number;
  totalCredits: number;
}

interface VotingInterfaceProps {
  roomId: number;
  sessionId: number;
  initialCredits?: number;
}

export function VotingInterface({ roomId, sessionId, initialCredits = 100 }: VotingInterfaceProps) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [remainingCredits, setRemainingCredits] = useState(initialCredits);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { castVote } = useVoter();
  const { fetchProposalDetails, propsalsBySession } = useRoom();

  useEffect(() => {
    const fetchData = async () => {
      await fetchProposalDetails(roomId, sessionId);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const formattedProposals = propsalsBySession.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      votes: 0,
      totalCredits: 0,
    })) || [];
    
    setProposals(formattedProposals);
  }, [propsalsBySession]);

  const calculateVoteCost = (currentVotes: number, adding: boolean) => {
    return adding
      ? Math.pow(currentVotes + 1, 2) - Math.pow(currentVotes, 2)
      : Math.pow(currentVotes, 2) - Math.pow(currentVotes - 1, 2);
  };

  const handleVoteChange = (proposalId: number, isIncrement: boolean) => {
    const proposal = proposals.find((p) => p.id === proposalId);
    if (!proposal) return;

    const voteCost = calculateVoteCost(proposal.votes, isIncrement);

    if (isIncrement && voteCost > remainingCredits) {
      alert("Not enough credits!");
      return;
    }

    if (!isIncrement && proposal.votes === 0) return;

    const updatedProposals = proposals.map((p) =>
      p.id === proposalId
        ? {
            ...p,
            votes: isIncrement ? p.votes + 1 : p.votes - 1,
            totalCredits: isIncrement ? p.totalCredits + voteCost : p.totalCredits - voteCost,
          }
        : p
    );

    setProposals(updatedProposals);
    setRemainingCredits(prev => isIncrement ? prev - voteCost : prev + voteCost);
  };

  const handleSubmitVotes = async () => {
    try {
      setIsSubmitting(true);
      const proposalIds = proposals.map(p => p.id);
      const credits = proposals.map(p => p.totalCredits);
      
      await castVote(roomId, sessionId, proposalIds, credits);
      alert("Votes submitted successfully!");
    } catch (error) {
      console.error("Error submitting votes:", error);
      alert("Failed to submit votes. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasVotes = proposals.some(p => p.votes > 0);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-medium">Available Credits</h3>
            <span className="text-2xl font-bold text-primary">{remainingCredits}</span>
          </div>
          <Progress value={(remainingCredits / initialCredits) * 100} className="bg-primary/20" />
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="backdrop-blur-sm bg-card/50">
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
                    onClick={() => handleVoteChange(proposal.id, false)}
                    disabled={proposal.votes === 0 || isSubmitting}
                    className="bg-secondary/50 hover:bg-secondary"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-bold text-primary">{proposal.votes}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleVoteChange(proposal.id, true)}
                    disabled={calculateVoteCost(proposal.votes, true) > remainingCredits || isSubmitting}
                    className="bg-secondary/50 hover:bg-secondary"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">{proposal.totalCredits} credits used</div>
              </div>
            </CardContent>
            <CardFooter className="bg-card/50">
              <div className="text-sm text-muted-foreground">
                Next vote costs: {calculateVoteCost(proposal.votes, true)} credits
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmitVotes}
          disabled={!hasVotes || isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? "Submitting..." : "Submit Votes"}
        </Button>
      </div>
    </div>
  );
}