import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Breadcrumb from '../../components/common/Breadcrumb';
import { useGetExpenseCategoryQuery } from '../../reduxState/apis/expenseCategoryApi';
import { useEditExpenseMutation, useGetExpensebyIdQuery } from '../../reduxState/apis/expenseApi';
import { Iecategory } from '../../interfaces/ecategory/Iecategory';

const EditExpense = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { data: expenseCategoryData, isSuccess } = useGetExpenseCategoryQuery({});
	const { data: expenseData, isSuccess: expenseIsSuccess } = useGetExpensebyIdQuery({ expenseId: id });
	const [editExpense] = useEditExpenseMutation();

	const validationSchema = Yup.object().shape({
		expenseDate: Yup.date().required("Date is required"),
		expenseDetails: Yup.string().required("Details is required"),
		expenseAmount: Yup.number().typeError('Amount is required').required("Amount is required"),
		expenseCategoryId: Yup.string().required("Category is required")
	});

	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, formState, setValue } = useForm(formOptions);
	const { errors } = formState;

	useEffect(() => {
		if (expenseIsSuccess) {
			console.log(expenseData)
			setValue("expenseDate", expenseData.data.expenseDate.split("T")[0])
			setValue("expenseDetails", expenseData.data.expenseDetails)
			setValue("expenseAmount", expenseData.data.expenseAmount)
			setValue("expenseCategoryId", expenseData.data.expenseCategoryId)
		}
	}, [expenseIsSuccess])

	const onSubmit = async (data: { expenseDate: Date, expenseDetails: string, expenseAmount: number, expenseCategoryId: string }) => {
		data.expenseDate.setDate(data.expenseDate.getDate() + 1)
		await editExpense({ ...data, expenseId: id }).unwrap().then(res => {
			if (res.status) {
				toast.success(res.message)
				navigate(-1)
			} else {
				toast.error(res.message)
			}
		}).catch(err => {
			toast.error(err.response.data.message)
		})
	}

	return (
		<div className="mx-auto">
			<Breadcrumb pageName="Edit Expense" />
			<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
				<div className="p-7">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-5.5">
							<label
								className="mb-3 block text-sm font-medium text-black dark:text-white"
								htmlFor="expenseDate"
							>
								Date
							</label>
							<div className="relative">
								<input
									type="date"
									id='expenseDate'
									className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
									{...register("expenseDate")}
								/>
								{errors.expenseDate && <p className='text-orange-700'>{errors.expenseDate?.message}</p>}
							</div>
						</div>
						<div className="mb-5.5">
							<label
								className="mb-3 block text-sm font-medium text-black dark:text-white"
								htmlFor="expenseCategoryId"
							>
								Expense Category
							</label>
							<select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-4.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
								id='expenseCategoryId'
								{...register("expenseCategoryId")}
							>
								{isSuccess && expenseCategoryData.map((val: Iecategory) => <option key={val._id} value={val._id}>{val.name}</option>)}
							</select>
							{errors.expenseCategoryId && <p className='text-orange-700'>{errors.expenseCategoryId?.message}</p>}
						</div>
						<div className="mb-5.5">
							<label
								className="mb-3 block text-sm font-medium text-black dark:text-white"
								htmlFor="expenseAmount"
							>
								Amount
							</label>
							<input
								className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
								type="number"
								id="expenseAmount"
								placeholder="amount"
								{...register("expenseAmount")}
							/>
							{errors.expenseAmount && <p className='text-orange-700'>{errors.expenseAmount?.message}</p>}
						</div>
						<div className="mb-5.5">
							<label
								className="mb-3 block text-sm font-medium text-black dark:text-white"
								htmlFor="expenseDetails"
							>
								Detail
							</label>
							<input
								className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
								type="text"
								id="expenseDetails"
								placeholder="detail"
								{...register("expenseDetails")}
							/>
							{errors.expenseDetails && <p className='text-orange-700'>{errors.expenseDetails?.message}</p>}
						</div>
						<div className="flex justify-end gap-4.5 mt-6">
							<button
								className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
								onClick={() => navigate("/expense")}
							>
								Cancel
							</button>
							<button
								className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
							>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditExpense;
