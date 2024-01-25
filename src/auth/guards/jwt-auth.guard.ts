import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../../../interfaces/userRequest.interface';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    request.user = user;
    return user;
  }
}
