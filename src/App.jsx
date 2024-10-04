import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import SigninPage from "./pages/SigninPage.jsx";
import PersonalTaskListPage from "./pages/PersonalTaskListPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/signin" element={<SigninPage/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<PersonalTaskListPage/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App;