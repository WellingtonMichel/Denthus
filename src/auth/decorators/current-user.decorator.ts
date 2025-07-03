import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
    (data: keyof Express.Request['user'] | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const user = request.user;

        if (!user) return null;

        return data ? user[data] : user;
    },
);