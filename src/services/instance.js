import axios from "axios";

const instance = axios.create({
  headers: {
    // 'Accept': 'application/json',
    'Authorization': `Basic ${localStorage.getItem('token')}`
  }
});
instance.interceptors.request.use( 
  req => { 
    const token = localStorage.getItem('token'); 
 
    // req.headers["Accept"] = 'application/json'; 
    if (token) { 
      req.headers["Authorization"] = `Basic ${token}`; 
    } 
    return req; 
  }, 
  error => { 
    return Promise.reject(error); 
  }, 
);
export default instance;