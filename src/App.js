import './css/reset.css';
import './css/style.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path='/login' element={<Login />} />
      <Route path='/personal-files' element={<Layout />} />
      <Route path='/personal-files/:id' element={<Layout />} />
    </Routes>
  );
}

export default App;
