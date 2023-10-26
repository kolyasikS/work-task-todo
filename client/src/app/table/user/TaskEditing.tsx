'use client';

import React, {useCallback, useState} from 'react';
import {Task} from "../../../lib/entities/Task";
import ClassicDialog from "@shared/dialogs/classic/ClassicDialog";
import styles from '../styles/task-editing.module.scss';
import Loading from "@shared/animations/loading/Loading";
import FormSubmit from "./FormSubmit";
import ErrorWrapper from "./ErrorWrapper";
import ClassicSelect from "@shared/selects/classic/ClassicSelect";
import {Checkbox, Flex, Text} from "@radix-ui/themes";

const priorities = [...new Array(10)].map((_, ind) => (ind + 1).toString());
export enum TasksFormEditingTypes {
    CREATE_TASK = 'create_task',
    EDIT_TASK = 'edit_task',
}

export interface EditedTask {
    id?: number;
    title?: string;
    priority?: number;
    isDone?: boolean;
    type?: TasksFormEditingTypes;
}

type UserEditingProps = {
    task: EditedTask;
    close: () => void;
    updatedSuccessfully: () => void;
}
const TaskEditing = ({task, close, updatedSuccessfully}: UserEditingProps) => {
    const [editedTask, setEditedTask] = useState(task);
    const [isLoading, setIsLoading] = useState(false);
    const setTitle    = useCallback((value: string) => {
        setEditedTask(prev => ({...prev, title: value}));
    }, []);
    const setStatus   = useCallback((value: boolean) => {
        setEditedTask(prev => ({...prev, isDone: value}));
    }, []);
    const setPriority = useCallback((value: number) => {
        setEditedTask(prev => ({...prev, priority: +value}));
    }, []);

    const cancel = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        close();
    }, []);
    const [errors, setErrors] = useState<any>({});
    return (
        <ClassicDialog onClick={close}>
            <div className={styles.rolls}>
                <div className={styles.roll__left}></div>
                <div className={styles.roll__right}></div>
            </div>
            <form className={styles.form}>
                <div className={styles.form__wrapper}>
                    <h2 className={styles.form__title}>{task.type === TasksFormEditingTypes.EDIT_TASK ? 'Editing' : 'Creating'} task</h2>
                    <div className={styles.form__inner}>
                        <ErrorWrapper
                            value={editedTask.title}
                            setValue={setTitle}
                            error={errors.title}
                            title={'Title'}
                        />
                        <div className={styles.form__block}>
                            <div className={'flex items-center justify-center gap-10 w-max'}>
                                <ErrorWrapper
                                    error={errors.priority}
                                >
                                    <ClassicSelect label={'Priority'}
                                                   placeholder={'Priority'}
                                                   items={priorities}
                                                   defaultValue={editedTask.priority?.toString()}
                                                   setSelectedItem={setPriority}
                                                   triggerStyle={{width: 120}}
                                    />
                                </ErrorWrapper>
                                <Text as={'label'} size={'3'} style={{width: '100%', maxWidth: 'fit-content'}}>
                                    <Flex gap="2">
                                        <Checkbox size="2" color={'red'} defaultChecked={task.isDone} onCheckedChange={setStatus}/> Done
                                    </Flex>
                                </Text>
                            </div>
                        </div>
                    </div>
                    <div className={styles.form__btns}>
                        <FormSubmit
                            editedTask={editedTask}
                            closeDialog={cancel}
                            setErrors={setErrors}
                            setIsLoading={setIsLoading}
                            updatedSuccessfully={updatedSuccessfully}
                        />
                    </div>
                </div>
                <Loading isLoading={isLoading}/>
            </form>
        </ClassicDialog>
    );
};

export default TaskEditing;