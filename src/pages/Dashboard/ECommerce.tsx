import CardFour from '../../components/common/CardFour.tsx';
import CardOne from '../../components/dashboard/CardOne.tsx';
import CardTwo from '../../components/dashboard/CardTwo.tsx';
import CardThree from '../../components/common/CardThree.tsx';
import ChartOne from '../../components/common/ChartOne.tsx';
import ChartThree from '../../components/common/ChartThree.tsx';
import ChartTwo from '../../components/common/ChartTwo.tsx';
import ChatCard from '../../components/common/ChatCard.tsx';
import MapOne from '../../components/common/MapOne.tsx';
import TableOne from '../../components/common/TableOne.tsx';
import { useGetTotalDataQuery } from '../../reduxState/apis/totalDataApi.ts';
import CardLoader from '../../components/cardLoader/CardLoader.tsx';
import ChartThreeLoader from '../../components/chartLoader/ChartThreeLoader.tsx';

const ECommerce = () => {
  const { data: totalData } = useGetTotalDataQuery({});

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {(totalData?.totalExpense !== null && totalData?.totalExpense !== undefined && totalData?.totalIncome !== null && totalData?.totalIncome !== undefined) ? <>
          <CardOne totalExpense={totalData?.totalExpense} />
          <CardTwo totalIncome={totalData?.totalIncome} />
          <CardThree />
          <CardFour />
        </>
          :
          <>
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </>
        }

      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {(totalData?.totalExpense !== null && totalData?.totalExpense !== undefined && totalData?.totalIncome !== null && totalData?.totalIncome !== undefined) ?
          <ChartThree income={totalData?.totalIncome} expense={totalData?.totalExpense} />
          : <ChartThreeLoader />
        }
        <ChartOne />
        <MapOne />
        <ChartTwo />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
