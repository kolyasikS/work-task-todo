import { StatusesEnum } from "../enums/statuses.enum";

export class FindTasksDto {
    limit: number;
    offset: number;
    orderPriority?: string;
    title?: string;
    status?: StatusesEnum;
}
