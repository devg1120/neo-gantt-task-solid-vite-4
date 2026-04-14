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

        //const scrollRef = useRef<HTMLDivElement>(null);
        let scrollRef :HTMLDivElement;

        createEffect(on(
            () => [scroll],
            () => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scroll;
                }
            }
        ));
        return (
            <div
                style={{
                    height: ganttHeight,
                    marginTop: headerHeight,
 	 	    marginLeft: rtl ? "" : "-1rem",
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
