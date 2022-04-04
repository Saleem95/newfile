import Admin from './Admin';
import './App.css';
import Notifications from './Components/Notifications';
import { useState } from 'react';
function App() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)


  return (
    <>

      <Admin />
     
    </>
  )
}

export default App;