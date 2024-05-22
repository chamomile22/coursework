import './App.scss';
import { Fragment, useEffect } from "react";
import AppRouter from "./AppRouter.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { useStore } from "./store/store.jsx";

function App() {
  const [, setState] = useStore();
  const signedIn = JSON.parse(localStorage.getItem('signedIn'));
  
  useEffect(() => {
    if (signedIn) {
      setState(prevState => {
        return {
          ...prevState,
          user: { ...prevState.user, roleId: 1, userName: 'Admin', email: 'admin@gmail.com' }
        }
      })
    } else {
      setState(prevState => {
        return {
          ...prevState,
          user: { ...prevState.user, roleId: null, userName: '', email: '' }
        }
      })
    }
  }, []);
  
  return (
    <>
      {signedIn
        ? <div className="app__container">
          <Sidebar/>
          <main className="app__main">
            <div className="app__main-container">
              <AppRouter/>
            </div>
          </main>
        </div>
        : <AppRouter/>}
    </>
  )
}

export default App
