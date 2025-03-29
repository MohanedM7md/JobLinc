import { Link, Outlet } from "react-router-dom";

interface Navigate_ComponentProps {
    labelText: string;
    navigateTo: string;
}

function Navigate_Component(props: Navigate_ComponentProps){
    return (
        <div className="text-center">
            <Link to={props.navigateTo} className="text-warmBlack px-2 font-semibold hover:underline hover:rounded-3xl">
                {props.labelText}
            </Link>
            <Outlet />
        </div>
    );
}

export default Navigate_Component;