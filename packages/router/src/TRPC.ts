import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import { AppRouterContext, AppRouterContextWithSession } from './AppRouterContext.js';
import { procedureAssert } from './util/Procedure.js';

export const t = initTRPC.context<AppRouterContext>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use<AppRouterContextWithSession>(
  function isAuthed(opts) {
    procedureAssert(opts.ctx.session, 'UNAUTHORIZED')
    return opts.next(opts);
  }
)