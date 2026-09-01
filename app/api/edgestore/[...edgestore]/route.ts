import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { NextRequest } from "next/server";

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket().beforeDelete(() => {
    return true;
  }),
});

const handler = async (req: NextRequest) => {
  const edgeStoreHandler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
  });
  return edgeStoreHandler(req);
};

export { handler as GET, handler as POST };

export const dynamic = "force-dynamic";

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
