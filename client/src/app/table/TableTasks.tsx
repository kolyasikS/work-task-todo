'use client';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles/table.module.scss';
import {Table} from "@radix-ui/themes";
import {Task} from "../../lib/entities/Task";
import {useDispatch, useSelector} from "react-redux";
import {selectPage, selectRestrictions, selectTasks} from "../../lib/store/selectors/table.selectors";
import {setTasks} from "../../lib/store/slices/table.slice";
import Loading from "@shared/animations/loading/Loading";
import TaskEditing, {EditedTask, TasksFormEditingTypes} from "./user/TaskEditing";
import * as uuid from 'uuid';
import {TaskController} from "@controllers/task.controller";

type TableTasksProps = {
    serverTasks: Task[];

}
const TableTasks = ({serverTasks}: TableTasksProps) => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks);
    const page = useSelector(selectPage);
    const {limit, offset} = useSelector(selectRestrictions);
    const [isLoading, setIsLoading] = useState(false);
    const [editingTask, setEditingTask] = useState<EditedTask | null>(null);
    useEffect(() => {
        if (!serverTasks || tasks.length) {
            setIsLoading(true);
        }
        fetchUsers();
    }, [page]);
    const fetchUsers = useCallback(() => {
        TaskController
            .find({limit, offset})
            .then(res => {
                if (!res.error) {
                    setEditingTask(null);
                    dispatch(setTasks(res.tasks))
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [limit, offset]);
    console.log(tasks);
    const renderUsers = (tasks: Task[]) => {
        const renderedUsers =  tasks.map((task: Task) =>
                <Table.Row key={task.id} className={`${styles.table__row}`}
                           onClick={() => {
                               console.log(task);
                               setEditingTask({...task})}
                }>
                    <Table.RowHeaderCell className={`${styles.table__cell} ${styles.task__title}`}>{task.title}</Table.RowHeaderCell>
                    {task.isDone
                        ? <Table.Cell className={`${styles.table__cell} ${styles.task__status} ${styles.task__done}`}>
                            Done
                        </Table.Cell>
                        : <Table.Cell className={`${styles.table__cell} ${styles.task__status} ${styles.task__processing}`}>
                            In progress
                        </Table.Cell>
                    }
                    <Table.Cell className={`${styles.table__cell} ${styles.task__priority}`}>{task.priority}</Table.Cell>
                </Table.Row>
        );
        if (renderedUsers.length < 10) {
            while (renderedUsers.length < 10) {
                renderedUsers.push(
                    <Table.Row key={uuid.v4()} className={`${styles.table__row} ${styles.empty__row}`}>
                        <Table.RowHeaderCell className={styles.table__cell}></Table.RowHeaderCell>
                        {[...new Array(2)].map(() =>
                            <Table.Cell key={uuid.v4()} className={styles.table__cell}></Table.Cell>
                        )}
                    </Table.Row>
                );
            }
        }

        return renderedUsers;
    }
    return (
        <div className={'relative'}>
            <Table.Root variant={'surface'} className={styles.table}>
                <Table.Header>
                    <Table.Row className={`${styles.table__row} ${styles.table__header}`}>
                        <Table.ColumnHeaderCell className={`${styles.table__cell} ${styles.task__title}`}>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={`${styles.table__cell} ${styles.task__status}`}>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={`${styles.table__cell} ${styles.task__priority}`}>Priority</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderUsers(tasks.length ? tasks : serverTasks)}
                    <Table.Row key={uuid.v4()}
                               className={`${styles.table__row} ${styles.table__row_create}`}
                               onClick={() => setEditingTask({
                                   type: TasksFormEditingTypes.CREATE_TASK
                               })}
                    >
                        <Table.Cell className={`${styles.table__cell} ${styles.table__cell_create}`}
                                    colSpan={5}
                        >
                            <p className={'flex items-center justify-center gap-3 text-blue-500 text-[16px]'}>New task <span className={styles.table__cell_create_plus}></span></p>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                {editingTask && <TaskEditing
                    close={() => setEditingTask(null)}
                    task={{...editingTask, type: editingTask.type ?? TasksFormEditingTypes.EDIT_TASK}}
                    updatedSuccessfully={fetchUsers}
                />}
            </Table.Root>
            <Loading isLoading={isLoading}/>
        </div>
    );
};

export default TableTasks;