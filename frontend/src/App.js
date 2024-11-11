import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Timetable from "./pages/TimeTable";
import MyPage from "./pages/MyPage";
import GlobalStyles from "./styles/GlobalStyles";
import CustomTimetable from "./pages/CustomTimetable";
function App() {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="" element={<Main />} />
                <Route path="/custom" element={<CustomTimetable />} />
                <Route path="/" element={<Root />}>
                    <Route path="timetable" element={<Timetable />} />
                    <Route path="mypage" element={<MyPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
