export type FindTasksDto = {
    limit: number;
    offset: number;
    orderPriority?: string;
    title?: string;
    status?: string;
}