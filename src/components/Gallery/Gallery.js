import React, { useState, useEffect } from "react";
import "./Gallery.css";
import { Link } from "react-router-dom";

const Gallery = () => {
    const [hamsters, setHamsters] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const [hamsterGrid, setHamsterGrid] = useState([]);

    useEffect(() => {
        const getData = async () => {
            fetch("/hamsters/")
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                setHamsters(data);
                displayHamsters();
            })
            
        }
        getData()
        
    }, [trigger]);



    const deleteHamster = async (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        await fetch(`/hamsters/${id}`, requestOptions);
        setTrigger(trigger + 1);
    };

    const toggleInfo = (hamster) => {
        hamster.isClicked = !hamster.isClicked;
        displayHamsters();
    };

    const displayHamsters = () => {
        setTrigger(3)
        console.log(hamsters);
        const grid = [];
        for (let i = 0; i < hamsters.length; i++) {
            if (hamsters[i].isClicked === true) {
                grid.push(
                    <div
                        onClick={() => toggleInfo(hamsters[i])}
                        key={hamsters[i].id}
                    >
                        <figure>
                            <span className="info">
                                Favorite food: {hamsters[i].favFood}
                            </span>
                            <span className="info">
                                Loves :{hamsters[i].loves}
                            </span>
                            <span className="info">
                                Games: {hamsters[i].games}
                            </span>
                            <span className="info">
                                Wins: {hamsters[i].wins}
                            </span>
                            <span className="info">
                                Defeats: {hamsters[i].defeats}
                            </span>
                            <figcaption>{hamsters[i].name}</figcaption>
                            <a
                                className="delete"
                                onClick={() => deleteHamster(hamsters[i].id)}
                            >
                                Delete
                            </a>
                        </figure>
                    </div>
                );
            } else {
                grid.push(
                    <figure key={hamsters[i].id + " 1"}>
                        <img
                            src={require(`../../img/${hamsters[i].imgName}`)}
                            alt="hamster-pictures"
                            onClick={() => toggleInfo(hamsters[i])}
                        />
                        <figcaption>{hamsters[i].name}</figcaption>
                        <a
                            className="delete"
                            onClick={() => deleteHamster(hamsters[i].id)}
                        >
                            Delete
                        </a>
                    </figure>
                );
            }
        }
        setHamsterGrid(grid);
    };

    return (
        <>
            <Link className="addHamster" to="/newHamster">
                Add new Hamster
            </Link>
            <h1>
                You can get information about the hamster by clicking on one of
                them
            </h1>


            <div className="gallery">{hamsters && hamsterGrid}</div>
        </>
    );
};

export default Gallery;