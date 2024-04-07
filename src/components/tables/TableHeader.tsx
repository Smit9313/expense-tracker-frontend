import { useNavigate } from 'react-router-dom';

const TableHeader = ({
  navigateTo,
  eName,
  handleExportClick,
}: {
  navigateTo: string;
  eName: string;
  handleExportClick: any;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center h-20 mb-4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="rounded-l bg-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="rounded-r bg-primary text-gray px-4 py-2 hover:bg-opacity-70">
          Search
        </button>
      </div>
      <div className="flex space-x-4">
        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
          onClick={() => navigate(navigateTo)}
        >
          + Add
        </button>
        <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70" onClick={() => handleExportClick(eName)}>
          Export to Excel
        </button>
        <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70">
          Button 3
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
