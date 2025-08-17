import pypandoc

# The project documentation content provided by the user
text = """
EventSphere - Expo & Event Management System
============================================

📁 Project Setup (Local)
------------------------

1. Clone the repo

2. Install dependencies:
   npm install

3. Start backend:
   npm run dev

4. Start frontend:
   npm run dev


🛠️ MongoDB Connection String
-----------------------------
MONGO_URI = mongodb+srv://zainahmedkhan085:5gFKSNFjs2qKps9V@cluster0.x6odzyz.mongodb.net/Event_Sphere?retryWrites=true&w=majority&appName=Cluster0


🔐 Admin Credentials
---------------------
Username: zain766@gmail.com  
Password: zain$123


👤 Default Roles
------------------
Admin / Organizer  
Exhibitor  
Attendee


📌 Project Structure
---------------------
- Backend: `/backend`
- Frontend: `/frontend`
- API Instance: `/frontend/src/api/axiosinstance.js`


📦 Project Dependencies
------------------------
Frontend:
- React
- React Router DOM
- Axios
- Bootstrap
- React Icons
- React Toastify

Backend:
- Express
- Mongoose
- dotenv
- cors
- bcryptjs
- jsonwebtoken
- body-parser
- nodemon


✅ Notes
---------
- Role-based access system is implemented with three user types:
  • Admin / Organizer
  • Exhibitor
  • Attendee

- User Authentication:
  • Secure login and registration for all roles.
  • Role is identified during register (exhibitor, attendee).
  • Passwords are encrypted before storing in the database.
  • Forgot Password and Reset Password functionalities are implemented.

- Admin/Organizer Capabilities:
  • Manage expos: create, edit, delete with full control over title, date, location, description, and theme.
  • Assign and unassign booths to exhibitors by editing the `exhibitorId` field via update icon.
  • Manage exhibitors: view, update, and reject exhibitors using approval icons.
  • Manage sessions: add, update, and delete sessions with speaker, topic, time, and location.
  • View analytics including booth traffic, session popularity, and overall expo performance.
  • View attendee messages and feedback (read-only access).

- Exhibitor Capabilities:
  • Create and update a full profile including company name, contact info, logo, services, and document details.
  • View and manage their assigned booth information.
  • Explore session schedules and register for expos.

- Attendee Capabilities:
  • View expo info, sessions, exhibitors, and floor plans.
  • Register for sessions.
  • Bookmark sessions using persistent localStorage.
  • Submit feedback and messages directly to admin.
  • Access a clean, dark-themed homepage with event details, testimonials, and partner sections.

- UI & Theme:
  • Consistent dark mode with CSS variables:
    - `.bg-dark` = #121212 for main background
    - `.bg-dark-custom` = #1e1e1e for cards and sections
    - `.border-purple`, `.btn-purple`, `.table-purple` used across the UI
  • Management panels use **dark Bootstrap tables** with **icons** for edit and delete actions (not dropdowns).

- General Features:
  • Centralized Axios instance at `src/api/axiosinstance.js` handles all requests.
  • API responses follow a consistent format:
    {
      "message": "Your message",
      "success": true,
      "key": [...]
    }
"""

# Save as README.md using pypandoc
output_file = "/mnt/data/README.md"
pypandoc.convert_text(text, 'md', format='md', outputfile=output_file, extra_args=['--standalone'])

output_file
