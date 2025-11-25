import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
// import Login from './Login';
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
