import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './components/general/App';
import Home from './components/general/Home';
import Error from './components/general/Error';
import Profile from './components/profile/Profile';
import Login from './components/profile/Login';
import Register from './components/profile/Register';
import Activities from './components/fitness/activities/AllActivities';
import NewActivity from './components/fitness/activities/NewActivity';
import Routines from './components/fitness/routines/AllRoutines';
import MyRoutines from './components/fitness/routines/MyRoutines';
import DetailedRoutine from './components/fitness/routines/DetailedRoutine';
import NewRoutine from './components/fitness/routines/NewRoutine';
import EditRoutine from './components/fitness/routines/EditRoutine';
import CreatorRoutines from './components/fitness/routines/CreatorRoutines';
import FeaturedRoutines from './components/fitness/routines/FeaturedRoutines';
import AddActivity from './components/fitness/routineActivities/AddRoutineActivity';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
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
                path: "/routines/:id",
                element: <DetailedRoutine />
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