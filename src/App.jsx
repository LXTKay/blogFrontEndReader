import { Outlet } from 'react-router-dom';
import './styles/App.css'

function App() {
  function goHome(){
    window.location.href = '/';
  }
  return (
    <>
      <div id='header'>
        <h1 onClick={goHome} style={{cursor: 'pointer'}}>Blog</h1>
      </div>
      <div id='body'>
        <Outlet />
      </div>
    </>
  )
}

export default App
