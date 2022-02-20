import { useState, useEffect } from "react";
import StartPage from "./StartPage";
import StartPageError from "./StartPageError";
import "./Start.css";

function Start() {
    const [hamsters, setHamsters] = useState(null);

    useEffect(() => {
        const reachServer = async () => {
            try {
                const response = await fetch(
                    "https://hamsterwars-sinan.herokuapp.com/hamsters/"
                );
                const data = await response.json();
                setHamsters(data);
            } catch (error) {
                <h2>
                    Sorry, the server can't be reached right now. Try to reload
                    the page or try again later
                </h2>;
            }
        };
        reachServer();
    }, []);

    return <>{hamsters ? <StartPage /> : <StartPageError />}</>;
}

export default Start;
