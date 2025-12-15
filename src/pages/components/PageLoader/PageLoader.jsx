
import loader2 from "../../../assets/others/loader2.gif";

const PageLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <img src={loader2} alt="Loading..." className="w-28" />
        </div>
    );
};

export default PageLoader;