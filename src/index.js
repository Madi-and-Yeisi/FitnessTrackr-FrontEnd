import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Homepage from './components/general/Homepage';
import ErrorPage from './components/general/ErrorPage';
import Index from './components/general/Index';
import Profile from './components/profile/Profile';
import Login from './components/profile/Login';
import Logout from './components/profile/Logout';
import Register from './components/profile/Register';
import Routines from './components/fitness/AllRoutines';
import Activities from './components/fitness/AllActivities';
import NewActivity from './components/fitness/NewActivity';
import MyRoutines from './components/fitness/MyRoutines';
import NewRoutine from './components/fitness/NewRoutine';
import EditRoutine from './components/fitness/EditRoutine';
import AddActivity from './components/fitness/AddActivity';
import CreatorRoutines from './components/fitness/CreatorRoutines';
import FeaturedRoutines from './components/fitness/FeaturedRoutines';




const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/profile/login",
                element: <Login />
            },
            {
                path: "/profile/logout",
                element: <Logout />
            },
            {
                path: "/profile/register",
                element: <Register />
            },
            {
                path: "/activities",
                element: <Activities />
            },
            {
                path: "/activities/add",
                element: <NewActivity />
            },
            {
                path: "/routines",
                element: <Routines />
            },
            {
                path: "/routines/my-routines",
                element: <MyRoutines />
            },
            {
                path: "/routines/my-routines/add",
                element: <NewRoutine />
            },
            {
                path: "/routines/my-routines/edit/:id",
                element: <EditRoutine />
            },
            {
                path: "/routines/my-routines/add-activity",
                element: <AddActivity />
            },
            {
                path: "/routines/:username",
                element: <CreatorRoutines />
            },
            {
                path: "/routines/featured/:id",
                element: <FeaturedRoutines />
            }
        ]
    }
]);

const root = createRoot( document.getElementById("app") );
root.render( <RouterProvider router={router} /> );