/*
(c) @xditya
View the license: https://github.com/xditya/WebShortener/blob/master/LICENSE
*/

import { config } from "https://deno.land/std@0.154.0/dotenv/mod.ts";
import { cleanEnv, url } from "https://deno.land/x/envalid@0.1.2/mod.ts";

await config({ export: true });

export default cleanEnv(Deno.env.toObject(), {
  MONGO_URL: url(),
});
