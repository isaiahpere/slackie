import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

/**
 *
 * @returns {code} - 6 digit alphanumeric code which will be use
 * for workspace sessions.
 */
const generateCode = () => {
  let key = "0123456789abcdefghijklmnopqrstuvwxyz";
  const code = Array.from(
    { length: 6 },
    () => key[Math.floor(Math.random() * key.length)]
  ).join("");

  return code;
};

/**
 * Creates a new workspace and returns the workspace ID.
 * @param {name} - name of workspace
 * @returns {workspaceId} - Convex ID of the workspace
 */
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const joinCode = generateCode();
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    // user creating the workspace becomes the admin
    await ctx.db.insert("members", {
      userId,
      workspaceId,
      role: "admin",
    });

    return workspaceId;
  },
});

/**
 * Fetch All workspaces from DB.
 */
export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return []; // return empty array if user is not authenticated
    }

    // find all members related to userId
    const members = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    // get all workspaceIds from members
    const workspaceIds = members.map((member) => member.workspaceId);

    const workspaces = [];
    for (const workspaceId of workspaceIds) {
      const workspace = await ctx.db.get(workspaceId);
      if (workspace) workspaces.push(workspace);
    }

    return workspaces;
  },
});

/**
 * Fetch a workspace by ID.
 */
export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

    if (!member) return null;

    return await ctx.db.get(args.id);
  },
});
