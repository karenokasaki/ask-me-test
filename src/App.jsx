import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuestionDetail from "./pages/QuestionDetail";
import Navbar from "./components/Navbar";

function App() {
   return (
      <div className="bg-background font-mono sm:px-14 pb-7 min-h-screen">
         <Navbar />
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
         </Routes>
      </div>
   );
}

export default App;
