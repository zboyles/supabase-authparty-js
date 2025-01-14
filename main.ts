import { createClient as _createClient } from "@supabase/supabase-js";
import type {
  SupabaseClientOptions,
} from "@supabase/supabase-js";
import type {
  CreateFirebaseAuthClientProps,
} from "./auth.d.ts";
import type {
  Database,
} from "./types.d.ts";

export const createFirebaseAuthSupabaseClient = <D extends Database = Database>(
    ...args: CreateFirebaseAuthClientProps<D>
) => {
    const [{auth, accessToken, jwtToken}, {supabaseUrl, supabaseAnonKey}] = args;
    
  const createClient = <
      DB extends D = D,
      S extends string & keyof D = "public",
  >(
      schemaName: S = "public" as S,
  ) => {
      if (!auth && !accessToken && !jwtToken) throw new Error("No auth, accessToken, or jwtToken provided");

      const options: SupabaseClientOptions<S> = { db: { schema: schemaName } };
      if (auth || accessToken) {
          options.accessToken = accessToken ??  (async () => ((await auth?.currentUser?.getIdToken(false)) ?? null) as string);
      } else if (jwtToken) {
          options.global = {
          headers: { Authorization: `Bearer ${jwtToken}` },
          };
      } else console.warn("No JWT token provided, this will probably fail.");
    
      return _createClient<DB, S>(supabaseUrl, supabaseAnonKey, options);
  };
  return createClient;
}

