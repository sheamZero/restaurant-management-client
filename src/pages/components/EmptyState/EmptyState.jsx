import { Link } from "react-router-dom";

const EmptyState = ({ title, description, icon, primaryAction, secondaryAction, }) => {
    
    return (
        <div className="bg-white rounded-2xl shadow-sm p-12 mt-6 text-center border border-slate-100">

            {icon && (
                <div className="flex justify-center mb-4 text-primary text-5xl">
                    {icon}
                </div>
            )}

            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                {title}
            </h3>

            <p className="text-slate-500 mb-6 max-w-md mx-auto">
                {description}
            </p>

            <div className="flex justify-center gap-4">

                {primaryAction && (
                    <Link to={primaryAction.to}>
                        <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition shadow-md">
                            {primaryAction.label}
                        </button>
                    </Link>
                )}

                {secondaryAction && (
                    <Link to={secondaryAction.to}>
                        <button className="border border-slate-300 px-8 py-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-100 transition">
                            {secondaryAction.label}
                        </button>
                    </Link>
                )}

            </div>
        </div>
    );
};

export default EmptyState;
