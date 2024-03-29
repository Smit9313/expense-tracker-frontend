import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

import Breadcrumb from '../../components/common/Breadcrumb';
import { useGetIncomeCategoryQuery } from '../../reduxState/apis/incomeCategoryApi';
import { useEditIncomeMutation, useGetIncomebyIdQuery } from '../../reduxState/apis/incomeApi';
import { Iicategory } from '../../interfaces/icategory/Iicategory';

const EditIncome = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { data: incomeCategoryData, isSuccess } = useGetIncomeCategoryQuery({});
	const { data: incomeData, isSuccess: incomeIsSuccess } = useGetIncomebyIdQuery({ incomeId: id });
	const [editIncome] = useEditIncomeMutation();

	const validationSchema = Yup.object().shape({
		incomeDate: Yup.date().required("Date is required"),
		incomeDetails: Yup.string().required("Details is required"),
		incomeAmount: Yup.number().typeError('Amount is required').required("Amount is required"),
		incomeCategoryId: Yup.string().required("Category is required")
	});

	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, formState, setValue } = useForm(formOptions);
	const { errors } = formState;

	useEffect(() => {
		if (incomeIsSuccess) {
			setValue("incomeDate", incomeData.data.incomeDate.split("T")[0])
			setValue("incomeDetails", incomeData.data.incomeDetails)
			setValue("incomeAmount", incomeData.data.incomeAmount)
			setValue("incomeCategoryId", incomeData.data.incomeCategoryId)
		}
	}, [incomeIsSuccess])


	const onSubmit = async (data: { incomeDate: Date, incomeDetails: string, incomeAmount: number, incomeCategoryId: string }) => {
		data.incomeDate.setDate(data.incomeDate.getDate() + 1)
		await editIncome({ ...data, incomeId: id }).unwrap().then(res => {
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
			<Breadcrumb pageName="Edit Income" />
			<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
				<div className="p-7">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-5.5">
							<label
								className="mb-3 block text-sm font-medium text-black dark:text-white"
								htmlFor="incomeDate"
							>
								Date
							</label>
							<div className="relative">
								<input
									type="date"
									id='incomeDate'
									className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
									{...register("incomeDate")}
								/>
								{errors.incomeDate && <p className='text-orange-700'>{errors.incomeDate?.message}</p>}
							</div>
						</div>
						<div className="mb-5.5">
							<label
								className="mb-3 block text-sm font-medium text-black dark:text-white"
								htmlFor="incomeCategoryId"
							>
								Income Category
							</label>
							<select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-4.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
								id='incomeCategoryId'
								{...register("incomeCategoryId")}
							>
								{isSuccess && incomeCategoryData.map((val: Iicategory) => <option key={val._id} value={val._id}>{val.name}</option>)}
							</select>
							{errors.incomeCategoryId && <p className='text-orange-700'>{errors.incomeCategoryId?.message}</p>}
						</div>
						<div className="mb-5.5">
							<label
								className="mb-3 block text-sm font-medium text-black dark:text-white"
								htmlFor="incomeAmount"
							>
								Amount
							</label>
							<input
								className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
								type="number"
								id="incomeAmount"
								placeholder="amount"
								{...register("incomeAmount")}
							/>
							{errors.incomeAmount && <p className='text-orange-700'>{errors.incomeAmount?.message}</p>}
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
								id="incomeDetails"
								placeholder="detail"
								{...register("incomeDetails")}
							/>
							{errors.incomeDetails && <p className='text-orange-700'>{errors.incomeDetails?.message}</p>}
						</div>
						<div className="flex justify-end gap-4.5 mt-6">
							<button
								className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
								onClick={() => navigate("/income")}
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

export default EditIncome;
