import type { Proposal, Voter, VotingResults } from "@/types/voting"

const DEMO_ADDRESSES = [
  "0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf",
  "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",
  "0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69",
  "0x1efF47bc3a10a45D4B230B5d10E37751FE6AA718",
  "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC",
]

export function simulateVotingSession(): VotingResults {
  const proposals: Proposal[] = [
    { id: 1, title: "Buy fans", votes: 0 },
    { id: 2, title: "Fix ACs", votes: 0 },
    { id: 3, title: "Hold a Lisk Meetup", votes: 0 },
    { id: 4, title: "Buy new panels for the class", votes: 0 },
  ]

  const initialVoters = [
    {
      id: 1,
      name: "Voter 1",
      votes: [{ proposalId: 1, credits: 100, votes: 10 }],
      totalCredits: 100,
    },
    {
      id: 2,
      name: "Voter 2",
      votes: [
        { proposalId: 2, credits: 64, votes: 8 },
        { proposalId: 3, credits: 36, votes: 6 },
      ],
      totalCredits: 100,
    },
    {
      id: 3,
      name: "Voter 3",
      votes: [
        { proposalId: 2, credits: 49, votes: 7 },
        { proposalId: 4, credits: 51, votes: 7 },
      ],
      totalCredits: 100,
    },
    {
      id: 4,
      name: "Voter 4",
      votes: [
        { proposalId: 3, credits: 81, votes: 9 },
        { proposalId: 4, credits: 19, votes: 4 },
      ],
      totalCredits: 100,
    },
    {
      id: 5,
      name: "Voter 5",
      votes: [
        { proposalId: 1, credits: 9, votes: 3 },
        { proposalId: 2, credits: 25, votes: 5 },
        { proposalId: 3, credits: 36, votes: 6 },
        { proposalId: 4, credits: 25, votes: 5 },
      ],
      totalCredits: 90,
    },
  ]

  // Add addresses to voters
  const voters: Voter[] = initialVoters.map((voter, index) => ({
    ...voter,
    address: DEMO_ADDRESSES[index],
  }))

  // Calculate total votes and credits by proposal
  const totalVotesByProposal: { [key: string]: number } = {}
  const totalCreditsByProposal: { [key: string]: number } = {}

  proposals.forEach((proposal) => {
    totalVotesByProposal[proposal.title] = 0
    totalCreditsByProposal[proposal.title] = 0
  })

  voters.forEach((voter) => {
    voter.votes.forEach((vote) => {
      const proposal = proposals.find((p) => p.id === vote.proposalId)
      if (proposal) {
        totalVotesByProposal[proposal.title] += vote.votes
        totalCreditsByProposal[proposal.title] += vote.credits
        proposal.votes += vote.votes
      }
    })
  })

  return {
    proposals,
    voters,
    totalVotesByProposal,
    totalCreditsByProposal,
  }
}

