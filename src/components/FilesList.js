import * as React from 'react';
import { useContext } from 'react';
import {filesize} from 'filesize';
import { GlobalContext } from './Layout';
import { useNavigate } from "react-router-dom";
import { getFile } from '../services/services'
import { useState } from 'react';
import EnhancedTable from './FilesTable';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FileViewer from 'react-file-viewer';
const CustomErrorComponent = () => {
  return <div>error</div>
}

const FilesList = () => {
  const [ open, setOpen ] = useState(false);
  const [fileURL, setFileURL] = useState(null);
  const [type, setType] = useState(null);
  const { files, updateFiles } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleDoubleClick = (clickedId) => {
    navigate(`/personal-files/${clickedId}`);
  };
  const openFile = async (row) => {

    const response = await getFile(row.id);
    setOpen(true)
    let file = new Blob(
      [response.data],
      {type: row.mimeType}
    )
    setFileURL(URL.createObjectURL(file))
    const type = row.name.split('.').at(-1);
    console.log(type)
    setType(type)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const rows = [
    ...files?.entries.map((file) => (
      { id: file.entry.id, 
        type: file.entry.isFolder ? "folder" : "file", 
        mimeType: file?.entry?.content?.mimeType,
        name: file.entry.name, 
        size: file.entry.isFolder ? "" : filesize(file.entry.content?.sizeInBytes, {base: 2, standard: 'jedec'}), 
        modified: file.entry.modifiedAt, 
        modifiedBy: file.entry.modifiedByUser.displayName, })),
  ];
  const columns = [
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'size', headerName: 'Size', width: 100 },
    { field: 'modified', headerName: 'Modified', width: 146 },
    { field: 'modifiedBy', headerName: 'Modified by', width: 100 },
  ];
  return (
    <>
      <div className="personal-files">Personal Files</div>

      <div className="files-container">
        <EnhancedTable  openFile={openFile} handleDoubleClick={handleDoubleClick}/>
       
      </div> 

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <IconButton
          // edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{position: 'absolute',right: '10px',top: '5px', zIndex: '10' }}
        >
          <CloseIcon />
        </IconButton>
        {
          (fileURL && type !== 'pdf' && type !== 'html' && type !== 'txt') && (
            <FileViewer
            fileType={type}
            filePath={fileURL}
            errorComponent={CustomErrorComponent}
            onError={() => {
              console.log('error')
            }}/>
          )
        }
        {
          (fileURL && (type === 'pdf' || type === 'html' || type === 'txt')) && (
            <iframe src={fileURL} style={{width: '100%', height: "100%"}}></iframe>
          )
        }
      </Dialog>
    </>
  )
}

export default FilesList