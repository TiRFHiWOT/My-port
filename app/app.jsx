import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/app/login/page.jsx" element={<login />} />
        <Route path="/app/admin/page.jsx" element={<admin />} />
      </Routes>
    </Router>
  );
};

export default App;
