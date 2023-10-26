import React from 'react';
import ClassicInput from "@shared/inputs/classic/ClassicInput";

type SearchingProps = {
    search: string,
    setSearch: (value: string) => void;
}
const Searching = ({search, setSearch}: SearchingProps) => {
    return (
        <div>
            <ClassicInput value={search} setValue={setSearch} placeholder={'Search task by title'}></ClassicInput>
        </div>
    );
};

export default Searching;