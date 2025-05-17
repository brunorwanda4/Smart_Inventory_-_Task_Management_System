import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginForm from "./components/login-form"
import Dashboard from "./pages/dashboard"

const App = () => {
  return (
    <BrowserRouter>
      <div className=" min-h-screen ">
        <Routes>
          <Route element={<LoginForm />} path="/"/>
          <Route element={<Dashboard  />} path="/dashboard"/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
