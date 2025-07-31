import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,

  // todos: defineTable({
  //   tasks: v.array(v.object({
  //     _id: v.string(),
  //     body: v.string(),
  //     completed: v.boolean()
  //   })),
  //   userId: v.id("users"),
  // }),
  taskGroups: defineTable({
    name: v.string(),
    userId: v.id("users"),
    color: v.string(),
  }),

  tasks: defineTable({
    userId: v.id("users"),
    body: v.string(),
    completed: v.boolean(),
    dueDate: v.optional(v.string()),
    groupId: v.optional(v.id("taskGroups")),
  }).index('by_completed', ['completed']),
});