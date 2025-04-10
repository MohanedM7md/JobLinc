import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDetails } from "../store/user/userThunks";
import { sendConfirmationEmail } from "../store/user/userThunks";
import { useAppSelector } from "@store/hooks";
import { logOut } from "@store/user/userSlice";
import store from "../store/store";


function Home() {
  const user1 = useAppSelector((state) => state.user);
  console.log("User 1 print", user1);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Get user data from Redux store
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    confirmed: false,
  });

  console.log("Redux State in MainPage:", user); // Debug Redux data in component

  // Redirect to sign-in page if not logged in
  // useEffect(() => {
  //     if (!localStorage.getItem("token")) {
  //         navigate("/Signin");
  //     } else {
  //         dispatch(getUserDetails())
  //         .unwrap()
  //         .then((data) => {
  //             setUserDetails({
  //                 firstname: data.firstname,
  //                 lastname: data.lastname,
  //                 email: data.email,
  //                 confirmed: data.confirmed,
  //             });
  //             setLoading(false);
  //         })
  //         .catch((error) => {
  //             console.error("Error fetching user data: ", error);
  //             navigate("/Signin");
  //         });
  //     }
  // }, [navigate, dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("refreshToken")) {
      navigate("/");
      return;
    } else {
      dispatch(getUserDetails())
        .unwrap()
        .then((data) => {
          setUserDetails({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            confirmed: data.confirmed,
            username: data.username,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userState");
          navigate("/");
        });
    }
  }, [navigate, dispatch]);

  function ConfirmationEmail() {
    // get a token
    // send a post request to the backend to send a token

    console.log("email to confirm: " + userDetails.email);
    dispatch(sendConfirmationEmail({ email: userDetails.email }))
      .unwrap()
      .then((data) => {
        console.log("Token of confirmation: ", JSON.stringify(data));
        navigate("/confirm-email", {
          state: { email: userDetails.email, token: data.token },
        });
      });
  }

  function handleSignOut()
  {
    dispatch(logOut());
    navigate("/");
  }




  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 data-testid="welcome" className="text-2xl font-bold">
        Welcome to the Main Page
      </h1>

      {user.loggedIn ? (
        <div className="flex flex-col mt-4 p-4 border rounded-lg shadow-md">
          <p>
            <strong>First name:</strong> {userDetails.firstname}
          </p>
          <p>
            <strong>Last name:</strong> {userDetails.lastname}
          </p>
          <p>
            <strong>Username:</strong> {userDetails.username}
          </p>
          
          <Link
            className="text-[16px] text-warmBlack font-semibold hover:underline"
            to="/change-password"
          >
            Change password
          </Link>
          <Link
            className="text-[16px] text-warmBlack font-semibold hover:underline"
            to="/update-email"
          >
            Update email
          </Link>
          <Link
            className="text-[16px] text-warmBlack font-semibold hover:underline"
            to="/update-username"
          >
            Update username
          </Link>

          <span className="hover:underline hover:cursor-pointer" onClick={handleSignOut}>
            Sign out
          </span>


          {userDetails.confirmed ? (
            <p className="text-green-600">Email confirmed</p>
          ) : (
            <p className="text-red-600">Email not confirmed</p>
          )}
          {!userDetails.confirmed && (
            <p
              onClick={ConfirmationEmail}
              className="text-[16px] text-warmBlack font-semibold hover:underline hover:cursor-pointer"
            >
              Send a confirmation email
            </p>
          )}
        </div>
      ) : (
        <p>Redirecting to sign-in...</p>
      )}
    </div>
  );
}

export default Home;
