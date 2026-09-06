import React from 'react';
import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import { AuthLayout , Login} from './components/index.js'
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup';
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
// Provider The application's entry point.
//  It mounts <App /> into the DOM, and wraps it in Redux's <Provider> 
// so that every component in the tree — no matter how deeply nested — can access the store 
// via useSelector/useDispatch without prop-drilling.



// 1. Browser loads → main.jsx runs
//         │
//         ▼
//    Wraps <App /> in Redux <Provider store={store}>
//         │
//         ▼
// 2. App.jsx mounts
//         │
//         ▼
//    Calls AuthService → asks Appwrite: "is there an active session?"
//         │
//         ├── Yes → dispatch login(userData) into Redux
//         └── No  → dispatch logout() into Redux
//         │
//         ▼
// 3. Redux store now holds current auth state: { status, userData }
//         │
//         ▼
// 4. Header.jsx reads that state via useSelector
//         │
//         ▼
//    Decides which nav links to show:
//    logged out → Login / Signup
//    logged in  → All Posts / Add Post / Logout
//         │
//         ▼
// 5. User clicks a nav link → React Router navigates
//    (e.g. to a Login page, which will use AuthService.Login()
//     and dispatch(login()) again on success)
//         │
//         ▼
// 6. On any content page (Home, All Posts, Add Post, Post detail):
//    component calls service.* methods (getAllPosts, createPost,
//    uploadFile, etc.) directly — these talk to Appwrite's
//    Database and Storage independently of the auth flow
//         │
//         ▼
// 7. LogoutBtn, when clicked, calls AuthService to end the
//    Appwrite session, then dispatches logout() so Redux and
//    the actual backend session stay in sync