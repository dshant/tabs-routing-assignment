import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { Layout } from "./components/Layout";
import Posts from "./routes/Posts";
import Users from "./routes/Users";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="posts" element={<Posts />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<div>404 Not found</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
