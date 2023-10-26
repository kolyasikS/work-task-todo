import React, {useState} from 'react';
import styles from "../styles/filters.module.scss";
import {Checkbox, Flex, Text} from "@radix-ui/themes";
import ClassicSelect from "@shared/selects/classic/ClassicSelect";

export enum FilterStatuses {
    DONE = 'done',
    IN_PROGRESS = 'in_progress',
    ALL = 'all'
}

const statuses = [
    {
        value: FilterStatuses.DONE,
        title: 'Done'
    },
    {
        value: FilterStatuses.IN_PROGRESS,
        title: 'In progress'
    },
    {
        value: FilterStatuses.ALL,
        title: 'All'
    }
]

export type FilterType = {
    status: FilterStatuses
}
type FiltersProps = {
    filters: FilterType;
    setFilters: (value: FilterType) => void;
}
const Filters = ({setFilters, filters}: FiltersProps) => {
    console.log(filters);
    return (
        <div className={styles.filters}>
            <h3 className={styles.filters__title}>Filters</h3>
            <div>
                <ClassicSelect label={'Status'}
                               placeholder={'Status'}
                               items={statuses}
                               setSelectedItem={(value) => setFilters({...filters, status: value})}
                               triggerStyle={{width: 150}}
                />
            </div>
        </div>
    );
};

export default Filters;