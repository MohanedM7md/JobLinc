import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();

    // Get user data from Redux store
    const user = useSelector((state: RootState) => state.user);
    
    console.log("Redux State in MainPage:", user); // Debug Redux data in component

    // Redirect to sign-in page if not logged in
    useEffect(() => {
        setTimeout(() => {
            if (!user.loggedIn) {
                navigate("/Signin");
            }
        }, 1000)
        
    }, [user.loggedIn, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 data-testid="welcome" className="text-2xl font-bold">Welcome to the Main Page</h1>

            {user.loggedIn ? (
                <div className="mt-4 p-4 border rounded-lg shadow-md">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <Link className="text-[16px] text-warmBlack font-semibold hover:underline" to="/ChangePassword">Change password</Link>
                </div>
            ) : (
                <p>Redirecting to sign-in...</p>
            )}
        </div>
    );
}

export default MainPage;
