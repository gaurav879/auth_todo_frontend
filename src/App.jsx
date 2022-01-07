import Todo from "./Todo";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Signup from "./Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};
export default App;
