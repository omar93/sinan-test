import { useState } from "react";
import "./NewHamster.css";

const NewHamster = () => {
    const [name, setName] = useState("");
    const [validName, setValidName] = useState(true);
    const [age, setAge] = useState("");
    const [validAge, setValidAge] = useState(true);
    const [favFood, setFavFood] = useState("");
    const [validFavFood, setValidFavFood] = useState(true);
    const [loves, setLoves] = useState("");
    const [validLoves, setValidLoves] = useState(true);
    const [imgName, setImgName] = useState("");
    const [validImgName, setValidImgName] = useState(true);

    const validateName = () => {
        const regex = "^[A-Za-z]*$";
        if (name === "") {
            setValidName(false);
        } else if (name.length < 3 || name.length > 10 || !name.match(regex)) {
            setValidName(false);
        } else {
            setValidName(true);
        }
    };

    const validateAge = () => {
        if (isNaN(age)) {
            setValidAge(false);
        } else if (!age || age < 1 || age > 10) {
            setValidAge(false);
        } else {
            setValidAge(true);
        }
    };

    const validateFavFood = () => {
        const regex = "^[A-Za-z]*$";
        if (favFood === "") {
            setValidFavFood(false);
        } else if (
            favFood.length < 3 ||
            favFood.length > 15 ||
            !favFood.match(regex)
        ) {
            setValidFavFood(false);
        } else {
            setValidFavFood(true);
        }
    };

    const validateLoves = () => {
        const regex = "^[A-Za-z]*$";
        if (loves === "") {
            setValidLoves(false);
        } else if (
            loves.length < 3 ||
            loves.length > 15 ||
            !loves.match(regex)
        ) {
            setValidLoves(false);
        } else {
            setValidLoves(true);
        }
    };

    const validateImgName = () => {
        if (imgName === "") {
            setValidImgName(false);
        } else {
            setValidImgName(true);
        }
    };

    const sendForm = async (e) => {
        e.preventDefault();

        if (
            validName === true &&
            validAge === true &&
            validFavFood === true &&
            validLoves === true
        ) {
            const stringfy = JSON.stringify({
                name: name,
                age: Number(age),
                favFood: favFood,
                loves: loves,
                imgName: imgName,
                wins: 0,
                defeats: 0,
                games: 0,
            });
            console.log(stringfy);
            if (name && loves && favFood && imgName && !isNaN(age)) {
                alert("Your hamster have been added!");
                await fetch(
                    "https://hamsterwars-sinan.herokuapp.com/hamsters/",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: stringfy,
                    }
                );
            }
        } else if (validName === false) {
            alert("You filled the name incorrectly");
        } else if (validAge === false) {
            alert("you filled the age incorrectly");
        } else if (validFavFood === false) {
            alert("you filled the favourite food incorrectly");
        } else if (validLoves === false) {
            alert("you filled what your hamster loves incorrectly");
        }
    };

    return (
        <>
            <div className="container-box">
                <h2>Add new Hamster</h2>
                <form>
                    <div className="user-box">
                        <input
                            type="text"
                            value={name}
                            onBlur={validateName}
                            onChange={(e) => setName(e.target.value)}
                            required={name}
                        />
                        <label>Name</label>
                        {!validName && <small>Name your hamster</small>}
                    </div>
                    <div className="user-box">
                        <input
                            type="text"
                            onBlur={validateAge}
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required=""
                        />
                        {!validAge && <small>How old are your hamster?</small>}
                        <label>Age</label>
                    </div>
                    <div className="user-box">
                        <input
                            type="text"
                            value={favFood}
                            onBlur={validateFavFood}
                            onChange={(e) => setFavFood(e.target.value)}
                            required=""
                        />
                        <label>Favorite food</label>
                        {!validFavFood && (
                            <small>What's your hamsters favourite food?</small>
                        )}
                    </div>
                    <div className="user-box">
                        <input
                            type="text"
                            value={loves}
                            onBlur={validateLoves}
                            onChange={(e) => setLoves(e.target.value)}
                            required=""
                        />
                        <label>What do your hamster love?</label>
                        {!validLoves && (
                            <small>What do your hamster love?</small>
                        )}
                    </div>
                    <div className="user-box">
                        <input
                            type="text"
                            value={imgName}
                            placeholder="Ex: hamster-5.jpg"
                            onBlur={validateImgName}
                            onChange={(e) => setImgName(e.target.value)}
                            required=""
                        />
                        <label>Hamster image</label>
                        {!validImgName && <small>Put a hamster Image</small>}
                    </div>
                    <a
                        type="submit"
                        onClick={sendForm}
                        href="#"
                        className="submit-btn"
                    >
                        Add Hamster
                    </a>
                </form>
            </div>
        </>
    );
};

export default NewHamster;
