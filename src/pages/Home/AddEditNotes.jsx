import React, { useState } from "react";

import { MdClose } from "react-icons/md";
import TagInput from "../../components/input/TagInput";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  //ADD NOTE
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags
      });

      if(response.data && response.data.note){
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
       if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
       }
    }
  };

  //EDIT NOTE
  const editNote = async() => {
    const noteId = noteData._id;
    try{
      const response = await axiosInstance.put(`/edit-note/${noteId}`, {
        title,
        content,
        tags
      });
      // console.log(noteData._id);

      if(response.data && response.data.note){
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
        // console.log("The error is: ", error)
        // console.log("The Error Response is:", error.response)
        // console.log("The error data is: ", error.response.data);
        // console.log("Message: ", error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError(null);

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };
  

  return (
    <div className="relative p-4">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label" htmlFor="title">
          TITLE
        </label>
        <input
          id="title"
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Enter your Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="content">CONTENT</label>
        <textarea
          id="content"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label htmlFor="tags" className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type==="edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
