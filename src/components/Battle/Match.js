/* eslint-disable */
import { useState, useEffect } from "react";
import "./Match.css";

const Match = (trigger) => {
    console.log(trigger);
    const [hamsterUno, setHamsterUno] = useState(null);
    const [hamsterDos, setHamsterDos] = useState(null);
    const [didHamsterUnoWin, setDidHamsterUnoWin] = useState(null);
    const [clickedHamster, setClickedHamster] = useState(false);

    const fetchHamster = async () => {
        const resp = await fetch("hamsters/random");
        console.log(resp);
        const data = await resp.json();
        return data;
    };

    useEffect(() => {
        const getHamsters = async () => {
            let firstHamster = await fetchHamster();
            console.log(firstHamster);
            let secondHamster;
            let secondHamsterFound = false;
            while (!secondHamsterFound) {
                secondHamster = await fetchHamster();
                if (secondHamster.id !== firstHamster.id) {
                    secondHamsterFound = true;
                }
            }

            setHamsterUno(firstHamster);
            setHamsterDos(secondHamster);
            setClickedHamster(false);
        };
        getHamsters();
    }, [trigger]);

    const hamsterClick = (didHamsterUnoWin) => {
        setDidHamsterUnoWin(didHamsterUnoWin);

        setHamsterUno({
            age: hamsterUno.age,
            loves: hamsterUno.loves,
            title: didHamsterUnoWin ? "Winner" : "Loser",
            name: hamsterUno.name,
            imgName: hamsterUno.imgName,
            id: hamsterUno.id,
            games: hamsterUno.games + 1,
            wins: didHamsterUnoWin ? hamsterUno.wins + 1 : hamsterUno.wins,
            defeats: didHamsterUnoWin
                ? hamsterUno.defeats
                : hamsterUno.defeats + 1,
        });
        setHamsterDos({
            age: hamsterDos.age,
            loves: hamsterDos.loves,
            title: didHamsterUnoWin ? "Loser" : "Winner",
            name: hamsterDos.name,
            imgName: hamsterDos.imgName,
            id: hamsterDos.id,
            games: hamsterDos.games + 1,
            wins: didHamsterUnoWin ? hamsterDos.wins : hamsterDos.wins + 1,
            defeats: didHamsterUnoWin
                ? hamsterDos.defeats + 1
                : hamsterDos.defeats,
        });

        setClickedHamster(true);
    };

    useEffect(() => {
        if (didHamsterUnoWin != null) {
            const matchPost = async () => {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        winnerId: didHamsterUnoWin
                            ? hamsterUno?.id
                            : hamsterDos?.id,
                        loserId: didHamsterUnoWin
                            ? hamsterDos?.id
                            : hamsterUno?.id,
                    }),
                };

                await fetch(
                    "/matches/",
                    requestOptions
                );
            };

            const winnerUpdate = async () => {
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        wins: didHamsterUnoWin
                            ? hamsterUno?.wins
                            : hamsterDos?.wins,
                        games: didHamsterUnoWin
                            ? hamsterUno?.games
                            : hamsterDos?.games,
                    }),
                };

                await fetch(
                    `/hamsters/${
                        didHamsterUnoWin ? hamsterUno?.id : hamsterDos?.id
                    }`,
                    requestOptions
                );
            };

            const loserUpdate = async () => {
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        defeats: didHamsterUnoWin
                            ? hamsterDos?.defeats
                            : hamsterUno?.defeats,
                        games: didHamsterUnoWin
                            ? hamsterDos?.games
                            : hamsterUno?.games,
                    }),
                };

                await fetch(
                    `/hamsters/${
                        didHamsterUnoWin ? hamsterDos?.id : hamsterUno?.id
                    }`,
                    requestOptions
                );
            };

            matchPost();
            winnerUpdate();
            loserUpdate();
        }
    }, [didHamsterUnoWin]);

    return (
        <>
            <div className="hamster-container">
                <div className="hamster-box">
                    {hamsterUno ? (
                        <img
                            src={require(`../../img/${hamsterUno.imgName}`)}
                            alt="hamster 1"
                        />
                    ) : null}
                    <p>Name: {hamsterUno?.name}</p>
                    <p>Age: {hamsterUno?.age}</p>
                    <p>Loves: {hamsterUno?.loves}</p>
                    {clickedHamster ? (
                        <div>
                            <h3>{hamsterUno.title}</h3>
                            <h3>Wins: {hamsterUno.wins}</h3>
                            <h3>Defeats: {hamsterUno.defeats}</h3>
                            <h3>Games: {hamsterUno.games}</h3>
                        </div>
                    ) : null}
                    <span>
                        <a onClick={() => hamsterClick(true)}></a>
                    </span>
                </div>

                <div className="hamster-box">
                    {hamsterDos ? (
                        <img
                            src={require(`../../img/${hamsterDos.imgName}`)}
                            alt="hamster 2"
                        />
                    ) : null}
                    <p> Name: {hamsterDos?.name}</p>
                    <p>Age: {hamsterDos?.age}</p>
                    <p>Loves: {hamsterDos?.loves}</p>
                    {clickedHamster ? (
                        <div>
                            <h3>{hamsterDos.title}</h3>
                            <h3>Wins: {hamsterDos.wins}</h3>
                            <h3>Defeats: {hamsterDos.defeats}</h3>
                            <h3>Games: {hamsterDos.games}</h3>
                        </div>
                    ) : null}
                    <span>
                        <a onClick={() => hamsterClick(false)}></a>
                    </span>
                </div>
            </div>
        </>
    );
};

export default Match;
