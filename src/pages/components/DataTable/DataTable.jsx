import PageLoader from "../PageLoader/PageLoader";

const DataTable = ({ title, len, columns, isLoading, children }) => {
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="w-full max-w-full overflow-x-auto bg-white mx-auto p-4 sm:p-6 md:p-8 mt-5 rounded">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl whitespace-nowrap">
          {title} : {len}
        </h2>
      </div>

      <table className="table min-w-[720px]">
        <thead className="bg-primary">
          <tr className="text-base font-bold">
            {columns.map((col, idx) => (
              <th key={idx} className="whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default DataTable;
