import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from "./entities/task.entity";

export let tasks: Task[] = [];
@Injectable()
export class TaskService {
    create(createTaskDto: CreateTaskDto) {
        const lengthBefore = tasks.length;
        const id = tasks.map(task => task.id).reduce((maxValue, value) => {
            if (value > maxValue) {
                return value;
            } else {
                return maxValue;
            }
        }, 0) + 1;
        const task = new Task({...createTaskDto, id});
        tasks.push(task);

        const lengthAfter = tasks.length;

        return {
            ok: lengthBefore + 1 === lengthAfter
        };
    }

    findAll() {
        return {
            tasks,
            count: tasks.length
        };
    }

    update(id: number, updateTaskDto: UpdateTaskDto) {
        let isNotFound = true;
        console.log(tasks);
        tasks.forEach(task => {
            if (task.id === id) {
                isNotFound = false;
                task.update({...task, ...updateTaskDto});
            } else {
                return task;
            }
        });

        console.log(tasks);

        return {
            ok: !isNotFound
        };
    }

    remove(id: number) {
        const lengthBefore = tasks.length;
        tasks = tasks.filter(task => task.id !== id);
        const lengthAfter = tasks.length;

        return {
            ok: lengthBefore === lengthAfter + 1
        }
    }
}
