import { createSignal, createEffect, type Component } from 'solid-js';


import styles from "./task-list-header.module.css";

export interface TaskListHeaderProps {
    headerHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    showFromTo: boolean;
}

//export const TaskListHeaderDefault: Component<TaskListHeaderProps> = ({
export const TaskListHeaderDefault: Component<TaskListHeaderProps> = ({
    headerHeight,
    fontFamily,
    fontSize,
    rowWidth,
    showFromTo,
}) => {
    const headerItemStyle = {
        minWidth: rowWidth,
    };

    const headerSeparatorStyle = {
        height: headerHeight * 0.5,
        marginTop: headerHeight * 0.2,
    };

    const headers = ["Name"];
    if (showFromTo) {
        headers.push("From", "To");
    }

    return (
        <div class={styles.ganttTable} style={{
            fontFamily: fontFamily,
            fontSize: fontSize
        }}>
            <div
                class={styles.ganttTable_Header}
						style={{ height: headerHeight - 2 }}

            >
                {headers.map((header, index) => (
                    <>
                        <div
                            class={styles.ganttTable_HeaderItem}
                            style={headerItemStyle}
                        >
                            {header}
                        </div>
                        {index < headers.length - 1 && (
                            <div
                                class={styles.ganttTable_HeaderSeparator}
                                style={headerSeparatorStyle}
                            />
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};
