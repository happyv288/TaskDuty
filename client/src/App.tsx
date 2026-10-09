import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/CoverPage";
import MyTasks from "./pages/MyTasksPage";
import NewTask from "./pages/NewTasksPage";
import EditTask from "./pages/EditTaskPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<MyTasks />} />
          <Route path="/tasks/new" element={<NewTask />} />
          <Route path="/tasks/edit/:id" element={<EditTask />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
