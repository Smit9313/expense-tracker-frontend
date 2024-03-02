import Breadcrumb from '../components/common/Breadcrumb.tsx';
import ChartFour from '../components/common/ChartFour.tsx';
import ChartOne from '../components/common/ChartOne.tsx';
import ChartThree from '../components/common/ChartThree.tsx';
import ChartTwo from '../components/common/ChartTwo.tsx';

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <ChartFour />
        </div>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
