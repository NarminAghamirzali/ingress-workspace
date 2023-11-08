import React, { useContext, useState} from 'react';
import { GlobalContext } from './Layout';

import { Link, useParams } from "react-router-dom";
import { uploadFileApi } from '../services/services';
import FolderIcon from '@mui/icons-material/Folder';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';

const SideNav = () => {
  const [ addNew, setAddNew ] = useState(false);
  const { setCreateFolder, uploadFile } = useContext(GlobalContext);
  const { id } = useParams();

  return (
    <aside>
      <div className="add-new">
        <button  onClick={() => setAddNew(prev => !prev)} >New</button>
      </div>
      <div className="add-new-expanded" style={addNew ? {display: "flex"} : {display: "none"}}>
        <div className="create-upload" 
        onClick={() => 
          {setCreateFolder(true)
          setAddNew(false)}
        }>Create Folder</div>
        <label htmlFor="fileUpload" className="create-upload">Upload File</label>
        <input type='file'  id="fileUpload" className="upload-file" style={{display:"none"}} onChange={(e) => uploadFile(e?.target?.files?.[0])}/>
      </div>

      <div className="sidebar-items">
        <div className="sidebar-item">
          <Link to='/personal-files' className="sidebar-link" >
            <FolderIcon/>
            <span>Personal Files</span>
          </Link>
        </div>
        <div className="sidebar-item" style={{borderBottom: "0.8px solid #dcdcdc"}}>
          <Link to='/personal-files' className="sidebar-link" >
            <LibraryBooksIcon/>
            <span>File Libraries</span>
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to='/shared' className="sidebar-link" >
            <GroupIcon/>
            <span>Shared</span>
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to='/recent-files' className="sidebar-link" >
            <AccessTimeIcon/>
            <span>Recent Files</span>
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to='/favorites' className="sidebar-link" >
            <StarIcon/>
            <span>Favorites</span>
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to='/trashcan' className="sidebar-link" >
            <DeleteIcon/>
            <span>Trash</span>
          </Link>
        </div>
      </div>      
    </aside>
  )
}

export default SideNav