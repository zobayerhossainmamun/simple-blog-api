import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponse = exception.getResponse();

        if (status === HttpStatus.BAD_REQUEST && Array.isArray(exceptionResponse['message'])) {
            const validationMessages = exceptionResponse['message'];

            const formattedErrors = validationMessages.map((message: any) => {
                let message_text = '';
                if (typeof message.constraints === 'object') {
                    let keys = Object.keys(message.constraints);
                    let ml = keys.length;
                    message_text = message.constraints[keys[ml - 1]];
                }

                return {
                    property: message.property,
                    message: message_text
                };
            });

            response.status(status).json({
                statusCode: status,
                errors: formattedErrors,
                message: 'Validation failed',
            });
        } else {
            response.status(status).json({
                statusCode: status,
                message: exception.message || 'Internal server error',
                errors: [],
            });
        }
    }
}