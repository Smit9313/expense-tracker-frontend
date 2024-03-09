import { Skeleton } from 'antd'

const CardLoader = () => {
	return (
		<div className="rounded-sm animate-pulse border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
			<div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
			</div>
			<div className="mt-4 flex items-end justify-between">
				<div>
					<Skeleton.Input active={true} size="default" style={{ marginBottom: "10px" }} />
					<br />
					<Skeleton.Input active={true} size="small" />
				</div>
				<span className="flex items-center gap-1 text-sm font-medium text-meta-3">
					<Skeleton.Button />
				</span>
			</div>
		</div>
	)
}

export default CardLoader;