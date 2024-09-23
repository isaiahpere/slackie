import { query } from "./_generated/server";

/**
 * Fetch All workspaces from DB.
 */
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});
