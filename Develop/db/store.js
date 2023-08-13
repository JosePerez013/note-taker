const fs = require("fs");
const util = require("util");

const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// store class for methods to read and wrote notes into JSON file

class Store {
  //read the note
  read() {
    return readFileAsync("Develop/db/db.json", "utf8");
  }
  //write the note
  write(note) {
    return writeFileAsync("Develop/db/db.json", JSON.stringify(note));
  }
  //retrieve the notes
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      // send back a new empty array uf note cant be turned into one
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  // add the note
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Title / Text fields can not be blank");
    }

    // use package to create unique ID
    const newNote = { title, text, id: uuidv4() };

    // grab all new notes, previous notes and return
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  // to delete a note using the ID
  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((keepNotes) => this.write(keepNotes));
  }
}

// xxport Store module
module.exports = new Store();
