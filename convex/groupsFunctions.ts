import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCustomGroups = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) return null

    const groupsList = await ctx.db
      .query("taskGroups")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect()

    return groupsList ? groupsList : [];
  },
});

export const getCustomGroup = query({
  args: {
    groupId: v.id("taskGroups"),
  },
  handler: async (ctx, {groupId}) => {
    const group = await ctx.db.get(groupId)
    return group
  },
})


export const createCustomGroup = mutation({
  args: {
    name: v.string(),
    color: v.string(),
    icon: v.union(v.literal('all'), v.literal('today'), v.literal('inbox'), v.literal('plus'), v.literal('checkmarkNoBg'), v.literal('trash'), v.literal('newList')),
  },
  handler: async (ctx, {name, color, icon}) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) return null

    await ctx.db.insert('taskGroups', {name, userId, color, icon})
  },
})

export const deleteCustomGroup = mutation({
  args: {
    groupId: v.id("taskGroups"),
  },
  handler: async (ctx, {groupId}) => {
    await ctx.db.delete(groupId)
  },
})

export const updateCustomGroup = mutation({
  args: {
    groupId: v.id("taskGroups"),
    patch: v.object({
      name: v.optional(v.string()),
      color: v.optional(v.string()),
      icon: v.optional(v.union(v.literal('all'), v.literal('today'), v.literal('inbox'), v.literal('plus'), v.literal('checkmarkNoBg'), v.literal('trash'), v.literal('newList'))),
    }),
  },
  handler: async (ctx, {groupId, patch}) => {
    await ctx.db.patch(groupId, patch)
  },
})