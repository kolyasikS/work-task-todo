import React, {useCallback} from 'react';
import ClassicButton from "@shared/buttons/classic/ClassicButton";
import DangerButton from "@shared/buttons/danger/DangerButton";
import {EditedTask, TasksFormEditingTypes} from "./TaskEditing";
import {TaskController} from "@controllers/task.controller";


type FormSubmitProps = {
    editedTask: EditedTask,
    setIsLoading: (value: boolean) => void,
    setErrors: (value: any) => void,
    updatedSuccessfully: () => void,
    closeDialog: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const FormSubmit = ({editedTask,
                        setIsLoading,
                        setErrors,
                        closeDialog,
                        updatedSuccessfully,
                    }: FormSubmitProps) => {
    const apply = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsLoading(true)
        const submitPromise = editedTask.type === TasksFormEditingTypes.EDIT_TASK
            ? TaskController
                .update(editedTask)
            : TaskController
                .create(editedTask)

        submitPromise
            .then(res => {
            if (!res.error) {
                setErrors({});
                updatedSuccessfully();
            } else {
                setIsLoading(false);
                setErrors(res.error);
            }
        })
    }, [editedTask]);

    const remove = useCallback((e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!editedTask.id) {
            return
        }

        setIsLoading(true)
        TaskController
            .delete(editedTask.id)
            .then(res => {
                if (!res.error) {
                    setErrors({});
                    updatedSuccessfully();
                } else {
                    setIsLoading(false);
                    setErrors(res.error);
                }
            })
    }, [editedTask]);

    return (
        <>
            {editedTask.type !== TasksFormEditingTypes.CREATE_TASK && <DangerButton onClick={remove}>Delete</DangerButton>}
            <ClassicButton onClick={closeDialog}>Cancel</ClassicButton>
            <ClassicButton onClick={apply}>Save</ClassicButton>
        </>
    );
};

export default FormSubmit;