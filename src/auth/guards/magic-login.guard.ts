import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MagicLoginGuard extends AuthGuard('magic-login') {}
