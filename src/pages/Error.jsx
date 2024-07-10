import { Link, useNavigate, useRouteError } from "react-router-dom";

// Library Imports
// import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

const Error = () => {
    const error = useRouteError();
    console.log("Error", error);
    const navigate = useNavigate();

    return (
        <div className="error">
            <h1>Uh oh! We've got a problem.</h1>
            <p>{error.message || error.statusText}</p>
            <div className="flex-md">
                <button 
                    onClick={() => navigate(-1)}
                >
                    {/* <ArrowUturnLeftIcon width={20} /> */}
                    <span>Go Back</span>
                </button>
                <Link
                    to="/"
                >
                    {/* <HomeIcon width={20} /> */}
                    <span>Go home</span>
                </Link>  
            </div>
        </div>
    )
}

export default Error;