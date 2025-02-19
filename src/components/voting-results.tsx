import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRoom } from "@/hooks/useRoom";
import { useEffect } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Using complementary colors in HSL format
const COLORS = [
  "hsl(142, 71%, 45%)", // Green (Primary)
  "hsl(322, 71%, 45%)", // Magenta (Complement to Green)
  "hsl(52, 71%, 45%)",  // Gold
  "hsl(232, 71%, 45%)", // Blue (Complement to Gold)
];

// Hover state colors with increased lightness
const HOVER_COLORS = [
  "hsl(142, 71%, 55%)",
  "hsl(322, 71%, 55%)",
  "hsl(52, 71%, 55%)",
  "hsl(232, 71%, 55%)",
];

interface VoterVote {
  proposalId: number;
  credits: number;
  votes: number;
}

interface Voter {
  id: number;
  address: string;
  name: string;
  votes: VoterVote[];
  totalCredits: number;
  matNumber?: string;
  isRegistered?: boolean;
}

interface ProposalResult {
  id: number;
  title: string;
  description: string;
  votes: number;
}

interface VotingResultsProps {
  proposals: ProposalResult[];
  voters: Voter[];
  totalVotesByProposal: Record<string, number>;
  totalCreditsByProposal: Record<string, number>;
}



export function VotingResults(
//   {
//   proposals,
//   voters,
//   totalVotesByProposal,
//   totalCreditsByProposal,
// }: VotingResultsProps
{roomId, sessionId}:
{roomId:number, sessionId:number}
) {

const addresses =["0xddb342ecc94236c29a5307d3757d0724d759453c", "0x02F6302D1b7C94FF01a2B59ebAC8d9aa2fc62522", "0xADb559583bdB736937228CC3f1453a75262FaE18"]
  const { processVotingResults, votingResults, isLoading } = useRoom();
  useEffect(() => {
    processVotingResults(roomId, sessionId, addresses);
  }, []);

  const proposals = votingResults?.proposals;
  const voters = votingResults?.voters;
  const totalVotesByProposal = votingResults?.totalVotesByProposal;
  const totalCreditsByProposal = votingResults?.totalCreditsByProposal;

  const pieData = Object.entries(totalVotesByProposal ?? {}).map(([name, value]) => ({
    name,
    value,
    credits: totalCreditsByProposal?.[name],
  }));

console.log(votingResults);


  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Votes Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: "hsl(var(--foreground))", strokeWidth: 1 }}
                    onMouseEnter={(data, index) => {
                      const slice = document.querySelector(
                        `[data-slice-index="${index}"]`
                      );
                      if (slice) {
                        slice.setAttribute(
                          "fill",
                          HOVER_COLORS[index % HOVER_COLORS.length]
                        );
                      }
                    }}
                    onMouseLeave={(data, index) => {
                      const slice = document.querySelector(
                        `[data-slice-index="${index}"]`
                      );
                      if (slice) {
                        slice.setAttribute(
                          "fill",
                          COLORS[index % COLORS.length]
                        );
                      }
                    }}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        data-slice-index={index}
                        className="transition-colors duration-200"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Proposal
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {data.name}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Votes
                                </span>
                                <span className="font-bold">{data.value}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Credits Used
                                </span>
                                <span className="font-bold">{data.credits}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {pieData.map((data, index) => (
                <div key={data.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {data.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Proposal Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proposals?.map((proposal, index) => (
                <div
                  key={proposal.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4"
                >
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      {proposal.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {totalCreditsByProposal?.[proposal.title]} credits used
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="font-medium"
                      style={{ color: COLORS[index % COLORS.length] }}
                    >
                      {proposal.votes} Votes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Voter Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Voter</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Proposals Voted</TableHead>
                <TableHead className="text-right">Total Credits Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voters?.map((voter) => (
                <TableRow key={voter.id}>
                  <TableCell>{voter.name}</TableCell>
                  <TableCell className="font-mono">
                    {voter.address.slice(0, 6)}...{voter.address.slice(-4)}
                  </TableCell>
                  <TableCell>
                    {voter.votes.map((vote) => {
                      const proposal = proposals?.find(
                        (p) => p.id === vote.proposalId
                      );
                      const colorIndex = proposals?.findIndex(
                        (p) => p.id === vote.proposalId
                      );
                      return proposal ? (
                        <div
                          key={vote.proposalId}
                          className="text-sm flex items-center gap-2"
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{
                              backgroundColor: COLORS[colorIndex ?? 0 % COLORS.length],
                            }}
                          />
                          <span>
                            {proposal.title}: {vote.votes} votes ({vote.credits}{" "}
                            credits)
                          </span>
                        </div>
                      ) : null;
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {voter.totalCredits}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}