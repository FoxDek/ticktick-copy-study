import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getSubtasks = query({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async(ctx, args) => {
    const subtasks = await ctx.db.query("subtasks").filter(q => q.eq(q.field("taskId"), args.taskId)).collect();

    return subtasks || [];
  }
})

export const addSubtask = mutation({
  args: {
    taskId: v.id("tasks"),
    body: v.string(),
  },
  handler: async(ctx, args) => {
    const newSubtask = await ctx.db.insert("subtasks", {taskId: args.taskId, body: args.body, completed: false});
    
    console.log('Subtask with id:', newSubtask, 'added successfully.');
  }
})

export const updateSubtask = mutation({
  args: {
    subtaskId: v.id("subtasks"),
    patch: v.object({
      body: v.optional(v.string()),
      completed: v.optional(v.boolean()),
    }),
  },
  handler: async(ctx, args) => {
    await ctx.db.patch(args.subtaskId, args.patch);
  }
})

export const deleteSubtask = mutation({
  args: {
    subtaskId: v.id("subtasks"),
  },
  handler: async(ctx, args) => {
    await ctx.db.delete(args.subtaskId);
  }
})