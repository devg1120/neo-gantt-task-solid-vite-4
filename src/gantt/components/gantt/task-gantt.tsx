import { Calendar, type CalendarProps } from "../calendar/calendar";
import { Grid, type GridProps } from "../grid/grid";
import styles from "./gantt.module.css";
import { TaskGanttContent, type TaskGanttContentProps } from "./task-gantt-content";
import { createEffect, on } from "solid-js";

export type TaskGanttProps = {
    gridProps: GridProps;
    calendarProps: CalendarProps;
    barProps: TaskGanttContentProps;
    ganttHeight: number;
    scrollY: number;
    scrollX: number;
};

export const TaskGantt: Component<TaskGanttProps> = ({
    gridProps,
    calendarProps,
    barProps,
    ganttHeight,
    scrollY,
    scrollX,
}) => {
    //const ganttSVGRef = useRef<SVGSVGElement>(null);
    //const horizontalContainerRef = useRef<HTMLDivElement>(null);
    //const verticalGanttContainerRef = useRef<HTMLDivElement>(null);
    let ganttSVGRef :SVGSVGElement;
    let horizontalContainerRef :HTMLDivElement;
    let verticalGanttContainerRef :HTMLDivElement;

    const newBarProps = { ...barProps, svg: ganttSVGRef };

    createEffect(on(
        () => [scrollY],
        () => {
            if (horizontalContainerRef.current) {
                horizontalContainerRef.current.scrollTop = scrollY;
            }
        }
    ));

    createEffect(on(
        () => [scrollX],
        () => {
            if (verticalGanttContainerRef.current) {
                verticalGanttContainerRef.current.scrollLeft = scrollX;
            }
        }
    ));

    return (
        <div
            class={styles.ganttVerticalContainer}
            ref={verticalGanttContainerRef}
            dir="ltr"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={gridProps.svgWidth}
                height={calendarProps.headerHeight}
                fontFamily={barProps.fontFamily}
            >
                <title>Gantt Chart</title>
                <Calendar {...calendarProps} />
            </svg>
            <div
                ref={horizontalContainerRef}
                class={styles.horizontalContainer}
                style={
                    ganttHeight
                        ? {
                            height: ganttHeight,
                            get width() { return gridProps.svgWidth }
                        }
                        : { get width() { return gridProps.svgWidth } }
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={gridProps.svgWidth}
                    height={barProps.rowHeight * barProps.tasks.length}
                    fontFamily={barProps.fontFamily}
                    ref={ganttSVGRef}
                >
                    <title>Gantt Chart</title>
                    <Grid {...gridProps} />
                    <TaskGanttContent {...newBarProps} />
                </svg>
            </div>
        </div>
    );
};
