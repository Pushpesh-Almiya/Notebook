const express = require("express");
const router = new express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/Getuser");

//Create a new note ......
router.post("/api/notes/createnote", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const createNote = new Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const newNote = await createNote.save();
    res.status(200).send(newNote);
    console.log("Note has been submited");
  } catch (error) {
    res.status(400).send("Some error occurs " + error);
  }
});

//Get all notes of a perticular user.....
router.get("/api/notes/getnotes", fetchUser, async (req, res) => {
  try {
    // console.log(req.user)
    const userNotes = await Notes.find({ user: req.user.id });
    if (!userNotes) {
      res.status(404).send("Didn't get the notes of this user");
    } else {
      res.status(200).json(userNotes);
      console.log(req.user.id);
    }
  } catch (error) {
    res.status(500).send("Internal server errorb " + error);
  }
});

// Update an existing note.....
router.patch("/api/notes/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const _id = req.params.id;
    const note = await Notes.findById(_id);
    console.log(note);
    if (!note) {
      return res.status(404).send(" Note Not Found");
    }
    //Allow access..
    if (note.user.toString() !== req.user.id) {
      return res
        .status(401)
        .send("You haven't access to upadate other user's note");
    }
    const updateNote = await Notes.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).json({"Successfull":"Your note has been updated successfully",updateNote});
  } catch (error) {
    res.status(500).send("Internal server errorb " + error);
  }
});

// DELETE an existing note.....
router.delete("/api/notes/deletenote/:id", fetchUser, async (req, res) => {
  try {
    const _id = req.params.id;
    let note = await Notes.findById(_id);
    //Find the note to be deleted
    if (!note) {
      return res.status(404).send(" Note Not Found");
    }
    //Allow access..
    if (note.user.toString() !== req.user.id) {
      return res
        .status(401)
        .send("You haven't access to upadate other user's note");
    }
    const deleteNote = await Notes.findByIdAndDelete(_id);
    res.status(200).json({"Success":"Note has been deleted successfully", deleteNote});
  } catch (error) {
    res.status(500).send("Internal server errorb " + error);
  }
});

module.exports = router;
