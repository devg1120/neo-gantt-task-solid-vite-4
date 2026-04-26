import styles from "./vertical-scroll.module.css";
import { createEffect, on } from "solid-js";
import type { Component } from 'solid-js';

export const VerticalScroll: Component<{
    scroll: number;
    ganttHeight: number;
    ganttFullHeight: number;
    headerHeight: number;
    rtl: boolean;
    onScroll: (event: SyntheticEvent) => void;
}> = ({
    scroll,
    ganttHeight,
    ganttFullHeight,
    headerHeight,
    rtl,
    onScroll,
}) => {
      //console.log("vs", ganttHeight, ganttFullHeight, headerHeight);
        //const scrollRef = useRef<HTMLDivElement>(null);
        let scrollRef :HTMLDivElement;

        createEffect(on(
            () => [scroll],
            () => {
                if (scrollRef) {
                    scrollRef.scrollTop = scroll;
                }
            }
        ));
/*
                style={{
                    "height": ganttHeight + "px",
                    "marginTop": headerHeight +"px",
 	 	    "marginLeft": rtl ? "" : "-1rem",
                    "margin-top": headerHeight +"px",
 	 	    "margin-left": rtl ? "" : "-1rem",
                }}


*/
 
        return (
            <div
                style={{
                    "height": ganttHeight + "px",
                    "margin-top": headerHeight +"px",
 	 	    "margin-left": rtl ? "" : "-1rem",
                }}
                class={styles.scroll}
                onScroll={onScroll}
                ref={scrollRef}
            >
                <div style={{
                    "height": ganttFullHeight + "px",
                    "width": "1px"
                }} />
            </div>
        );

{/*
        return (
            <div
                style={{
                    height: ganttHeight,
                    marginTop: headerHeight,
                    get marginLeft() { return rtl ? "" : "-1rem" }
                }}
                class={styles.scroll}
                onScroll={onScroll}
                ref={scrollRef}
            >
                <div style={{
                    height: ganttFullHeight,
                    width: 1
                }} />
            </div>
        );
	*/}
    };
