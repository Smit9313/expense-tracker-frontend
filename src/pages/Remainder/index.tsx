import Breadcrumb from '../../components/common/Breadcrumb'
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Modal } from 'antd';
import toast from 'react-hot-toast';
import EditButton from '../../components/buttons/EditButton';
import DeleteButton from '../../components/buttons/DeleteButton';
import { useDeleteRemainderMutation, useEditRemainderMutation, useGetRemainderQuery } from '../../reduxState/apis/remainderApi';

interface DataType {
	key: string;
	name: string;
}

const Remainder = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const { data: remainderData, isLoading, isSuccess } = useGetRemainderQuery({});
	const [editRemainder] = useEditRemainderMutation();
	const [deleteRemainder] = useDeleteRemainderMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const isDelete = searchParams.get("delete")

	useEffect(() => {
		if (isDelete) {
			setIsModalOpen(true)
		}
	}, [searchParams])

	const handleOk = async () => {
		if (isDelete) {
			await deleteRemainder({ remainderId: isDelete }).unwrap().then(res => {
				if (res.status) {
					toast.success("deleted...")
				} else {
					toast.error(res.message)
				}
			}).catch(err => {
				toast.error(err.response.data.error)
			}).finally(() => {
				setIsModalOpen(false);
				setSearchParams('')
			})
		}
	};

	const handleCancel = () => {
		setSearchParams('')
		setIsModalOpen(false);
	};

	const handleModal = (id: string) => {
		setSearchParams({ delete: id });
	}

	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Date',
			dataIndex: 'notificationDate',
			key: 'notificationDate',
			render: (text) => <p>{text.split("T")[0]}</p>
		},
		{
			title: 'Detail',
			dataIndex: 'detail',
			key: 'detail',
			render: (text) => <p>{text}</p>
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record: any) => (
				<div className="flex items-center space-x-3.5">
					<EditButton handleClick={() => navigate(`/remainders/edit/${record._id}`)} />
					<DeleteButton handleClick={() => handleModal(record._id)} />
				</div>
			),
		},
	];

	const data: DataType[] = isSuccess ? remainderData.data.map((val: any, index: number) => {
		return { ...val, key: index.toString() }
	}) : []

	const editStatus = async (record: any) => {
		await editRemainder({ remainderId: record._id, detail: record.detail, notificationDate: record.notificationDate, isRead: true }).unwrap().then((res: any) => {
			if (res.status) {
				// toast.success(res.message)
			} else {
				toast.error(res.message)
			}
		}).catch((err: any) => {
			toast.error(err.response.data.message)
		})
	}

	const getRowClassName = (record: any) => {
		if (record.isRead) {
			return 'custom-row-class-select';
		}
		return 'custom-row-class';
	};

	return (
		<>
			<Modal title="Are you sure you want to delete this record?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={
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
			<Breadcrumb pageName="Remainders" />
			<div className="flex flex-col gap-10">
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} showHeader={true} loading={isLoading}
						size="small"
						onRow={(record: any) => {
							return {
								onDoubleClick: () => {
									if (!record.isRead) {
										editStatus(record)
									}
								},
							};
						}}
						rowClassName={getRowClassName}
						title={() => {
							return <div className="flex justify-between" >
								<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
									{/* Top Channels */}
								</h4>
								<div className=''>
									<button
										className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
										onClick={() => navigate("/remainders/add")}
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

export default Remainder