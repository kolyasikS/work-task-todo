import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const exceptionResponse: any = exception.getResponse();
        const messages = {};
        if (Array.isArray(exceptionResponse.message)) {
            for (let i = 0; i < exceptionResponse.message.length; i++) {
                console.log(exceptionResponse.message[i]);
                try {
                    const message = JSON.parse(exceptionResponse.message[i]);
                    const key = Object.keys(message)[0];
                    if (!messages[key]) {
                        messages[key] = message[key];
                    }
                } catch (e) {

                }
            }
        }
        console.log(exceptionResponse);
        const filteredError = new BadRequestException(messages);
        response
            .status(status)
            .json(filteredError);
    }
}