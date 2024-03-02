import { useState } from 'react';
import { Modal, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Breadcrumb from '../../components/common/Breadcrumb'
import { useDeleteExpenseMutation, useGetExpensesQuery } from '../../reduxState/apis/expenseApi';
import EditButton from '../../components/buttons/EditButton';
import DeleteButton from '../../components/buttons/DeleteButton';

interface DataType {
	key: number;
	date: string;
	category: string;
	amount: number;
	details: string;
}


const ExpenseList = () => {
	const navigate = useNavigate();
	const { data: expenseData, isLoading, isSuccess } = useGetExpensesQuery({});
	const [deleteExpense] = useDeleteExpenseMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [curId, setCurId] = useState("");

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		if (curId) {
			await deleteExpense({ expenseId: curId }).unwrap().then(res => {
				if (res.status) {
					setCurId("");
					toast.success("deleted...")
				} else {
					toast.error(res.message)
				}
			}).catch(err => {
				toast.error(err.response.data.error)
			})
		}
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setCurId("");
		setIsModalOpen(false);
	};

	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			render: (text) => <a>{text.split("T")[0]}</a>
		},
		{
			title: 'Category',
			key: 'category',
			dataIndex: 'category',
			render: (_, { category }: any) => (
				<>
					<Tag color={"green"}>
						{category.toUpperCase()}
					</Tag>

				</>
			),
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
			render: (text) => <a>{text}</a>,
			sorter: (a: any, b: any) => a.amount - b.amount,
		},
		{
			title: 'Details',
			dataIndex: 'details',
			key: 'details',
			render: (text) => <a>{text}</a>
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record: any) => (
				<div className="flex items-center space-x-3.5">
					<EditButton handleClick={() => navigate(`/expense/edit/${record._id}`)} />
					<DeleteButton handleClick={() => { setCurId(record._id); showModal() }} />
				</div>
			),
		}
	];

	const data: DataType[] = isSuccess ? expenseData.data.map((val: any, index: any) => {
		const updatedData = { date: val.expenseDate, category: val.expenseCategoryId.name, amount: val.expenseAmount, details: val.expenseDetails, _id: val._id, key: index }
		return updatedData
	}) : []

	return (
		<>
			<Modal title="Are you sure you want to delete this expense?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={
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
			<Breadcrumb pageName="Expense" />
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
									onClick={() => navigate("/expense/add")}
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

export default ExpenseList