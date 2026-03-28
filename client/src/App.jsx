import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompA from "./components/Common/CompA";
import CompB from "./components/Common/CompB";
import Header from "./components/Layout/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CompA />} />
        <Route path="/comp" element={<CompB />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
