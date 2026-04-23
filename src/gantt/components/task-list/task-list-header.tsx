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
    const height_px = String(headerHeight - 2) + "px";

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
    /*

						style={{ height: headerHeight - 2 }}
		style={{ height: headerHeight - 2, color: "red", height: "68px" }}
		style={{ height: height_px }}

                        <div
                            class={styles.ganttTable_HeaderItem}
                            style={headerItemStyle}
                        >
                            {header}
                        </div>




    */
    return (
        <div class={styles.ganttTable} style={{
            fontFamily: fontFamily,
            fontSize: fontSize
        }}>
            <div
                class={styles.ganttTable_Header}
		style={{ height: height_px }}

            >
                {headers.map((header, index) => (
                    <>
                        <div
                            class={styles.ganttTable_HeaderItem}
                            style={{ "min-width": rowWidth }}
                        >
                            {header} OK
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
