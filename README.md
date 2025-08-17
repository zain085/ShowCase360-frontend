# Showcase360 - Frontend

🎉 Frontend for Showcase360 Expo & Event Management System

This repository contains the **React frontend** for Showcase360.\
It provides user interfaces for **Admins/Organizers, Exhibitors, and
Attendees** with role-based access.

------------------------------------------------------------------------

## 📁 Project Setup (Local)

1.  Clone the repo:

    ``` bash
    git clone <git clone https://github.com/zain085/showcase360-frontend.git>
    cd showcase360-frontend
    ```

2.  Install dependencies:

    ``` bash
    npm install
    ```

3.  Start the development server:

    ``` bash
    npm run dev
    ```

------------------------------------------------------------------------

## 📦 Frontend Dependencies

-   React\
-   React Router DOM\
-   Axios\
-   Bootstrap\
-   React Icons\
-   React Toastify

------------------------------------------------------------------------

## 📂 Project Structure

    showcase360-frontend/
    │── public/                 # Public assets
    │── src/
    │   ├── api/
    │   │   └── axiosinstance.js   # Centralized Axios API instance
    │   ├── components/            # Reusable UI components
    │   ├── pages/                 # Page-level components
    │   ├── context/               # Context API (auth, roles, etc.)
    │   ├── App.js
    │   └── index.js
    │── package.json
    │── README.md

------------------------------------------------------------------------

## 🎨 Theme & UI

-   **Dark theme with custom variables:**
    -   `--bs-bg-dark` = `#121212` → page background\
    -   `--bs-bg-secondary` = `#1e1e1e` → card/section background\
    -   Purple accent (`.btn-purple`, `.border-purple`, `.table-purple`)
        across UI
-   **Management Panels** use:
    -   Dark Bootstrap tables\
    -   Action icons for edit/delete (not dropdowns)

------------------------------------------------------------------------

## 🔑 Key Features

-   **Role-based access**: Admin/Organizer, Exhibitor, Attendee\
-   **User-friendly UI** with consistent dark theme\
-   **Axios instance** for handling all API requests\
-   **Notifications** with React Toastify\
-   **Session bookmarking** stored in `localStorage`

------------------------------------------------------------------------

## ✅ API Response Format

All requests expect responses in a consistent format:

``` json
{
  "message": "Your message",
  "success": true,
  "key": [...]
}
```

------------------------------------------------------------------------

## 🌐 Backend Connection

The backend for this project is available in a **separate repository**
(`showcase360-backend`).\
Please ensure it is running to use the frontend.
