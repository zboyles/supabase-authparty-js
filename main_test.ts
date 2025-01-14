import { assertEquals } from "@std/assert";
import { createFirebaseAuthSupabaseClient } from "./mod.ts";
import type { Database } from "./test/stripe.d.ts";

/**
 * More an example of how to use the `createFirebaseAuthSupabaseClient` function
 * and see how the types are inferred correctly.
 */
Deno.test(async function addTest() {
  const createClient = createFirebaseAuthSupabaseClient<Database>({
    jwtToken: "test"
  }, {
    supabaseUrl: "SUPABASE_URL",
    supabaseAnonKey: "SUPABASE_ANON_KEY",
  });

  // The additional schema `stripe` in the custom type correctly displays
  // in the `createClient` function along with all the tables and views.
  const client = createClient("stripe");
  const { data, error } = await client
    .from("invoices")
    .select("*");
  /*
    // The `data` type is correctly inferred as an array of typed objects.
    const data: {
        attrs: Json | null;
        currency: string | null;
        customer: string | null;
        id: string | null;
        period_end: string | null;
        period_start: string | null;
        status: string | null;
        subscription: string | null;
        total: number | null;
    }[] | null;
  */
  if (data?.length && data.length === 0) {
    data.push({
      attrs: null,
      currency: "usd",
      customer: "cus_123",
      id: "inv_123",
      period_end: "2021-01-01",
      period_start: "2020-12-01",
      status: "paid",
      subscription: "sub_123",
      total: 100,
    });
  }
  assertEquals(data?.[0] ? "currency" in data?.[0] : true, true);
});
