import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Calendar, Globe, Users, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DateTimePicker } from "./shared/DateTimePicker";

interface Proposal {
  id: number;
  title: string;
  description: string;
}

export default function CreateSession() {
  const [proposals, setProposals] = useState<Proposal[]>([
    { id: 1, title: "", description: "" },
  ]);
  const [isPublic, setIsPublic] = useState(true);

  const addProposal = () => {
    setProposals([
      ...proposals,
      { id: proposals.length + 1, title: "", description: "" },
    ]);
  };

  const removeProposal = (id: number) => {
    if (proposals.length > 1) {
      setProposals(proposals.filter((p) => p.id !== id));
    }
  };

  const updateProposal = (
    id: number,
    field: "title" | "description",
    value: string
  ) => {
    setProposals(
      proposals.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]   overflow-y-auto">
        <DialogTitle>Create Voting Session</DialogTitle>
        <div className="h-[600px] pt-8 pb-32">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {/* <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Visibility</span>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                <span className="text-sm">
                  {isPublic ? "Public" : "Private"}
                </span>
              </div> */}
            </div>
            <p className="text-md">
              Set up your voting session details and proposals
            </p>
          </div>
          <div className="space-y-6 pb-8">
            <div>
              <Label htmlFor="session-name">Session Name</Label>
              <Input
                id="session-name"
                placeholder="Enter voting session name"
                className="text-lg mt-1"
              />
            </div>

            <div className="space-y-4">
              <Label>Voting Period</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date" className="text-sm">
                    Start Date
                  </Label>
                  <DateTimePicker/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date" className="text-sm">
                    End Date
                  </Label>
                  <DateTimePicker/>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voter-access">Voter Access</Label>
              <Select defaultValue="all">
                <SelectTrigger id="voter-access">
                  <SelectValue placeholder="Select voter access" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  <SelectItem value="token">Token Holders</SelectItem>
                  <SelectItem value="whitelist">Whitelisted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session-description">Session Description</Label>
              <Textarea
                id="session-description"
                placeholder="Add a description for your voting session..."
                className="min-h-[100px]"
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Proposals</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addProposal}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Proposal
                </Button>
              </div>

              {proposals.map((proposal, index) => (
                <Card key={proposal.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Proposal {index + 1}
                    </CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProposal(proposal.id)}
                      disabled={proposals.length === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <div className="space-y-2">
                    <Input
                      placeholder="Proposal Title"
                      value={proposal.title}
                      onChange={(e) =>
                        updateProposal(proposal.id, "title", e.target.value)
                      }
                    />
                    <Textarea
                      placeholder="Proposal Description"
                      value={proposal.description}
                      onChange={(e) =>
                        updateProposal(
                          proposal.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </Card>
              ))}
            </div>
            <Button className="w-full mb-8" size="lg">
              Create Voting Session
            </Button>
          </div>
        </div>
        <DialogFooter className="pt-8"></DialogFooter>
      </DialogContent>
  );
}
