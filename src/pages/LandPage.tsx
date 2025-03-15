import { Outlet, Link } from "react-router-dom";


function LandPage()
{
    return (
        <div className="flex flex-col">
            <h1>This will be the land page insha'Allah</h1>
            <Link to="/Signup">Go to Signup Page</Link>
            <Link to="/Signin">Go to Signin Page</Link>
            <Link to="/Home">Go to Home Page</Link>
            <Link to="/MyNetwork">Go to My Network Page</Link>
            <Link to="/post">Preview a Post</Link>
            
            <Outlet />
        </div>
    );
}
export default LandPage;