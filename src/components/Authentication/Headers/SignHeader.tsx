import { useNavigate } from "react-router-dom";
function SignHeader()
{
    const navigate = useNavigate();
    return (
        <div id="header-container" data-testid="header-test" className="flex justify-start items-center fixed top-0 w-full bg-darkBurgundy">
            <img alt="JobLinc Logo" src="\src\assets\JobLincIcon-removebg.png"
                className="w-[60px] md:w-[90px] hover:cursor-pointer" 
                onClick={() => {navigate("/home")}}
                />
        </div>
    );
}

export default SignHeader;