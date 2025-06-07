import { initTRPC, TRPCError } from '@trpc/server';
import type { NextRequest } from 'next/server';

export type CreateContextOptions = {
    req: NextRequest;
};

export const createTRPCContext = async (opts: CreateContextOptions) => {
    // We'll handle auth in the middleware
    return {
        req: opts.req,
    };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

const isAuthed = t.middleware(async ({ ctx, next }) => {
    const token = ctx.req.cookies.get('appSession');

    if (!token) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
        ctx: {
            token: token.value,
        },
    });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed); 