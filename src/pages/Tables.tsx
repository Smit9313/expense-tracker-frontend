import Breadcrumb from '../components/common/Breadcrumb';
import TableOne from '../components/common/TableOne';
import TableThree from '../components/common/TableThree';
import TableTwo from '../components/common/TableTwo';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
