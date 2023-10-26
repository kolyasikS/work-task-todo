import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    UsePipes, UseFilters, Query
} from "@nestjs/common";
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ValidationFilter } from "../exceptions/exception-filters/validation.filter";
import { FindTasksDto } from "./dto/find-tasks.dto";

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @UseFilters(ValidationFilter)
    @UsePipes(new ValidationPipe({ transform: true }))
    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }
    @Get()
    find(@Query() findTasksDto: FindTasksDto) {
        return this.taskService.find(findTasksDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(+id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.remove(+id);
    }
}
