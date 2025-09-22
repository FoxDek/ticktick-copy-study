import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    
    if (userId === null) {
      return null;
    }

    return await ctx.db.get(userId);
  },
});

export const updateUser = mutation({
  args: {
    patch: v.object({
      name: v.optional(v.string()),
      email: v.optional(v.string()),
      chosenSmarts: v.optional(v.array(v.object({ name: v.string(), mode: v.number() }))),
      themeSettings: v.optional(v.object(
        {
          theme: v.optional(v.string()),
          sidebars: v.optional(v.union(v.literal("all"), v.literal("hide_note"), v.literal("hide"))),
          completedStyle: v.optional(v.union(v.literal("default"), v.literal("strikethrough")))
        }
      )),
    }),
  },
  handler: async (ctx, { patch }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const current = await ctx.db.get(userId);
    if (!current) throw new Error("User not found");

    let nextThemeSettings = current.themeSettings;
    if (patch.themeSettings !== undefined) {
      nextThemeSettings = {
        ...current.themeSettings,
        ...patch.themeSettings,
      };
    }

    await ctx.db.patch(userId, {
      ...("name" in patch ? { name: patch.name } : {}),
      ...("email" in patch ? { email: patch.email } : {}),
      ...("chosenSmarts" in patch ? { chosenSmarts: patch.chosenSmarts } : {}),
      ...("themeSettings" in patch ? { themeSettings: nextThemeSettings } : {}),
    });
    
  },
});