export type FindTasksDto = {
    limit: number;
    offset: number;
    title?: string;
    isDone?: boolean;
    priority?: number;
}