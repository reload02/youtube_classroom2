import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ContentBox from "./component/ContentBox";
import WatchPage from "./pages/watchPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContentBox />} />
          <Route path="/watch/" element={<WatchPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
