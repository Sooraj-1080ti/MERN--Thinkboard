import mongoose from "mongoose"

// step 1- create a schema
// 2-  model based of that schema

const noteSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
},
{timestamps: true} //mongodb auto creates created time and updated time
);

const Note= mongoose.model("Note", noteSchema);

export default Note;