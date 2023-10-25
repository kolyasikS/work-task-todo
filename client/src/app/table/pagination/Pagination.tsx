'use client';
import React, {useCallback, useMemo} from 'react';
import styles from '../styles/pagination.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../../lib/store/slices/table.slice";
import {selectCountPages, selectPage} from "../../../lib/store/selectors/table.selectors";
import PageItem from "./PageItem";

type PaginationProps = {
    count: number,
}
const Pagination = ({count}: PaginationProps) => {
    const dispatch = useDispatch();
    const page = useSelector(selectPage);
    const countPages = useSelector(selectCountPages(count));
    const setActive = useCallback((num: number) => {
        dispatch(setPage(num));
    }, []);
    const paginationList = useMemo(() => {
        if (page < 8 && countPages < 9) {
            return <ul>
                {[...new Array(countPages)].map((item, ind) =>
                    <PageItem
                        key={ind}
                        value={ind}
                        num={ind + 1}
                        isActive={page === ind}
                        setActive={setActive}/>)}
            </ul>
        } else if (page > 5 && countPages > 8 && countPages - page > 4) {
            let ind = page - 2;
            return <ul>
                <PageItem
                    value={0}
                    num={1}
                    isActive={false}
                    setActive={setActive}
                />
                {[...new Array(7)].map((item, num, arr) =>
                    <PageItem
                        key={ind++}
                        value={ind - 1}
                        num={num === 0 || num === arr.length - 1 ? '...' : ind}
                        isActive={page === ind - 1}
                        setActive={setActive}/>
                )}
                <PageItem key={countPages}
                          value={countPages - 1}
                          num={countPages}
                          isActive={false}
                          setActive={setActive}/>
            </ul>
        } else if (page < 6 && countPages > 8) {
            return <ul>
                {[...new Array(8)].map((item, ind, arr) =>
                    <PageItem
                        key={ind}
                        num={ind === arr.length - 1 ? '...' : ind + 1}
                        isActive={page === ind}
                        value={ind}
                        setActive={setActive}/>)}
                <PageItem key={countPages}
                          num={countPages}
                          isActive={false}
                          value={countPages - 1}
                          setActive={setActive}
                />
            </ul>
        } else if (page > 5 && countPages > 8 && countPages - page < 5) {
            let ind = countPages - 7;
            return <ul>
                <PageItem key={1}
                          num={1}
                          value={0}
                          isActive={false}
                          setActive={setActive}
                />
                {[...new Array(8)].map((item, num) =>
                    <PageItem
                        key={ind++}
                        value={ind - 1}
                        num={num === 0 ? '...' : ind}
                        isActive={page === ind - 1}
                        setActive={setActive}
                    />
                )}
            </ul>
        }
    }, [page, countPages, setActive]);
    return (
        <div className={styles.pagination}>
            {paginationList}
        </div>
    );
};

export default Pagination;