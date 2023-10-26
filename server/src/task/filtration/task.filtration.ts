import { Task } from "../entities/task.entity";
import { StatusesEnum } from "../enums/statuses.enum";

export function statusFiltration(task: Task, status?: StatusesEnum) {
    if (!status || status === StatusesEnum.ALL) {
        return true;
    } else if (status === StatusesEnum.DONE && task.isDone) {
        return true;
    } else if (status === StatusesEnum.IN_PROGRESS && !task.isDone) {
        return true
    }

    return false;
}

export function titleFiltration(task: Task, title?: string) {
    return task.title.startsWith(title);
}