import './App.scss';
import Route from './Page/Route';
import { useAuth } from './context/AuthContext';
import appLoader from './assets/apploader.gif'

function App() {
  const {appLoading} = useAuth()
  return (
    <>
    {appLoading?
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'100vh'}}>

      <img src={appLoader} alt="app loader"  style={{width:'150px',height:'150px'}}/>
    </div>
    :
    <Route />
    }
    </>
  );
}

export default App;
