const TableOne = ({
  dataSource,
  columns,
  loading,
}: {
  dataSource: any;
  columns: any;
  loading: boolean;
}) => {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            {columns.map((val: any, index: number) => (
              <th
                key={index}
                className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white"
              >
                {val.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!loading &&
            dataSource.map((d: any, dindex: number) => (
              <tr key={dindex}>
                {columns.map((c: any, cindex: number) => (
                  <td
                    key={cindex}
                    className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark"
                  >
                    {c.render(d[c.dataIndex], d)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {loading && (
        <div className="flex h-40 items-center justify-center bg-white dark:bg-mainBackgroundColor">
          <span className="h-7 w-7 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></span>
        </div>
      )}
    </div>
  );
};

export default TableOne;
