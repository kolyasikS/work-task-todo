import { CreateTaskDto } from "../dto/create-task.dto";
type CreateTask = {
    id: number,
    title: string,
    isDone: boolean,
    priority: number
}
type UpdateTask = {
    title?: string,
    isDone?: boolean,
    priority?: number
}
export class Task {
    id: number;
    title: string;
    isDone: boolean;
    priority: number;

    constructor({id, title, isDone, priority}: CreateTask) {
        this.id = id;
        this.title = title;
        this.isDone = isDone;
        this.priority = priority;
    }

    update(task: UpdateTask) {
        this.title = task.title ?? this.title;
        this.isDone = task.isDone ?? this.isDone;
        this.priority = task.priority ?? this.priority;
    }
}