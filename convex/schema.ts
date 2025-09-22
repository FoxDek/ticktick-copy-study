import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,

  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    chosenSmarts: v.optional(v.array(v.object({ name: v.string(), mode: v.number() }))),
    themeSettings: v.optional(v.object(
      {
        theme: v.optional(v.string()),
        sidebars: v.optional(v.union(v.literal("all"), v.literal("hide_note"), v.literal("hide"))),
        completedStyle: v.optional(v.union(v.literal("default"), v.literal("strikethrough")))
      }
    )),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),

  taskGroups: defineTable({
    name: v.string(),
    userId: v.id("users"),
    color: v.string(),
    // icon: v.union(...iconNames.map(n => v.literal(n))),
    icon: v.union(v.literal('all'), v.literal('today'), v.literal('inbox'), v.literal('plus'), v.literal('checkmarkNoBg'), v.literal('trash'), v.literal('newList')),
  }),

  tasks: defineTable({
    userId: v.id("users"),
    body: v.string(),
    completed: v.boolean(),
    dueDate: v.optional(v.string()),
    groupId: v.optional(v.union(v.id("taskGroups"), v.null())),
    description: v.optional(v.string()),
    subtasksCount: v.number(),
    priority: v.union(v.literal('common'), v.literal('low'), v.literal('medium'), v.literal('high')),
  })
    .index('by_completed', ['completed'])
    .index('by_groupId', ['groupId']),

  subtasks: defineTable({
    taskId: v.id("tasks"),
    body: v.string(),
    completed: v.boolean(),
  }),
});