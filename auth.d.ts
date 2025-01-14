import type { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";
import type { Database } from "./types.d.ts";
import type { GenericSchema } from "@supabase/supabase-js/npm/dist/main/lib/types"; // npm:@supabase/supabase-js@2.47.13/dist/main/lib/types
import type { FirebaseAuth } from "@firebase/auth-types";
// import type { Auth } from "firebase/auth";



export type AccessToken<DB extends Database = Database> = SupabaseClientOptions<keyof DB>["accessToken"];


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

