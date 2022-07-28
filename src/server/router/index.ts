// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { organizationsRouter } from "./organizations";
import { contactRouter } from "./contacts";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", authRouter)
  .merge("organizations.", organizationsRouter)
  .merge("contacts.", contactRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
