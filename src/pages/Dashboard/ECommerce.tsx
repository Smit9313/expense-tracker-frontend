import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/dashboard/CardOne.tsx';
import CardTwo from '../../components/dashboard/CardTwo.tsx';
import CardThree from '../../components/CardThree.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import TableOne from '../../components/TableOne.tsx';
import { useGetTotalDataQuery } from '../../reduxState/apis/totalDataApi.ts';

const ECommerce = () => {

  const { data: totalData, isLoading, isSuccess, isError, error } = useGetTotalDataQuery({});
  console.log(totalData)


  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne totalExpense={totalData?.data.totalExpense} />
        <CardTwo totalIncome={totalData?.data.totalIncome} />
        <CardThree />
        <CardFour />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
