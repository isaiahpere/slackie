import Github from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store } = convexAuth({
  /*
   * Convex OAuth - will associate users with different authAccounts. ie. a user with
   * google and github will show as one user but will have two authAcounts with same
   * userId.
   */

  providers: [Github, Google], // automatically looks for clientId and secret as noted in docs
});
