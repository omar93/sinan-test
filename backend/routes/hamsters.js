const getDatabase = require("../database.js");
const firebase = getDatabase();
const hamsterValidation = require("../hamsterValidation.js");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    console.log("/hamsters Rest Api");

    const hamstersRef = firebase.collection("hamsters");
    const snapshot = await hamstersRef.get();

    if (snapshot.empty) {
        res.send([]);
        return;
    }

    let items = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id; // id behövs för POST+PUT+DELETE
        items.push(data);
    });    
    res.send(items.map((item) => ({ ...item, isClicked: false })));
});

router.get("/random", async (req, res) => {
    console.log("/hamsters Rest Api");
    const hamstersRef = firebase.collection("hamsters");
    const snapshot = await hamstersRef.get();

    if (snapshot.empty) {
        res.status(404).send("No hamster found.");
        return;
    }
    var i = 0;
    var random = Math.floor(Math.random() * snapshot.size);
    snapshot.forEach((doc) => {
        if (i === random ) {
            const data = doc.data()
            data.id = doc.id
            frontendData = data
            // data.id = doc.id; // id behövs för POST+PUT+DELETE
            res.send(data); // här får vi backend problem
        }
        i++;
    });
    
    


});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const hamstersRef = await firebase.collection("hamsters").doc(id).get();

    if (!hamstersRef.exists) {
        res.status(404).send("Hamster does not exist");
        return;
    }

    const data = hamstersRef.data();
    res.status(200).send(data);
});

router.post("/", async (req, res) => {
    const object = req.body;
    let valid = hamsterValidation.postValidHamsterObj(object);
    console.log(valid);
    if (valid !== "") {
        res.status(400).send(valid);
        return;
    }
    const docRef = await firebase.collection("hamsters").add(object);
    return res.status(200).send({ id: docRef.id });
});

router.put("/:id", async (req, res) => {
    const object = req.body;
    const id = req.params.id;
    if (
        !id ||
        !object ||
        (Object.keys(object).length === 0 && object.constructor === Object)
    ) {
        res.sendStatus(400);
        return;
    }

    let valid = hamsterValidation.putValidHamsterObj(object);
    if (valid !== "") {
        res.status(400).send(valid);
        return;
    }
    const hamstersRef = await firebase.collection("hamsters").doc(id).get();

    if (!hamstersRef.exists) {
        res.status(404).send("Hamster does not exist");
        return;
    }
    try {
        const document = firebase.collection("hamsters").doc(id);
        document.get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
                return res.status(404).send("does not exist");
            }
        });
        await document.set(object, { merge: true });
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.sendStatus(400);
        return;
    }
    const hamstersRef = await firebase.collection("hamsters").doc(id).get();

    if (!hamstersRef.exists) {
        res.status(404).send("Hamster does not exist");
        return;
    }
    const deleted = await firebase
        .collection("hamsters")
        .doc(id)
        .delete()
        .then((results) => {
            console.log(results);
            console.log("Document successfully deleted!");
            return res.status(200).send();
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
            return res.status(500).send(error);
        });
});

module.exports = router;
