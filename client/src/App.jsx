import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./componets/Layout"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return <BrowserRouter>
    <Layout>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Layout>
  </BrowserRouter>
}

export default App;
