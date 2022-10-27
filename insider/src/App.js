import './App.css';
import { Routes, Route } from 'react-router-dom' 
import GameLandingPage from './components/Game/GameLandingPage';
import SignIn from './components/Login';
import InGame from './components/InGame';
import Winner from './components/Winner';
function App() {
  return (
    <div className="App">
       <Routes>
        <Route path='/' element={< GameLandingPage />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/game/:id' element={< InGame/>} />
        <Route path='/winner' element={< Winner/>} />
      </Routes>
      
    </div>
  );
}

export default App;
