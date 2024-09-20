import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useCurrentUser = () => {
  const data = useQuery(api.users.current);
  const isLoading = data === undefined; // convex returns undefined when query is loading -> null when is done with no resutl

  return { data, isLoading };
};
