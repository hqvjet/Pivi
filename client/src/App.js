import Login from "./components/Signin";
import Routes from "./routes";

<<<<<<< HEAD
const App = () => {

    return (
        <>
            <Routes/>
        </>
    );

=======
function App() {
    const [token, setToken]= useState(localStorage.getItem('user'))
    // {token !== null ? <Routers/> : <Auth/>} 


  return (
      <>
          <Routers/>
      </>
  );
>>>>>>> 0aaf0e1 (add role server)
}

export default App;
