import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
// import { api } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

export const addTask = mutation({
  args: {
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return;
    }

    const newTask = {
      _id: crypto.randomUUID(),
      body: args.body,
      completed: false,
    }
    
    const tasksList = await ctx.db.query('todos').filter(q => q.eq(q.field('userId'), userId)).first();

    if(!tasksList) {
      const taskList = {
        userId,
        tasks: [newTask]
      }
      await ctx.db.insert('todos', taskList);
    } else {
      const newTaskList = [...tasksList.tasks, newTask]
      await ctx.db.patch(tasksList._id, {tasks: newTaskList})
    }
    
    return 'success'
  }
})

export const getTasks = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    
    if (!userId) {
      return;
    }

    const tasksList = await ctx.db.query('todos').filter(q => q.eq(q.field('userId'), userId)).first();

    return tasksList ? tasksList.tasks : [];
  }
})

// export const updateTask = mutation({
//   args:
// })

export const deleteTask = mutation({
  args: { taskId: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const tasksList = await ctx.db
      .query('todos')
      .filter((q) => q.eq(q.field('userId'), userId))
      .first();

    if (!tasksList) {
      throw new Error(`Tasks list for user ${userId} not found`);
    }

    const updatedTasks = tasksList.tasks.filter((task) => task._id !== args.taskId);
    await ctx.db.patch(tasksList._id, { tasks: updatedTasks });
    console.log(`Task with _id ${args.taskId} deleted`);
  },
});

export const updateTask = mutation({
  args: {
    taskId: v.string(),
    body: v.optional(v.string()),
    completed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }

    console.log('Принято:', args.completed)

    const tasksList = await ctx.db
      .query('todos')
      .filter((q) => q.eq(q.field('userId'), userId))
      .first();

    if (!tasksList) {
      throw new Error(`Tasks list for user ${userId} not found`);
    }

    const updatedTasks = tasksList.tasks.map((task) => {
      if (task._id === args.taskId) {
        return {
          ...task,
          body: args.body || task.body,
          completed: args.completed !== undefined ? args.completed : task.completed, // здесь нужна проверка, т.к. false будет проигнорирован
        };
      }
      return task;
    });

    await ctx.db.patch(tasksList._id, { tasks: updatedTasks });
    console.log(`Task with _id ${args.taskId} updated`);
  }
})