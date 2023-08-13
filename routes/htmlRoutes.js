const path = require("path");
const router = require("express").Router();

// /notes will get (respond with) the notes.html file:
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// all other (*) routes will respond with the index.html file
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
