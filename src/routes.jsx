import App from "./App";
const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: null,
        children: [
            {
                index: true,
                element: <></>
            },
        ]
    }
]

export default routes