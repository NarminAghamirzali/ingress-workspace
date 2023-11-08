import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { LineWave } from 'react-loader-spinner';
import FilesList from './FilesList';
import { getFiles } from '../services/services';
import { useParams } from 'react-router-dom';

const PersonalFiles = () => {
  const [files, setFiles] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getFiles(id || '382b3102-ffba-422e-8711-d7f330fb5468', setFiles);
  },[id]);

  return (
    <Layout>
      {
        !(Object.keys(files).length === 0) 
        ? (
          <FilesList 
              files={files}
            />
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
    </Layout>
  )
}

export default PersonalFiles