import $api from "../http";
import axios from "axios";
import {FindTasksDto} from "@controllers/dto/task/find-all.dto";
import {CreateTaskDto} from "@controllers/dto/task/create.dto";
import {UpdateTaskDto} from "@controllers/dto/task/update.dto";

export class TaskController {
    static async find({limit, offset}: FindTasksDto) {
        try {
            const response = await $api.get('task/',{
                params: {
                    limit,
                    offset
                },
                timeout: 5000
            });

            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.error ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }

    static async update(updateUserDto: UpdateTaskDto) {
        try {
            const id = updateUserDto.id;
            console.log(updateUserDto);
            const response = await $api.patch(`task/${id}/`,{
                ...updateUserDto
            }, {
                timeout: 5000,
            });

            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.error
                        ?? e?.response?.data
                        ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
    static async create(createUserDto: CreateTaskDto) {
        try {
            const response = await $api.post(`task/`,{
                ...createUserDto
            }, {
                timeout: 5000,
            });
            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.error
                        ?? e?.response?.data?.response
                        ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
    static async delete(id: number) {
        try {
            const response = await $api.delete(`task/${id}/`, {
                timeout: 5000,
            });
            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.error
                        ?? e?.response?.data
                        ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
}