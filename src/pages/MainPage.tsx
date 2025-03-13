// This page is just a simulation of when the user signs up or signs in.
// The user will be redirected to this page upon successful authentication
import { useLocation } from "react-router-dom";

function MainPage()
{
    const location = useLocation();
    const userData = location.state || {}; // Get the passed state

    return (
        <div>
            <h1>Welcome, {userData.email}!</h1>
            <p>Your email: {userData.password}</p>
        </div>
    );
}

export default MainPage;