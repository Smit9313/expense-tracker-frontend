import { Skeleton } from 'antd'

const ChartThreeLoader = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Analytics
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <Skeleton.Input active={true} size="small" />
          </div>
        </div>
      </div>

      <div className="mb-2 xl:mt-15">
        <div id="chartThree" className="mx-auto flex justify-center">
          <Skeleton.Input active={true} size="large" style={{ height: "280px", width: "250px" }} />
        </div>
      </div>
    </div>
  )
}

export default ChartThreeLoader