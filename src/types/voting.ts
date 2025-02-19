export interface Proposal {
    id: number
    title: string
    votes: number
  }
  
  export interface Vote {
    proposalId: number
    credits: number
    votes: number
  }
  
  export interface Voter {
    id: number
    name: string
    address: string
    votes: Vote[]
    totalCredits: number
  }
  
  export interface VotingResults {
    proposals: Proposal[]
    voters: Voter[]
    totalVotesByProposal: { [key: string]: number }
    totalCreditsByProposal: { [key: string]: number }
  }
  
  