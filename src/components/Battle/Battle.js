import { useState } from "react";
import "./Battle.css";
import Match from "./Match";

const Battle = () => {
    const [displayHamster, setDisplayHamster] = useState(false);
    const [changeText, setChangeText] = useState(false);
    const [trigger, setTrigger] = useState(0);

    const newMatch = () => {
        setTrigger(trigger + 1);
    };

    const reset = () => {
        newMatch();
        preBattle();
        setDisplayHamster(true);
    };

    const preBattle = () => {
        setDisplayHamster(true);
        setChangeText(true);
    };

    return (
        <>
            <div className="container">
                <main className="main-body">
                    <button onClick={reset}>
                        {changeText ? "New Match" : "Battle"}
                    </button>
                    {displayHamster ? <Match newGame={trigger} /> : null}
                </main>
            </div>
        </>
    );
};

export default Battle;
