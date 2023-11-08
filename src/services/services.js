import instance from './instance';

export const getUser = async ( setUser) => {
  const baseURL = `https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/people/-me-`;

  try {
    const response = await instance.get(baseURL);
    return setUser({...response.data.entry}); 
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

export const getFiles = async ( folderId, setFiles) => {
  const baseURL = `https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/${folderId}/children`;

  const params = {
    orderBy: "isFolder desc,modifiedAt asc",
    include: "path,properties,allowableOperations,permissions,aspectNames,isFavorite,definition",
    includeSource: true,
  };
  try {
    const response = await instance.get(baseURL, { params });
    return setFiles(response.data.list);
  } catch (error) {
    return error
  }
};

export const createFolder = ( folderName, folderDesc, folderTitle, folderId = '382b3102-ffba-422e-8711-d7f330fb5468') => {
  const baseURL = `https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/${folderId}/children`;

  const body = {
    "nodeType": "cm:folder",
    "name": `${folderName}`,
    "properties": {
      "cm:description":`${folderDesc}`,
      "cm:title": `${folderTitle}`
    }
  }
  return instance.post(baseURL, body);
};

export const uploadFileApi = async ( fd, folderId = "382b3102-ffba-422e-8711-d7f330fb5468" ) => {
  const baseURL = `https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/${folderId}/children`;

  const params = {
    autoRename: true,
    include: 'allowableOperations'
  }
  try {
    return instance.post(baseURL, fd, {params}); 
  } catch (error) {
    console.error(error);
  }
};

// export const getFileInfo = ( id ) => {
//   const baseURL = `https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}`;

//   const params = {
//     include: 'allowableOperations'
//   };
//   try {
//     return instance.get(baseURL, { params });
//   } catch (error) {
//     console.error('Error fetching files:', error);
//   }
// };

export const getFile = ( id ) => {
  const baseURL = `https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content`;
  const params = {
    attachment: false,
    alf_ticket: localStorage.getItem("ticket"),
    "1.0": "",
  };

  try {
    return instance.get(baseURL, { responseType: 'blob' , params, headers: {
      'Accept-Encoding': 'gzip, deflate, br'
    } });
  } catch (error) {
    console.error('Error fetching files:', error);
  }
};