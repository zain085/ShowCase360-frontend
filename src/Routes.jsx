import {
  Route,
  Routes,
} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './Layouts/AdminLayout';
import AttendeeLayout from './Layouts/AttendeeLayout';
import ExhibitorLayout from './Layouts/ExhibitorLayout';
import AddBooth from './pages/admin/AddBooth';
import AddExpo from './pages/admin/AddExpo';
import AddSession from './pages/admin/AddSession';
import AttendeeMessages from './pages/admin/AttendeeMessages';
import BoothAllocation from './pages/admin/BoothAllocation';
import Dashboard from './pages/admin/Dashboard';
import EditBooth from './pages/admin/EditBooth';
import EditExhibitor from './pages/admin/EditExhibitor';
import EditExpo from './pages/admin/EditExpo';
import EditSession from './pages/admin/EditSession';
import FetchExhibitors from './pages/admin/FetchExhibitors';
import FetchFeedback from './pages/admin/FetchFeedback';
import FetchUsers from './pages/admin/FetchUsers';
import ManageExhibitors from './pages/admin/ManageExhibitors';
import ManageExpos from './pages/admin/ManageExpos';
import ManageSessions from './pages/admin/ManageSessions';
import Reports from './pages/admin/Reports';
import About from './pages/attendee/About';
import Bookmark from './pages/attendee/Bookmark';
import Contact from './pages/attendee/Contact';
import AttendeeExhibitors from './pages/attendee/Exhibitors';
import Expos from './pages/attendee/Expos';
import Feedback from './pages/attendee/Feedback';
import FloorPlan from './pages/attendee/FloorPlan';
import Home from './pages/attendee/Home';
import Sessions from './pages/attendee/Sessions';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Profile from './pages/auth/Profile';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import CreateProfile from './pages/exhibitor/CreateProfile';
import ExhibitorDashboard from './pages/exhibitor/Dashboard';
import EditMyBooth from './pages/exhibitor/EditMyBooth';
import ExhibitorProfile from './pages/exhibitor/ExhibitorProfile';
import Messages from './pages/exhibitor/Messages';
import MyBooth from './pages/exhibitor/MyBooth';
import ExpoRegister from './pages/exhibitor/RegisterExpos';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-expos" element={<ManageExpos />} />
          <Route path="add-expo" element={<AddExpo />} />
          <Route path="edit-expo/:expoId" element={<EditExpo />} />
          <Route path="manage-exhibitors" element={<ManageExhibitors />} />
          <Route path="edit-exhibitor/:id" element={<EditExhibitor />} />
          <Route path="manage-sessions" element={<ManageSessions />} />
          <Route path="sessions/add" element={<AddSession />} />
          <Route path="sessions/update/:id" element={<EditSession />} />
          <Route path="booth-allocation" element={<BoothAllocation />} />
          <Route path="booths/add" element={<AddBooth />} />
          <Route path="booths/edit/:id" element={<EditBooth />} />
          <Route path="reports" element={<Reports />} />
          <Route path="fetch-feedback" element={<FetchFeedback />} />
          <Route path="attendee-messages" element={<AttendeeMessages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="fetch-users" element={<FetchUsers />} />
          <Route path="fetch-exhibitors" element={<FetchExhibitors />} />
        </Route>
      </Route>

      {/* Exhibitor Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['exhibitor']} />}>
        <Route path="/exhibitor" element={<ExhibitorLayout />}>
          <Route index element={<ExhibitorDashboard />} />
          <Route path="expo-register" element={<ExpoRegister />} />
          <Route path="my-booth" element={<MyBooth />} />
          <Route path="edit-mybooth/:id" element={<EditMyBooth />} />
          <Route path="messages" element={<Messages />} />
          <Route path="exhibitor-profile" element={<ExhibitorProfile />} />
          <Route path="create-profile" element={<CreateProfile />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Attendee Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['attendee']} />}>
        <Route path="/attendee" element={<AttendeeLayout />}>
          <Route index element={<Home />} />
          <Route path="expos" element={<Expos />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="exhibitors" element={<AttendeeExhibitors />} />
          <Route path="floor-plan" element={<FloorPlan />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="bookmark" element={<Bookmark />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
