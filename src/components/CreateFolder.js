import React, { useContext, useState } from 'react';
import { createFolder } from '../services/services';
import { GlobalContext } from './Layout';
import { useParams } from 'react-router-dom';

const CreateFolder = () => {
  const [ folderName, setFolderName] = useState("");
  const [ folderTitle, setFolderTitle] = useState("");
  const [ folderDesc, setFolderDesc] = useState("");
  const { updateFiles, setCreateFolder } = useContext(GlobalContext);
  const {id} = useParams();

  const handleCreateFolder = async () => {
    const response = await createFolder( folderName, folderDesc, folderTitle, id);
    console.log(response)
    if (response) {
      updateFiles();
    }
    setCreateFolder(false);
  }

  return (
    <div className='create-folder-container'>
      <div className="create-folder">
        <h3>Create New Folder</h3>
        <div className="create-folder-form">
          <input 
            type="text" 
            placeholder='Name'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            // style={(folderName === "") ? { borderBottom: "#3F79FF"} : '' }
          />
          <input 
            type="text" 
            placeholder='Title'
            value={folderTitle}
            onChange={(e) => setFolderTitle(e.target.value)}
          />
          <textarea name="desc" id="" cols="30" rows="10" placeholder='Description'
            value={folderDesc}
            onChange={(e) => setFolderDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="buttons">
            <button className="cancel-btn"
               onClick={() => setCreateFolder(false)}
            >CANCEL</button>
            <button 
              className="create-btn"  
              disabled={(folderName === "")} 
              onClick={() => handleCreateFolder()}
              style={(folderName === "") ? { color: "grey"} : { color: "black"} }
            >CREATE</button>
        </div>
      </div>
    </div>
  )
}

export default CreateFolder