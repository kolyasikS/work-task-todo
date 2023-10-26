'use client';
import React, {memo} from 'react';
import {Select, Theme} from "@radix-ui/themes";
import styles from './classic-select.module.scss';
type ClassicSelectProps = {
    placeholder: string,
    label: string,
    defaultValue?: any,
    items: any[],
    setSelectedItem: (value: any) => void;
    triggerStyle?: any;
}
const ClassicSelect = memo(({
                                placeholder,
                                label,
                                defaultValue,
                                items,
                                setSelectedItem,
                                triggerStyle
                            }: ClassicSelectProps) => {
    return (
        <div className={styles.select}>
            <Select.Root defaultValue={defaultValue ?? undefined}
                         onValueChange={(value) => setSelectedItem(value)}
                         size={'3'}
            >
                <Select.Trigger
                    className={styles.select__trigger}
                    placeholder={placeholder}
                    style={triggerStyle}
                />
                <Select.Content
                    position="popper"
                    color={'cyan'}
                >
                    <Select.Group>
                        <Select.Label>{label}</Select.Label>
                        {items.length && items.map((item, ind) =>
                            <Select.Item key={ind}
                                         value={item.value ?? item}
                                         style={{cursor: 'pointer'}}
                            >
                                {item.title ?? item}
                            </Select.Item>
                        )}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </div>
    );
});

ClassicSelect.displayName = 'ClassicSelect';
export default ClassicSelect;