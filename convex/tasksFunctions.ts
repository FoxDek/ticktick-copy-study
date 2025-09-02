import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getTasks = query({
  args: {
    groupId: v.union(v.string(), v.id("taskGroups")),
  },
  handler: async (ctx, { groupId }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return;
    }

    let tasksQuery = ctx.db.query('tasks').withIndex('by_completed');

    tasksQuery = tasksQuery.filter((q) => q.eq(q.field("userId"), userId));

    if (groupId == 'completed') {
      tasksQuery = tasksQuery.filter((q) => q.eq(q.field("completed"), true));
    } else if (groupId === 'today') {
      tasksQuery = tasksQuery.filter((q) => q.eq(q.field("dueDate"), new Date().toISOString().split('T')[0]));
    } else if (groupId === 'inbox') {
      tasksQuery = tasksQuery.filter((q) => q.eq(q.field("groupId"), undefined));
    } else if (groupId && groupId !== 'all') {
      tasksQuery = tasksQuery.filter((q) => q.eq(q.field("groupId"), groupId));
    }

    const orderedQuery = tasksQuery.order('asc');

    const tasksList = await orderedQuery.collect();

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
    groupId: v.optional(v.union(v.id("taskGroups"), v.null())),
    dueDate: v.optional(v.string()),
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
      priority: 'common',
      groupId: args.groupId,
      dueDate: args.dueDate,
      subtasksCount: 0,
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
      dueDate: v.optional(v.string()),
      groupId: v.optional(v.union(v.id("taskGroups"), v.null())),
      priority: v.optional(v.union(v.literal("common"), v.literal("low"), v.literal("medium"), v.literal("high"))),
      description: v.optional(v.string()),
      subtasksCount: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const patch = { ...args.patch };

    if (patch.groupId === null) {
      patch.groupId = undefined;
    }
    
    await ctx.db.patch(args.taskId, patch);
  },
});



