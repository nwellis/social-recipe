import { TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";

export const procedureAssert = (condition: any, error: TRPCError | TRPC_ERROR_CODE_KEY) => {
  if (!condition) {
    throw typeof error === "string" ? new TRPCError({ code: error }) : error;
  }
}

export const procedureAssertDefined = <T>(value: T, error: TRPCError | TRPC_ERROR_CODE_KEY): NonNullable<T> => {
  procedureAssert(value, error);
  return value as NonNullable<T>;
}