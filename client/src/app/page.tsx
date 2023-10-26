import React from 'react';
import styles from './table/styles/table-section.module.scss';
import TableTitle from "./table/TableTitle";
import TableTasks from "./table/TableTasks";
import Pagination from "./table/pagination/Pagination";
import Myself from "./table/myself/Myself";
import {TaskController} from "@controllers/task.controller";

async function getFirstPageOfTable() {
    const {tasks, count} = await TaskController.find({limit: 10, offset: 0});
    return {
        tasks,
        count
    };
}
const Page = async () => {
    const data = await getFirstPageOfTable();
    return (
        <section className={styles.table}>
            {data.tasks
                ? <>
                    <TableTitle/>
                    <TableTasks serverTasks={data.tasks}/>
                    <Pagination count={data.count}/>
                </>
                : <h1 className={'text-5xl font-bold text-red-700'}>No data</h1>
            }
            <Myself/>
        </section>
    );
};

export default Page;