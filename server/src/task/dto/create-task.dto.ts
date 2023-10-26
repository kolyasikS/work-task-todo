import { PartialType } from "@nestjs/mapped-types";
import { Task } from "../entities/task.entity";
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { exceptionMessage } from "../../exceptions/exception.message";

export class CreateTaskDto extends PartialType(Task) {
    @IsString()
    @MinLength(1, {
        ...exceptionMessage('Title must be greater than 1 symbol', 'title')
    })
    @MaxLength(100, {
        ...exceptionMessage('Title must be less than 100 symbols', 'title')
    })
    @IsNotEmpty({
        ...exceptionMessage('Title is required', 'title')
    })
    title: string;

    @Min(1, {
        ...exceptionMessage('Priority must be between 1 and 10', 'priority')
    })
    @Max(10, {
        ...exceptionMessage('Priority must be between 1 and 10', 'priority')
    })
    @IsNumber({ }, {
        ...exceptionMessage('Priority must be a number', 'priority')
    })
    @IsNotEmpty({
        ...exceptionMessage('Priority is required', 'priority')
    })
    priority: number;

    isDone: boolean;
}
