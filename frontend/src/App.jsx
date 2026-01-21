import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Academics from "./pages/Academics/Academics";
import Rooms from "./pages/Academics/Infrastructure/Rooms";
import Subjects from "./pages/Academics/Infrastructure/Subjects";
import GradingSystems from "./pages/Academics/Infrastructure/GradingSystems";
import SubjectTypes from "./pages/Academics/Infrastructure/SubjectTypes";
import ClassConfiguration from "./pages/Academics/ClassConfiguration/ClassConfiguration";
import ClassDetails from "./pages/Academics/ClassConfiguration/ClassDetails";
import ExamScheduler from "./pages/Academics/Exams/ExamScheduler";
import MarksEntry from "./pages/Academics/Exams/MarksEntry";
import ExamsResults from "./pages/Academics/Exams/ExamsResults";


export default function App() {
    return (
        <>
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Dashboard Layout */}
                    <Route element={<AppLayout />}>
                        <Route index path="/" element={<Home />} />

                        {/* User Profile */}
                        <Route path="/profile" element={<UserProfiles />} />

                        {/* Academics Module */}
                        <Route path="/academics" element={<Academics />} />
                        <Route path="/academics/infrastructure/rooms" element={<Rooms />} />
                        <Route path="/academics/infrastructure/subjects" element={<Subjects />} />
                        <Route path="/academics/infrastructure/grading" element={<GradingSystems />} />
                        <Route path="/academics/infrastructure/subject-types" element={<SubjectTypes />} />
                        <Route path="/academics/class-configuration" element={<ClassConfiguration />} />
                        <Route path="/academics/classes/:classId" element={<ClassDetails />} />
                        <Route path="/academics/exams/schedule" element={<ExamScheduler />} />
                        <Route path="/academics/exams/marks" element={<MarksEntry />} />
                        <Route path="/academics/exams" element={<ExamsResults />} />
                    </Route>

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}
