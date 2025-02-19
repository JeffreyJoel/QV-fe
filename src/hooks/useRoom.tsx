"use client";

import { useEffect, useState } from "react";
import { getProvider, readOnlyProvider } from "@/connection/providers";
import { useAppKitProvider } from "@reown/appkit/react";
import { getContract } from "@/connection/contracts";
import { Room } from "@/types";

//TODO: update with correct interfaces

interface ContractError {
  code: string;
  message: string;
  transaction?: any;
}
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

interface VotingResultsData {
  proposals: ProposalResult[];
  voters: Voter[];
  totalVotesByProposal: Record<string, number>;
  totalCreditsByProposal: Record<string, number>;
}

export const useRoom = () => {
  const { walletProvider } = useAppKitProvider("eip155");
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<ContractError | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [sessionsByRoom, setSessionsByRoom] = useState< any[]>([]);
  const [propsalsBySession, setProposalsBySession] = useState <any[]> ([])
  const [votingResults, setVotingResults] = useState<VotingResultsData | null>(null);

  const readWriteProvider = getProvider(walletProvider);

  const createRoom = async (
    name: string,
    description: string,
    entryKey: string
  ) => {
    setLoading((prev) => ({ ...prev, createRoom: true }));
    setError(null);

    try {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : readOnlyProvider;
      const contract = getContract(signer);
      const tx = await contract.createRoom(name, description, entryKey);
      await tx.wait();
      
      // Refresh rooms after successful creation
      await fetchRooms();
      return true;
    } catch (err: any) {
      setError({
        code: err.code || "UNKNOWN_ERROR",
        message: err.reason || err.message || "Failed to create room",
        transaction: err.transaction
      });
      console.log(err);
      
      return false;
    } finally {
      setLoading((prev) => ({ ...prev, createRoom: false }));
    }
  };

  const createVotingSession = async (
    roomId: number,
    name: string,
    description: string,
    startTime: number,
    endTime: number,
    creditsPerVoter: number,
    proposals: string[]
  ) => {
    setLoading((prev) => ({ ...prev, createVotingSession: true }));
    setError(null);

    try {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : readOnlyProvider;
      const contract = getContract(signer);
      const tx = await contract.createVotingSession(
        roomId,
        name,
        description,
        startTime,
        endTime,
        creditsPerVoter,
        proposals
      );
      await tx.wait();
      
      // Refresh rooms after creating session
      await fetchRooms();
      return true;
    } catch (err: any) {
      setError({
        code: err.code || "UNKNOWN_ERROR",
        message: err.reason || err.message || "Failed to create voting session",
        transaction: err.transaction
      });
      return false;
    } finally {
      setLoading((prev) => ({ ...prev, createVotingSession: false }));
    }
  };

  const fetchRooms = async () => {
    setLoading((prev) => ({ ...prev, fetchRooms: true }));
    setError(null);

    try {
      const contract = getContract(readOnlyProvider);
      const roomIds = await contract.getAllRoomIds();
      const roomDetails = await Promise.all(
        roomIds.map(async (id: any) => {
          const room = await contract.rooms(id);
          return {
            id: id.toString(),
            name: room.name,
            description: room.description,
            creator: room.creator,
            active: room.active,
            sessions: room.sessionCount,
            entryHash: room.entryHash,
          };
        })
      );
      console.log(roomDetails);
      
      setRooms(roomDetails);
    } catch (err: any) {
      setError(err);
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading((prev) => ({ ...prev, fetchRooms: false }));
    }
  };

  const fetchSessionsByRoom = async (roomId: number) => {
    setLoading((prev) => ({ ...prev, fetchSessions: true }));
    setError(null);

    try {
      const contract = getContract(readOnlyProvider);
      
      // Get all session IDs for the room
      const sessionIds = await contract.getSessionIdsForRoom(roomId);
      
      const sessionDetails = await Promise.all(
        sessionIds.map(async (sessionId:number) => {
          const [
            name,
            description,
            startTime,
            endTime,
            creditsPerVoter,
            active,
            creator,
            proposalCount
          ] = await contract.getSessionDetails(roomId, sessionId);

          return {
            id: sessionId.toString(),
            name,
            description,
            startTime: startTime.toString(),
            endTime: endTime.toString(),
            creditsPerVoter: creditsPerVoter.toString(),
            active,
            creator,
            proposalCount: proposalCount.toString()
          };
        })
      );
      
      setSessionsByRoom(sessionDetails);
      console.log(sessionDetails);
      
    } catch (err: any) {
      setError({
        code: err.code || "UNKNOWN_ERROR",
        message: err.reason || err.message || "Failed to fetch sessions",
        transaction: err.transaction
      });
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading((prev) => ({ ...prev, fetchSessions: false }));
    }
  };

  const fetchProposalDetails = async (roomId: number, sessionId: number) => {
    setLoading((prev) => ({ ...prev, fetchProposals: true }));
    setError(null);
  
    try {
      const contract = getContract(readOnlyProvider);
      
      // Get the proposal count for this session
      const [,,,,,,,proposalCount] = await contract.getSessionDetails(roomId, sessionId);
      
      // Create an array of indices from 0 to proposalCount-1
      const proposalIndices = Array.from(
        { length: Number(proposalCount) }, 
        (_, index) => index
      );
      
      // Fetch all proposal details in parallel
      const proposalDetails = await Promise.all(
        proposalIndices.map(async (proposalId: number) => {
          const [title, description, voteCount] = await contract.getProposalDetails(
            roomId,
            sessionId,
            proposalId
          );
  
          return {
            id: proposalId.toString(),
            title,
            description,
            voteCount: voteCount.toString(),
            sessionId: sessionId.toString(),
            roomId: roomId.toString()
          };
        })
      );
      
      setProposalsBySession(proposalDetails);
      
      console.log(`Proposals for session ${sessionId}:`, proposalDetails);
      
      return proposalDetails;
      
    } catch (err: any) {
      setError({
        code: err.code || "UNKNOWN_ERROR",
        message: err.reason || err.message || "Failed to fetch proposals",
        transaction: err.transaction
      });
      console.error('Error fetching proposals:', err);
      return [];
    } finally {
      setLoading((prev) => ({ ...prev, fetchProposals: false }));
    }
  };


  const joinRoom = async (roomId: number, entryKey: string) => {
    setLoading((prev) => ({ ...prev, joinRoom: true }));
    setError(null);

    try {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : readOnlyProvider;
      const contract = getContract(signer);
      const tx = await contract.joinRoom(1, entryKey);
      await tx.wait();
      
      // Refresh rooms after joining
      await fetchRooms();
      return true;
    } catch (err: any) {
      setError({
        code: err.code || "UNKNOWN_ERROR",
        message: err.reason || err.message || "Failed to join room",
        transaction: err.transaction
      });
      console.log('Error joining room:', err);
      return false;
    } finally {
      setLoading((prev) => ({ ...prev, joinRoom: false }));
    }
  };

  const processVotingResults = async (
    roomId: number,
    sessionId: number,
    addresses: string[]
  ) => {
    setLoading((prev) => ({ ...prev, processVotingResults: true }));
    setError(null);

    try {
      const contract = getContract(readOnlyProvider);

      // Fetch proposals first
      const proposals = await fetchProposalDetails(roomId, sessionId);

      // Process voter data
      const voters: Voter[] = [];
      const totalVotesByProposal: Record<string, number> = {};
      const totalCreditsByProposal: Record<string, number> = {};

      // Initialize totals
      proposals.forEach(proposal => {
        totalVotesByProposal[proposal.title] = 0;
        totalCreditsByProposal[proposal.title] = 0;
      });

      for (let i = 0; i < addresses.length; i++) {
        const voterAddress = addresses[i];
        
        // Get voter details
        const [matNumber, isRegistered] = await contract.getVoterDetails(voterAddress);
        
        if (!isRegistered) continue;

        // Initialize voter object
        const voter: Voter = {
          id: i + 1,
          address: voterAddress,
          name: `Voter ${i + 1}`,
          votes: [],
          totalCredits: 0,
          matNumber,
          isRegistered
        };

        // Get votes for each proposal
        for (let proposalId = 0; proposalId < proposals.length; proposalId++) {
          try {
            const votes = await contract.getVoterProposalVotes(
              roomId,
              sessionId,
              voterAddress,
              proposalId
            );

            if (votes > 0) {
              // Calculate credits based on quadratic voting formula (votes^2)
              const credits = Number(votes) * Number(votes);
              const proposalTitle = proposals[proposalId].title;

              voter.votes.push({
                proposalId: proposalId + 1,
                credits,
                votes: Number(votes)
              });

              voter.totalCredits += credits;

              // Update totals
              totalVotesByProposal[proposalTitle] += Number(votes);
              totalCreditsByProposal[proposalTitle] += credits;
            }
          } catch (err: any) {
            console.error(`Error getting votes for proposal ${proposalId}:`, err);
          }
        }

        // Only add voters who have cast votes
        if (voter.votes.length > 0) {
          voters.push(voter);
        }
      }

      // Format proposals with vote counts
      const proposalResults: ProposalResult[] = proposals.map(proposal => ({
        id: Number(proposal.id) + 1, // Adjust to match voterId format
        title: proposal.title,
        description: proposal.description,
        votes: totalVotesByProposal[proposal.title]
      }));

      const results: VotingResultsData = {
        proposals: proposalResults,
        voters,
        totalVotesByProposal,
        totalCreditsByProposal
      };

      setVotingResults(results);
      return results;
      
    } catch (err: any) {
      setError({
        code: err.code || "UNKNOWN_ERROR",
        message: err.reason || err.message || "Failed to process voting results",
        transaction: err.transaction
      });
      console.error('Error processing voting results:', err);
      return null;
    } finally {
      setLoading((prev) => ({ ...prev, processVotingResults: false }));
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    createRoom,
    createVotingSession,
    fetchRooms,
    fetchSessionsByRoom,
    fetchProposalDetails,
    processVotingResults,
    joinRoom,
    rooms,
    sessionsByRoom,
    propsalsBySession,
    votingResults,
    loading,
    error,
    isLoading: (action: string) => loading[action] || false,
  };
};