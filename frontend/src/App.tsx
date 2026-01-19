import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Academics from "./pages/Academics/Academics";
import Rooms from "./pages/Academics/Infrastructure/Rooms";
import Subjects from "./pages/Academics/Infrastructure/Subjects";
import GradingSystems from "./pages/Academics/Infrastructure/GradingSystems";
import ClassConfiguration from "./pages/Academics/ClassConfiguration/ClassConfiguration";
import ClassDetails from "./pages/Academics/ClassConfiguration/ClassDetails";
import ExamScheduler from "./pages/Academics/Exams/ExamScheduler";
import MarksEntry from "./pages/Academics/Exams/MarksEntry"; // Import
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

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Academics Module */}
            <Route path="/academics" element={<Academics />} />
            <Route path="/academics/infrastructure/rooms" element={<Rooms />} />
            <Route path="/academics/infrastructure/subjects" element={<Subjects />} />
            <Route path="/academics/infrastructure/grading" element={<GradingSystems />} />
            <Route path="/academics/class-configuration" element={<ClassConfiguration />} />
            <Route path="/academics/classes/:classId" element={<ClassDetails />} />
            <Route path="/academics/exams/schedule" element={<ExamScheduler />} />
            <Route path="/academics/exams/marks" element={<MarksEntry />} />
            <Route path="/academics/exams" element={<ExamsResults />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
