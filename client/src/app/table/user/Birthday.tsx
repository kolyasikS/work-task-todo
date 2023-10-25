import React, {useCallback, useMemo} from 'react';
import ClassicSelect from "@shared/selects/classic/ClassicSelect";

const days = [...new Array(31)].map((item, ind) => {
    return {
        value: ind > 8 ? (ind + 1).toString() : '0' + (ind + 1),
        title: ind > 8 ? (ind + 1).toString() : '0' + (ind + 1)
    }
});
const months = [...new Array(12)].map((item, ind) => {
    return {
        value: ind > 8 ? (ind + 1).toString() : '0' + (ind + 1),
        title: ind > 8 ? (ind + 1).toString() : '0' + (ind + 1),
    }
});
const years = [...new Array(100)].map((item, ind) => {
    let year = 23 - ind;
    let century = 20;
    if (year < 0) {
        year = 100 + year;
        century--;
    }

    let value = year > 9 ? year.toString() : '0' + year;
    return {
        value: value,
        title: century + value,
    }
});

type BirthdayProps = {
    day: string,
    month: string,
    year: string,
    setBirthday: (value: string, typeOfDate: number) => void;
}

const Birthday = (props: BirthdayProps) => {
    const triggerSelectStyle = useMemo(() => {
        return {
            minWidth: 100
        }
    }, []);

    const setBirthday_Day = useCallback((value: string) => {
        props.setBirthday(value, 0);
    }, []);
    const setBirthday_Month = useCallback((value: string) => {
        props.setBirthday(value, 1);
    }, []);
    const setBirthday_Year = useCallback((value: string) => {
        props.setBirthday(value, 2);
    }, []);

    return (
        <div className={'flex flex-col items-center justify-center'}>
            <p className={'text-[16px] font-medium mb-2'}>Birthday</p>
            <div className={'flex gap-3'}>
                <div>
                    <ClassicSelect label={'Day'}
                                   placeholder={'Day'}
                                   items={days}
                                   defaultValue={props.day}
                                   setSelectedItem={setBirthday_Day}
                                   triggerStyle={triggerSelectStyle}
                    />
                </div>
                <ClassicSelect label={'Month'}
                               placeholder={'Month'}
                               items={months}
                               defaultValue={props.month}
                               setSelectedItem={setBirthday_Month}
                               triggerStyle={triggerSelectStyle}
                />
                <ClassicSelect label={'Year'}
                               placeholder={'Year'}
                               items={years}
                               defaultValue={props.year}
                               setSelectedItem={setBirthday_Year}
                               triggerStyle={triggerSelectStyle}
                />
            </div>
        </div>
    );
};

export default Birthday;