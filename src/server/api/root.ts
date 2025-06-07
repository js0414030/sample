import { chatRouter } from './routers/chat';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
    chat: chatRouter,
});

export type AppRouter = typeof appRouter; 