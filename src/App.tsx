import React, {useEffect} from "react";
import {useMotionAnimate, useMotionTimeline } from "motion-hooks";
import "./styles.css";
import {ReactComponent as Player} from './assets/BluePlayerNb10.svg'
import {TimelineDefinition} from "motion/types/targets/dom/timeline/types";

function App() {
    const sequence: TimelineDefinition = [
        [".player_10",
            {
                x: [0, 50, 100, 0],
                y: [0, 150, 100, 0]
            },
            {
                duration: 2,
                easing: [0.22, 0.03, 0.26, 1]
            }],
        [".player_10_2",
            {
                x: [50, 80, 120, 150],
                y: [50, 80, 120, 150]
            },
            // This will start at the same time as the x: 100 animation
            {duration: 2, at: "<"}
        ]
    ]

    const { play: playTimeline, isFinished: isFinishedTimeline, replay: replayTimeline } = useMotionTimeline(
        sequence,
        { duration: 5 },
    );

    const {play, isFinished, replay} = useMotionAnimate(
        ".player_10",
        {
            x: [0, 50, 100, 0],
            y: [0, 150, 100, 0]
        },
        {
            duration: 2,
            //offset: [0, 0.25, 0.75]
        }
    );

    // Play the animation on mount of the component
    useEffect(() => {
        playTimeline();
    }, []);

    return (
        // Replay the animation anytime by calling a function, anywhere
        <div className="App">
            <button disabled={!isFinishedTimeline} onClick={() => replayTimeline()}>
                Replay
            </button>
            <div className={'pitch'}>
                <Player className={'player_10'}/>
                <Player className={'player_10_2'}/>
            </div>
        </div>
    );
}

export default App;

