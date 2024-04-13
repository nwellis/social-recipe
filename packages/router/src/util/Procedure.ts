import { TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";

export const procedureAssert = (condition: any, error: TRPCError | TRPC_ERROR_CODE_KEY) => {
  if (!condition) {
    throw new TRPCError({
      code: typeof error === "string" ? error : error.code,
      message: typeof error === "string" ? undefined : error.message,
    });
  }
}