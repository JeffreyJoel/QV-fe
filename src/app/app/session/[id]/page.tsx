import { useParams } from "next/navigation";

export default function SingleVotingSessionPage() {
  const { id } = useParams<{ id: string }>();


  return (
    <div>
      <h1></h1>
      <p></p>
    </div>
  );
}