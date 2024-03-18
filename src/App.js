
import './App.css';
import {useState, useEffect} from 'react'
import Header from './components/Header';
import About from './pages/About';
import AddEditBlog from './pages/AddEditBlog';
import Auth from './pages/Auth';
import Detail from './pages/Detail';
import Home from './pages/Home';
import {Routes, Route, useNavigate,Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function App() {
  const [active, setActive] = useState('home')
  const [user,setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
      auth.onAuthStateChanged((authUser)=>{
        if(authUser){
          setUser(authUser)
        }else
           setUser(null)
      })
  },[])

  const handleLogout=()=>{
     signOut(auth).then(()=>{
      setUser(null)
      setActive('login')
      navigate('/auth')
     })
  }
  return (
    <div className="App">
      <Header active={active} setActive = {setActive} user={user} handleLogout={handleLogout}/>
   
       <Routes>
        <Route path='/' element={<Home user={user}/>}/>
        <Route path='/details/:id' element={<Detail setActive = {setActive}/>}/>
        <Route path='/create' element={user?.uid?<AddEditBlog user={user} setActive = {setActive}/>: <Navigate to='/'/>}/>
        <Route path='/update/:id' element={user?.uid?<AddEditBlog user={user} setActive = {setActive}/>: <Navigate to='/'/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/auth' element={<Auth setActive={setActive}/>}/>
       </Routes>
    </div>
  );
}

export default App;
