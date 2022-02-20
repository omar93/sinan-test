const getDatabase = require("../database.js");
const firebase = getDatabase();
const express = require("express");
const router = express.Router();


router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const matchesRef = await firebase.collection("matches").get();

    if (matchesRef.empty) {
        res.send([]);
        return;
      }
  
      let matches = [];
      matchesRef.forEach((doc) => {
        const data = doc.data();
          if (data.winnerId === id) {
            data.id = doc.id; // id behövs för POST+PUT+DELETE
            matches.push(data);
        }
       });

    if (matches.length < 1) {
      res.status(404).send(`Hamster with id: ${id} has 0 wins. `);
      return;
    }

    res.status(200).send(matches);
});


module.exports = router;