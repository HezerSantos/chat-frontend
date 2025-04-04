import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: null,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: "/signup", 
                element: <Signup />
            },{
                path: "/dashboard",
                element: <Dashboard />
            }
        ]
    }
]

export default routes