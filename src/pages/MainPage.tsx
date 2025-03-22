import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDetails } from "../store/userSlice";
// import api from "../services/api/api";

function MainPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // Get user data from Redux store
    const user = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState(true);

    console.log("Redux State in MainPage:", user); // Debug Redux data in component

    // Redirect to sign-in page if not logged in
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/Signin");
        } else {
            dispatch(getUserDetails())
            .unwrap()
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching user data: ", error);
                navigate("/Signin");
            });
        }
    }, [navigate, dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 data-testid="welcome" className="text-2xl font-bold">Welcome to the Main Page</h1>

            {localStorage.getItem("token") ? (
                <div className="flex flex-col mt-4 p-4 border rounded-lg shadow-md">
                    <p><strong>First name:</strong> {user.firstname}</p>
                    <p><strong>Last name:</strong> {user.lastname}</p>

                    <Link className="text-[16px] text-warmBlack font-semibold hover:underline" to="/ChangePassword">Change password</Link>
                    <Link className="text-[16px] text-warmBlack font-semibold hover:underline" to="/UpdateEmail">Update email</Link>
                    <Link className="text-[16px] text-warmBlack font-semibold hover:underline" to="/UpdateUsername">Update username</Link>
                </div>
            ) : (
                <p>Redirecting to sign-in...</p>
            )}
        </div>
    );
}

export default MainPage;