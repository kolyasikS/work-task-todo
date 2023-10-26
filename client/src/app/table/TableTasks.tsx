'use client';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles/table.module.scss';
import {Table} from "@radix-ui/themes";
import {Task} from "../../lib/entities/Task";
import {useDispatch, useSelector} from "react-redux";
import {selectPage, selectRestrictions, selectTasks} from "../../lib/store/selectors/table.selectors";
import {setPage, setTasks} from "../../lib/store/slices/table.slice";
import Loading from "@shared/animations/loading/Loading";
import TaskEditing, {EditedTask, TasksFormEditingTypes} from "./user/TaskEditing";
import * as uuid from 'uuid';
import {TaskController} from "@controllers/task.controller";
import Filters, {FilterStatuses, FilterType} from "./filters/Filters";
import Searching from "./searching/Searching";
import useDebounce from "../../lib/hooks/useDebounce";

type TableTasksProps = {
    serverTasks: Task[];
}

enum OrdersPriority {
    ASCENDING = 'ascending',
    DESCENDING = 'descending'
}
const TableTasks = ({serverTasks}: TableTasksProps) => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks);
    const page = useSelector(selectPage);
    const [orderPriority, setOrderPriority] = useState<OrdersPriority>();
    const {limit, offset} = useSelector(selectRestrictions);
    const [isLoading, setIsLoading] = useState(false);
    const [editingTask, setEditingTask] = useState<EditedTask | null>(null);
    const [filters, setFilters] = useState<FilterType>({
        status: FilterStatuses.ALL
    })
    const [search, setSearch] = useState<string>('');
    const deferredSearch = useDebounce(search, 500);

    useEffect(() => {
        if (serverTasks.length && !tasks.length) {
            dispatch(setTasks(serverTasks));
            return;
        }
        setIsLoading(true);
        fetchUsers();
    }, [page, orderPriority, filters, deferredSearch]);
    const fetchUsers = useCallback(() => {
        TaskController
            .find({limit, offset, orderPriority: orderPriority, title: deferredSearch, ...filters})
            .then(res => {
                if (!res.error) {
                    setEditingTask(null);
                    dispatch(setTasks(res.tasks))
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [limit, offset, orderPriority, filters, deferredSearch]);
    const toggleOrderPriority = () => {
        dispatch(setPage(0));
        setOrderPriority(prev => {
            if (!prev || prev === OrdersPriority.DESCENDING) {
                return OrdersPriority.ASCENDING
            } else {
                return OrdersPriority.DESCENDING
            }
        })
    }
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
            <Searching search={search} setSearch={setSearch}/>
            <div className={'relative flex mt-5'}>
                <Table.Root variant={'surface'} className={styles.table}>
                        <Table.Header>
                            <Table.Row className={`${styles.table__row} ${styles.table__header}`}>
                                <Table.ColumnHeaderCell className={`${styles.table__cell} ${styles.task__title}`}>Title</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell className={`${styles.table__cell} ${styles.task__status}`}>Status</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell className={`${styles.table__cell} ${styles.task__priority}`} onClick={toggleOrderPriority}>
                                    <p>Priority</p>
                                    <span className={styles.task__priority__direct}>
                                    {!orderPriority
                                        ? <>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.6806 13.9783L15.4706 10.7683L13.5106 8.79828C12.6806 7.96828 11.3306 7.96828 10.5006 8.79828L5.32056 13.9783C4.64056 14.6583 5.13056 15.8183 6.08056 15.8183H11.6906H17.9206C18.8806 15.8183 19.3606 14.6583 18.6806 13.9783Z" fill="#fff"></path> </g></svg>
                                            <svg className={styles.task__priority__direct_bottom} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.6806 13.9783L15.4706 10.7683L13.5106 8.79828C12.6806 7.96828 11.3306 7.96828 10.5006 8.79828L5.32056 13.9783C4.64056 14.6583 5.13056 15.8183 6.08056 15.8183H11.6906H17.9206C18.8806 15.8183 19.3606 14.6583 18.6806 13.9783Z" fill="#fff"></path> </g></svg>
                                        </>
                                        : orderPriority === OrdersPriority.ASCENDING
                                            ? <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.6806 13.9783L15.4706 10.7683L13.5106 8.79828C12.6806 7.96828 11.3306 7.96828 10.5006 8.79828L5.32056 13.9783C4.64056 14.6583 5.13056 15.8183 6.08056 15.8183H11.6906H17.9206C18.8806 15.8183 19.3606 14.6583 18.6806 13.9783Z" fill="#fff"></path> </g></svg>
                                            : <svg className={styles.task__priority__direct_bottom} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.6806 13.9783L15.4706 10.7683L13.5106 8.79828C12.6806 7.96828 11.3306 7.96828 10.5006 8.79828L5.32056 13.9783C4.64056 14.6583 5.13056 15.8183 6.08056 15.8183H11.6906H17.9206C18.8806 15.8183 19.3606 14.6583 18.6806 13.9783Z" fill="#fff"></path> </g></svg>
                                    }
                                </span>
                                </Table.ColumnHeaderCell>
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
                <Filters filters={filters} setFilters={setFilters}/>
            </div>
            <Loading isLoading={isLoading}/>
        </div>
    );
};

export default TableTasks;