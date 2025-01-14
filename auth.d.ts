
import { SupabaseClient } from "@supabase/supabase-js";
import type { SupabaseClientOptions } from "@supabase/supabase-js";
import type { Database } from "./types.d.ts";
import type {
  GenericSchema,
} from "https://raw.githubusercontent.com/supabase/supabase-js/master/src/lib/types.ts";

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
>(schemaName?: S) => SupabaseClient<DB, S, DB[S] extends GenericSchema ? DB[S] : any>;

