import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useEditRemainderMutation, useGetRemainderByIdQuery } from '../../reduxState/apis/remainderApi';
import { useEffect } from 'react';

const EditRemainder = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { data: reainderData, isSuccess } = useGetRemainderByIdQuery({ remainderId: id });
	const [editRemainder] = useEditRemainderMutation();
	console.log(reainderData)

	const validationSchema = Yup.object().shape({
		notificationDate: Yup.date().required("Date is required"),
		detail: Yup.string().required("Details is required"),
	})

	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, formState, setValue } = useForm(formOptions);
	const { errors } = formState;

	useEffect(() => {
		if (isSuccess) {
			setValue("notificationDate", reainderData.data.notificationDate.split("T")[0])
			setValue("detail", reainderData.data.detail)
		}
	}, [isSuccess])

	const onSubmit = async (data: any) => {
		data.notificationDate.setDate(data.notificationDate.getDate() + 1)
		await editRemainder({ remainderId: id,isRead: reainderData.data.isRead,  ...data }).unwrap().then((res: any) => {

			if (res.status) {
				toast.success(res.message)
				navigate(-1)
			} else {
				toast.error(res.message)
			}
		}).catch((err: any) => {
			toast.error(err.response.data.message)
		})
	}

	return (
		<>
			<div className="mx-auto">
				<Breadcrumb pageName="Edit Remainder" />
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<div className="p-7">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-5.5">
								<label
									className="mb-3 block text-sm font-medium text-black dark:text-white"
									htmlFor="notificationDate"
								>
									Date
								</label>
								<div className="relative">
									<input
										type="date"
										id='notificationDate'
										className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
										{...register("notificationDate")}
									/>
									{errors.notificationDate && <p className='text-orange-700'>{errors.notificationDate?.message}</p>}
								</div>
							</div>
							<div className="mb-5.5">
								<label
									className="mb-3 block text-sm font-medium text-black dark:text-white"
									htmlFor="expenseAmount"
								>
									Detail
								</label>
								<textarea
									className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									id="expenseAmount"
									placeholder="add details..."
									{...register("detail")}
								/>
								{errors.detail && <p className='text-orange-700'>{errors.detail?.message}</p>}
							</div>
							<div className="flex justify-end gap-4.5">
								<button
									type='button'
									className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
									onClick={() => navigate("/remainders")}
								>
									Cancel
								</button>
								<button
									type='submit'
									className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>

			</div>
		</>
	);
};

export default EditRemainder;
