# Supabase Firebase Auth Client

Create type-safe Supabase clients with **Supabase Third-Party Auth**. So far the configuration mainly supports the [Firebase Auth](https://supabase.com/docs/guides/auth/third-party/firebase-auth) integration.

## Features
- TypeScript support with full type inference
- Configurable auth methods (Firebase Auth, JWT, Access Token)  
- Database schema type safety 

## Installation
```bash
# bun
bun add @zac/supabase-authparty-js

# pnpm
pnpm add @zac/supabase-authparty-js

# npm
npm install @zac/supabase-authparty-js
```

## Usage
1. Generate your Supabase types:
```bash
supabase gen types typescript --local > types.d.ts
```

2. Create and use the client:

> You **MUST** pass **your** `Database` type to `createFirebaseAuthSupabaseClient` 

```typescript
import { createFirebaseAuthSupabaseClient } from '@zac/supabase-authparty-js';
import { Database } from './types'; // your generated types
import { getAuth } from 'firebase/auth';

// Firebase Auth client
const createClient = createFirebaseAuthSupabaseClient<Database>({
  auth: getAuth()
}, {
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY!
});

// Or with JWT token
const createClient = createFirebaseAuthSupabaseClient<Database>({
  jwtToken: await getAuth().currentUser?.getIdToken()
}, {
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY!
});

// Use client with full type inference
const supabase = createClient('public'); // or your schema name
const { data } = await supabase
  .from('your_table')
  .select('*');
// data will be fully typed based on your schema
```

## Authentication Flow
1. User signs in with Firebase Auth
2. Firebase generates JWT token
3. Token passed to Supabase for authentication
4. Supabase validates token against Firebase public keys
5. Access granted to authorized resources

## Configuration
Enable Firebase Auth in Supabase:
1. Go to Authentication > Providers
2. Enable Firebase Authentication  
3. Add Firebase project public keys
4. Configure JWT claim mappings

## API
### createFirebaseAuthSupabaseClient
```typescript
type CreateFirebaseAuthClient = <DB extends Database = Database>(
    props: (
      | { auth: FirebaseAuth; accessToken?: AccessToken<DB>; jwtToken?: string }
      | { auth?: FirebaseAuth; accessToken: AccessToken<DB>; jwtToken?: string }
      | { auth?: FirebaseAuth; accessToken?: AccessToken<DB>; jwtToken: string }
    ),
    env: { supabaseUrl: string; supabaseAnonKey: string }
) => <D extends DB = DB, S extends string & keyof DB = "public">(schemaName?: S) => SupabaseClient<D, S, D[S] extends GenericSchema ? D[S] : any>;
```

## License
MIT

## Contributing
PRs welcome!

