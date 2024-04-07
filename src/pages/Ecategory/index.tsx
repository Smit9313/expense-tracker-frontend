import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Modal } from 'antd';
import toast from 'react-hot-toast';

import Breadcrumb from '../../components/common/Breadcrumb';
import {
  useDeleteExpenseCategoryMutation,
  useGetExpenseCategoryQuery,
} from '../../reduxState/apis/expenseCategoryApi';
import EditButton from '../../components/buttons/EditButton';
import DeleteButton from '../../components/buttons/DeleteButton';
import { Iecategory } from '../../interfaces/ecategory/Iecategory';
import TableOne from '../../components/tables/TableOne';
import Pagination from '../../components/pagination/Pagination';

const Ecategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    data: expenseCategoryData,
    isLoading,
    isSuccess,
  } = useGetExpenseCategoryQuery({});
  const [deleteExpenseCategory] = useDeleteExpenseCategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isDelete = searchParams.get('delete');

  useEffect(() => {
    if (isDelete) {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleOk = async () => {
    if (isDelete) {
      await deleteExpenseCategory({ expenseCategoryId: isDelete })
        .unwrap()
        .then((res) => {
          if (res.status) {
            toast.success('deleted...');
          } else {
            toast.error(res.message);
          }
        })
        .catch((err: any) => {
          toast.error(err.response.data.error);
        })
        .finally(() => {
          setIsModalOpen(false);
          setSearchParams('');
        });
    }
  };

  const handleCancel = () => {
    setSearchParams('');
    setIsModalOpen(false);
  };

  const handleModal = (id: string) => {
    setSearchParams({ delete: id });
  };

  const columns: TableProps<Iecategory>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Total Expense',
      dataIndex: 'totalExpense',
      key: 'totalExpense',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: Iecategory) => {
        return (
          <div className="flex items-center space-x-3.5">
            <EditButton
              handleClick={() => navigate(`/Ecategory/edit/${record._id}`)}
            />
            <DeleteButton handleClick={() => handleModal(record._id)} />
          </div>
        );
      },
    },
  ];

  const data: Iecategory[] = isSuccess
    ? expenseCategoryData.map((val: Iecategory, index: number) => {
        return { ...val, key: index };
      })
    : [];

  return (
    <>
      <Modal
        title="Are you sure you want to delete this category?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
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
        }
      ></Modal>
      <Breadcrumb pageName="Expense Category" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-20 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-10">
          <div className="flex justify-between h-20">
            <div></div>
            <div className="">
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                onClick={() => navigate('/Ecategory/add')}
              >
                + Add
              </button>
            </div>
          </div>
          <TableOne dataSource={data} columns={columns} loading={isLoading} />
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Ecategory;
