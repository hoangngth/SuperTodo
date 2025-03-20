import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionException extends HttpException {
  constructor() {
    super('No Permission', HttpStatus.FORBIDDEN);
  }
}