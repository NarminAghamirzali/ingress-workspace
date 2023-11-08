import React from "react";
import { useParams } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
import { useContext } from "react";
import { GlobalContext } from "./Layout";



function DragDrop() {
  const { id } = useParams();
  const { updateFiles, uploadFile } = useContext(GlobalContext)

  const handleChange = (file) => {
    uploadFile(file);
  };
  return (
    <div className="dragdrop-wrapper">
      <FileUploader handleChange={handleChange} name="file"/>
    </div>
  );
}

export default DragDrop;