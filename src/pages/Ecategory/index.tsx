import { Table } from 'antd';
import type { TableProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import toast from 'react-hot-toast';

import Breadcrumb from '../../components/common/Breadcrumb'
import { useDeleteExpenseCategoryMutation, useGetExpenseCategoryQuery } from '../../reduxState/apis/expenseCategoryApi';
import EditButton from '../../components/buttons/EditButton';
import DeleteButton from '../../components/buttons/DeleteButton';
import { Iecategory } from '../../interfaces/ecategory/Iecategory';

const Ecategory = () => {
	const navigate = useNavigate();
	const { data: expenseCategoryData, isLoading, isSuccess } = useGetExpenseCategoryQuery({});
	const [deleteExpenseCategory] = useDeleteExpenseCategoryMutation();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [curId, setCurId] = useState<string>("");

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		if (curId) {
			await deleteExpenseCategory({ expenseCategoryId: curId }).unwrap().then(res => {
				if (res.status) {
					setCurId("");
					toast.success("deleted...")
				} else {
					toast.error(res.message)
				}
			}).catch((err: any) => {
				toast.error(err.response.data.error)
			}).finally(() => {
				setIsModalOpen(false);
			})
		}
	};

	const handleCancel = () => {
		setCurId("");
		setIsModalOpen(false);
	};

	const columns: TableProps<Iecategory>['columns'] = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>
		},
		{
			title: 'Total Expense',
			dataIndex: 'totalExpense',
			key: 'totalExpense',
			render: (text) => <a>{text}</a>
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record: Iecategory) =>{
			return (
				<div className="flex items-center space-x-3.5">
					<EditButton handleClick={() => navigate(`/Ecategory/edit/${record._id}`)} />
					<DeleteButton handleClick={() => { setCurId(record._id); showModal() }} />
				</div>
			)},
		},
	];

	const data: Iecategory[] = isSuccess ? expenseCategoryData.map((val: Iecategory, index: number) => {
		return { ...val, key: index }
	}) : []

	return (
		<>
			<Modal title="Are you sure you want to delete this category?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={
				<div className="flex justify-end gap-4.5">
					<button
						className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black"
						onClick={handleCancel}
					>
						Cancel
					</button>
					<button
						className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
						onClick={handleOk}
					>
						Delete
					</button>
				</div>
			}>
			</Modal>
			<Breadcrumb pageName="Expense Category" />
			<div className="flex flex-col gap-10">
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} loading={isLoading} showHeader={true} title={() => {
						return <div className="flex justify-between" >
							<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
								{/* Top Channels */}
							</h4>
							<div className=''>
								<button
									className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
									onClick={() => navigate("/Ecategory/add")}
								>
									+ Add
								</button>
							</div>
						</div>
					}} scroll={{ x: 800 }} />
				</div>
			</div>
		</>
	)
}

export default Ecategory