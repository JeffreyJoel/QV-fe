export interface Room {
  id: string;
  name: string;
  description: string;
  creator: string;
  active: boolean;
  sessions: Number;
  entryHash: string;
}
  export interface VotingSession {
    id: string
    title: string
    description: string
    startDate: string
    endDate: string
    status: "upcoming" | "active" | "ended"
    proposals: Proposal[]
    totalVotes: number
    totalParticipants: number
  }
  
  export interface Proposal {
    id: number
    title: string
    description: string
    votes: number
    votesByUser: VoteData[]
  }
  
  export interface VoteData {
    address: string
    votes: number
    credits: number
    timestamp: string
  }
  
  