/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as groupsFunctions from "../groupsFunctions.js";
import type * as http from "../http.js";
import type * as subtasksFunctions from "../subtasksFunctions.js";
import type * as tasksFunctions from "../tasksFunctions.js";
import type * as usersFunctions from "../usersFunctions.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  groupsFunctions: typeof groupsFunctions;
  http: typeof http;
  subtasksFunctions: typeof subtasksFunctions;
  tasksFunctions: typeof tasksFunctions;
  usersFunctions: typeof usersFunctions;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
