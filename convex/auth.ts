import Github from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { DataModel } from "./_generated/dataModel";

/**
 * Creating a custom password to add name to the user model to be saved
 * in convex db.
 * for password auth docs: https://labs.convex.dev/auth/config/passwords
 */
const CustomPassword = Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: params.name as string,
    };
  },
});

export const { auth, signIn, signOut, store } = convexAuth({
  /*
   * Convex OAuth - will associate users with different authAccounts. ie. a user with
   * google and github will show as one user but will have two authAcounts with same
   * userId.
   */

  providers: [CustomPassword, Github, Google], // automatically looks for clientId and secret as noted in docs
});
