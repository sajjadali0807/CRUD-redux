import { ToastContainer } from "react-toastify";
import "./App.css";
import PrimarySearchAppBar from "./components/navbar";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <PrimarySearchAppBar />
      </Provider>
    </>
  );
}

export default App;
