import { RouterProvider } from "react-router";
import "./App.css";
import router from "./routes";
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Toaster
        position="top-center"
      />
      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;
