import { Calendar, type CalendarProps } from "../calendar/calendar";
import { Grid, type GridProps } from "../grid/grid";
import styles from "./gantt.module.css";
import { TaskGanttContent, type TaskGanttContentProps } from "./task-gantt-content";
import { createSignal, createEffect, on, onMount, onCleanup } from "solid-js";

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
//console.log("gridProps", gridProps);
//console.log("barProps", barProps);
//console.log("barProps", barProps.tasks());
     //  const _tasks = barProps.tasks()
     //  console.log(barProps.rowHeight , "OK")
     //  console.log(barProps.rowHeight , _tasks.length, "OK")

    //const ganttSVGRef = useRef<SVGSVGElement>(null);
    //const horizontalContainerRef = useRef<HTMLDivElement>(null);
    //const verticalGanttContainerRef = useRef<HTMLDivElement>(null);
    let ganttSVGRef :SVGSVGElement;
    let horizontalContainerRef :HTMLDivElement;
    let verticalGanttContainerRef :HTMLDivElement;

    let newBarProps = { ...barProps, svg: ganttSVGRef };

    const [__SVG, setSVG] = createSignal(
              { ...barProps, svg: ganttSVGRef }
    );


/*
    createEffect(on(
        () => {
            if (ganttSVGRef) {
               newBarProps = { ...barProps, svg: ganttSVGRef };
            }
        }
    ));
*/

  onMount(() =>  {
            console.log("onMount");
            //console.log("ganttSVGRef", ganttSVGRef);
            if (ganttSVGRef) {
               newBarProps = { ...barProps, svg: ganttSVGRef };
               setSVG(  <TaskGanttContent {...newBarProps()} />);
            }

    });


/*
  onMount(() =>  {
            console.log("onMount");
            //console.log("ganttSVGRef", ganttSVGRef);
            if (ganttSVGRef) {
               newBarProps = { ...barProps, svg: ganttSVGRef };
               setSVG(  
                    <Grid {...gridProps} />

	       <TaskGanttContent {...newBarProps()} />
	       );
            }

    });
*/
    createEffect(on(
        () => [scrollY()],
        () => {
            if (horizontalContainerRef) {
                horizontalContainerRef.scrollTop = scrollY();
            }
        }
    ));

    createEffect(on(
        () => [scrollX()],
        () => {
            if (verticalGanttContainerRef) {
                verticalGanttContainerRef.scrollLeft = scrollX();
            }
        }
    ));

    return (
        <div
            class={styles.ganttVerticalContainer}
            ref={verticalGanttContainerRef}
            dir="ltr"
        >
{/*
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="20" r="10" stroke="cyan" fill="none"/>
  <circle cx="50" cy="20" r="10" stroke="black" fill="none"/>
  <circle cx="70" cy="20" r="10" stroke="red" fill="none"/>
  <circle cx="40" cy="37.32" r="10" stroke="yellow" fill="none"/>
  <circle cx="60" cy="37.32" r="10" stroke="green" fill="none"/>
</svg>
*/}
{
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={gridProps.svgWidth}
                height={calendarProps.headerHeight}
                font-family={barProps.fontFamily}
            >
                <title>Gantt Chart</title>
                <Calendar {...calendarProps} />
            </svg>
}
{/*
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={gridProps.svgWidth}
                height={calendarProps.headerHeight}
                fontFamily={barProps.fontFamily}
            >
                <Calendar {...calendarProps} />
                <circle cx="30" cy="20" r="10" stroke="cyan" fill="none"/>
                <circle cx="50" cy="20" r="10" stroke="black" fill="none"/>
                <circle cx="70" cy="20" r="10" stroke="red" fill="none"/>
                <circle cx="40" cy="37.32" r="10" stroke="blue" fill="none"/>
                <circle cx="60" cy="37.32" r="10" stroke="green" fill="none"/>
            </svg>
                    height={barProps.rowHeight * barProps.tasks.length}
                    height={newBarProps.rowHeight * newBarProps.tasks().length}

                    <TaskGanttContent {...newBarProps} />
			style={
					ganttHeight
						? { height: ganttHeight, width: gridProps.svgWidth }
						: { width: gridProps.svgWidth }
				}
*/}


            <div
                ref={horizontalContainerRef}
                class={styles.horizontalContainer}
			style={
					ganttHeight
						? { height: ganttHeight+"px", width: gridProps.svgWidth+"px" }
						: { width: gridProps.svgWidth+"px" }
				}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={gridProps.svgWidth}
                    height={newBarProps.rowHeight * newBarProps.tasks().length}
                    font-family={newBarProps.fontFamily}
                    ref={ganttSVGRef}
                >

                    <title>Gantt Chart</title>
                    <Grid {...gridProps} />
		    {__SVG()}

                </svg>
            </div>

        </div>
    );
};
