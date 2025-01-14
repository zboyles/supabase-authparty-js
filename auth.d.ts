import type { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";
import type { Database } from "./types.d.ts";
import type { GenericSchema } from "@supabase/supabase-js/npm/dist/main/lib/types"; // npm:@supabase/supabase-js@2.47.13/dist/main/lib/types
import type { FirebaseAuth } from "@firebase/auth-types";
// import type { Auth } from "firebase/auth";



/**
 * Optional function for using a third-party authentication system with
 * Supabase. The function should return an access token or ID token (JWT) by
 * obtaining it from the third-party auth client library. Note that this
 * function may be called concurrently and many times. Use memoization and
 * locking techniques if this is not supported by the client libraries.
 *
 * When set, the `auth` namespace of the Supabase client cannot be used.
 * Create another client if you wish to use Supabase Auth and third-party
 * authentications concurrently in the same application.
 */
export type AccessToken<DB extends Database = Database> = SupabaseClientOptions<keyof DB>["accessToken"];


/**
 * The props for creating a Supabase client with Firebase Auth.
 * @param props.auth The Firebase Auth client; Works with `firebase/auth` or `@firebase/auth-types`
 * @param props.accessToken The option to pass the accessToken async function which should return the
 * Firebase Auth JWT of the current user (or null if no such user) is found.
 * @param props.jwtToken The option to pass the JWT token directly.
 * @param env.supabaseUrl The Supabase URL
 * @param env.supabaseAnonKey The Supabase anonymous key
 */
export type CreateFirebaseAuthClientProps<DB extends Database = Database> = [
    props: (
      | { auth: FirebaseAuth; accessToken?: AccessToken<DB>; jwtToken?: string }
      | { auth?: FirebaseAuth; accessToken: AccessToken<DB>; jwtToken?: string }
      | { auth?: FirebaseAuth; accessToken?: AccessToken<DB>; jwtToken: string }
    ),
    env: { supabaseUrl: string; supabaseAnonKey: string }
];


/**
 * A Supabase client creation function example that maintains generic type definitions.
 * @param schemaName The schema name to use for the client
 * @returns The Supabase client complete with full type definitions
 */
type CreateClient = <
  DB extends Database = Database,
  S extends string & keyof Database = "public",
// deno-lint-ignore no-explicit-any
>(schemaName?: S) => SupabaseClient<DB, S, DB[S] extends GenericSchema ? DB[S] : any>;

