import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./componets/Layout"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

function App() {
  return <BrowserRouter>
    <Layout>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Layout>
  </BrowserRouter>
}

export default App;
