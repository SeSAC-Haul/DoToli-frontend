import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import SigninPage from "./pages/SigninPage.jsx";
import PersonalTaskListPage from "./pages/PersonalTaskListPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Mypage from "./pages/MyPage.jsx";
import TeamTaskListPage from "./pages/TeamTaskListPage.jsx";
import EmailVerifiedPage from './pages/EmailVerifiedPage.jsx';

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/signin" element={<SigninPage/>}/>
            <Route path="/email-verified" element={<EmailVerifiedPage/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<PersonalTaskListPage/>}/>
              <Route path="/team/:teamId" element={<TeamTaskListPage/>}/>
              <Route path="/mypage" element={<Mypage/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App;
