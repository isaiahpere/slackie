import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

/**
 * @returns The workspace id from the URL typed to convex ID
 */
const useWorkspaceId = () => {
  const params = useParams();
  return params.workspaceId as Id<"workspaces">;
};

export default useWorkspaceId;
