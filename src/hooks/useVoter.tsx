import { useState } from "react";
import { getProvider, readOnlyProvider } from "@/connection/providers";
import { useAppKitProvider } from "@reown/appkit/react";
import { getContract } from "@/connection/contracts";

export const useVoter = () => {
    const { walletProvider } = useAppKitProvider("eip155");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const readWriteProvider = getProvider(walletProvider);

  const registerVoter = async (matNumber:string) => {
    setLoading(true);
    try {
        const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : readOnlyProvider;
      const contract = getContract(signer);
      const tx = await contract.registerVoter(matNumber);
      await tx.wait();
    } catch (err:any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const castVote = async (
    roomId: number, 
    sessionId: number, 
    proposalIds: number[], 
    credits: number[]
  ) => {
    setLoading(true);
    try {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : readOnlyProvider;
      const contract = getContract(signer);
      
      // Validate arrays have same length
      if (proposalIds.length !== credits.length) {
        throw new Error("ProposalIds and credits arrays must have the same length");
      }
  
      const tx = await contract.castVote(
        roomId,
        sessionId, 
        proposalIds,
        credits
      );
      await tx.wait();
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { registerVoter, castVote, loading, error };
};