import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
            }
        ]
    }
]

export default routes