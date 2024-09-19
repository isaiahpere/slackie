import Github from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store } = convexAuth({
  /*
   * Convex OAuth - will associate users with different authAccounts. ie. a user with
   * google and github will show as one user but will have two authAcounts with same
   * userId.
   *
   * for password auth docs: https://labs.convex.dev/auth/config/passwords
   */

  providers: [Password, Github, Google], // automatically looks for clientId and secret as noted in docs
});
