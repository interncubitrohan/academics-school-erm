import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Academics from "./pages/Academics/Academics";
import Rooms from "./pages/Academics/Infrastructure/Rooms/Rooms";
import Subjects from "./pages/Academics/Infrastructure/Subjects/Subjects";
import GradingSystems from "./pages/Academics/Infrastructure/Grading/GradingSystems";
import SubjectTypes from "./pages/Academics/Infrastructure/SubjectTypes/SubjectTypes";
import ClassConfiguration from "./pages/Academics/ClassConfiguration/ClassConfiguration";
import ClassDetails from "./pages/Academics/ClassConfiguration/ClassDetails";
import ExamScheduler from "./pages/Academics/Exams/ExamScheduler";
import MarksEntry from "./pages/Academics/Exams/MarksEntry";
import ExamList from "./pages/Academics/Exams/ExamList";
import ExamCreateWizard from "./pages/Academics/Exams/ExamCreateWizard";
import SubjectMappingPage from "./pages/Academics/ClassConfiguration/SubjectMappingPage";
import EvaluationFramework from "./pages/Academics/Evaluation/EvaluationFramework";

// Admissions Module
import AdmissionDashboard from "./pages/Admissions/AdmissionDashboard";
import ApplicationList from "./pages/Admissions/ApplicationList";
import ApplicationDetail from "./pages/Admissions/ApplicationDetail";
import ApplicationForm from "./pages/Admissions/ApplicationForm";

// Management Module
import FeeStructureDashboard from "./pages/Management/FeeStructure/FeeStructureDashboard";
import FeeTemplateList from "./pages/Management/FeeStructure/FeeTemplateList";
import FeeTemplateCreate from "./pages/Management/FeeStructure/FeeTemplateCreate";
import FeeTemplateDetails from "./pages/Management/FeeStructure/FeeTemplateDetails";
import FeeTemplateEdit from "./pages/Management/FeeStructure/FeeTemplateEdit";


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
                        <Route path="/academics/exams" element={<ExamList />} />
                        <Route path="/academics/exams/create" element={<ExamCreateWizard />} />
                        <Route path="/academics/classes/:classId/mapping" element={<SubjectMappingPage />} />
                        <Route path="/academics/evaluation/framework" element={<EvaluationFramework />} />

                        {/* Admissions Module */}
                        <Route path="/admissions" element={<AdmissionDashboard />} />
                        <Route path="/admissions/list" element={<ApplicationList />} />
                        <Route path="/admissions/new" element={<ApplicationForm />} />
                        <Route path="/admissions/:id" element={<ApplicationDetail />} />

                        {/* Management Module */}
                        <Route path="/management/fee-structure" element={<FeeStructureDashboard />} />
                        <Route path="/management/fee-structure/list" element={<FeeTemplateList />} />
                        <Route path="/management/fee-structure/create" element={<FeeTemplateCreate />} />
                        <Route path="/management/fee-structure/view/:id" element={<FeeTemplateDetails />} />
                        <Route path="/management/fee-structure/edit/:id" element={<FeeTemplateEdit />} />
                    </Route>

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}
