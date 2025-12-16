import PageLoader from "../PageLoader/PageLoader";


const DataTable = ({ title, len, columns, isLoading, children }) => {

    if (isLoading) {
        return <PageLoader></PageLoader>
    }
    return (
        <div className="overflow-x-auto bg-white mx-auto p-8 mt-5 rounded">
            <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-3xl">{title} : {len}</h2>
            </div>

            <table className="table">
                {/* head */}
                <thead className="bg-[#D1A054] rounded-tl-5xl rounded-tr-5xl">
                    <tr className="text-base font-bold">
                        {columns.map((col, idx) => <th key={idx}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>

            </table>
        </div>
    );
};

export default DataTable;