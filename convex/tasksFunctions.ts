import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
// import { api } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getTasks = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return;
    }

    const tasksList = await ctx.db
      .query("tasks")
      .withIndex('by_completed')
      .filter((q) => q.eq(q.field("userId"), userId))
      .order('asc')
      .collect();

    return tasksList ? tasksList : [];
  },
});

export const getTask = query({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.taskId);
    return task;
  },
})

export const addTask = mutation({
  args: {
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const newTaskId = await ctx.db.insert("tasks", {
      userId: userId,
      body: args.body,
      completed: false,
    });

    console.log(`Task with _id ${newTaskId} created`);
  },
});

export const deleteTask = mutation({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    await ctx.db.delete(args.taskId);
  },
});

export const updateTask = mutation({
  args: {
    taskId: v.id("tasks"),
    patch: v.object({
      body: v.optional(v.string()),
      completed: v.optional(v.boolean()),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    console.log("Принято:", args.patch.completed);

    await ctx.db.patch(args.taskId, args.patch);
  },
});
