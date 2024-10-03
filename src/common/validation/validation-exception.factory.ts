import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
    constructor(errors: any) {
        super({ message: errors, error: 'Bad Request', statusCode: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }
}