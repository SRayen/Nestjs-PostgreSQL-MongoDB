import { ExecutionContext, createParamDecorator } from '@nestjs/common';

//Protocol Decorator:
export const Protocol = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.protocol;
  },
);
