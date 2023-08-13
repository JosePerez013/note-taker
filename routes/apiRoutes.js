const router = require("express").Router();
const store = require("../Develop/db/store.js");

// /api/notes will get (respond with) the all notes
router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

// POST the notes to the page
router.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// DELETE a note based on the ID field (each note has unique ID) from the npm package: https://www.npmjs.com/package/uuid
router.delete("/notes/:id", (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

// Export the 'router' object from module
module.exports = router;
