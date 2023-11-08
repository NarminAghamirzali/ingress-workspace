import React, { createContext, useEffect, useState }  from 'react';
import Header from './Header';
import SideNav from './SideNav';
import { LineWave } from 'react-loader-spinner';
import FilesList from './FilesList';
import CreateFolder from './CreateFolder';
import { getFiles } from '../services/services';
import { useParams } from 'react-router-dom';
import { uploadFileApi } from '../services/services';
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext({});

const Layout = () => {
  const [ createFolder, setCreateFolder ] = useState(false);
  const [files, setFiles] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();


  const updateFiles = () => {
    getFiles(id || '382b3102-ffba-422e-8711-d7f330fb5468', setFiles);
  }
  useEffect(() => {
    updateFiles();
  },[id]);
  const uploadFile = (file) => {
    if (file) {
      const fd = new FormData();
      fd.append('filedata', file);
      fd.append('relativePath', '');
      fd.append('include', 'allowableOperations');
      fd.append('renditions', 'doclib');
      fd.append('autoRename', 'true');
      fd.append('nodeType', 'cm:content');

      const response = uploadFileApi(fd, id);
      updateFiles();
    }
    updateFiles();
  }
  return (
    <GlobalContext.Provider value={{
      files, updateFiles, createFolder, setCreateFolder, uploadFile
    }}>
      <div className='layout'>
        <Header />
        <div className="layout-container">
          <SideNav />
          <main>
          {
            !(Object.keys(files).length === 0) 
            ? (
              <FilesList />
            ) : (
              <div className="spinner">
                <LineWave
                  height="300"
                  width="300"
                  color="#3F79FF"
                  ariaLabel="line-wave"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  firstLineColor=""
                  middleLineColor=""
                  lastLineColor=""
                />
              </div>
            )
          }
          </main>
        </div>
        {createFolder && <CreateFolder
          onClose={()=>{setCreateFolder(prev => !prev)}}
        />}
      </div>
    </GlobalContext.Provider>

  )
}

export default Layout