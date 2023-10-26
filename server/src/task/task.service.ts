import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from "./entities/task.entity";
import { FindTasksDto } from "./dto/find-tasks.dto";
import { OrderPriorityEnum } from "./enums/order-priority.enum";
import { statusFiltration, titleFiltration } from "./filtration/task.filtration";

export let tasks: Task[] = [
    new Task({id: 0, isDone: false, priority: 1, title: 'Todo item number 1'}),
    new Task({id: 1, isDone: true, priority: 5, title: 'Todo item number 2'}),
    new Task({id: 2, isDone: false, priority: 2, title: 'Todo item number 3'}),
    new Task({id: 3, isDone: false, priority: 4, title: 'Todo item number 4'}),
    new Task({id: 4, isDone: true, priority: 1, title: 'Todo item number 5'}),
    new Task({id: 5, isDone: false, priority: 6, title: 'Todo item number 6'}),
    new Task({id: 6, isDone: true, priority: 8, title: 'Todo item number 7'}),
    new Task({id: 7, isDone: false, priority: 3, title: 'Todo item number 8'}),
    new Task({id: 8, isDone: true, priority: 7, title: 'Todo item number 9'}),
    new Task({id: 9, isDone: true, priority: 3, title: 'Todo item number 10'}),
    new Task({id: 10, isDone: false, priority: 4, title: 'Todo item number 11'}),
    new Task({id: 11, isDone: true, priority: 1, title: 'Todo item number 12'}),
    new Task({id: 12, isDone: false, priority: 10, title: 'Todo item number 13'}),
    new Task({id: 13, isDone: true, priority: 9, title: 'Todo item number 14'}),
];
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

    find(findTasksDto: FindTasksDto) {
        const orderedTasks = !findTasksDto.orderPriority ? tasks : [...tasks].sort((prevTask,  currTask) => {
            if (findTasksDto.orderPriority === OrderPriorityEnum.ASCENDING) {
                return prevTask.priority - currTask.priority;
            } else {
                return -(prevTask.priority - currTask.priority);
            }
        });
        const filteredTasks = orderedTasks.filter(task => {
            let result = statusFiltration(task, findTasksDto.status) &&
                titleFiltration(task, findTasksDto.title);
            return result;
        })
        console.log(findTasksDto.title, filteredTasks.length)
        const pageTasks = filteredTasks.slice(+findTasksDto.offset, +findTasksDto.offset + +findTasksDto.limit);
        return {
            tasks: pageTasks,
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
