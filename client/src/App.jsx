import { BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';
import AppLayout from './components/layout/AppLayout';
import { AuthProvider } from "./context/AuthContext";
import Comments from "./pages/Comments";
// import Home from './pages/Home';
import Personal from "./pages/Personal";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/:username" element={<Personal />} />
            <Route path="/:username/:id" element={<Comments />} />
          </Routes>
        </AppLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
