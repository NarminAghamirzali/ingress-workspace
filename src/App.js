import './css/reset.css';
import './css/style.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PersonalFiles from './components/PersonalFiles';
import Profile from './components/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path='/login' element={<Login />} />
      <Route path='/personal-files' element={<PersonalFiles />} />
      <Route path='/personal-files/:id' element={<PersonalFiles />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  );
}

export default App;
