import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { editIncomeCategory, getIncomeCategory } from '../../api/apiHandler';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const EditIncomeCategory = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Category Name is required")
	});

	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, formState, setValue } = useForm(formOptions);
	const { errors } = formState;

	useEffect(() => {
		getIncomeCategory({ incomeCategoryId: id }).then(res => {
			if (res.status === 200) {
				setValue("name", res.data.name)
			}
		})
	})

	const onSubmit = (data: { name: string }) => {
		editIncomeCategory({ incomeCategoryId: id, ...data }).then(res => {
			if (res.status === 200) {
				toast.success("category updated...")
				navigate(-1)
			}
		}).catch(err => {
			toast.error(err.response.data.message)
		})
	}

	return (
		<>
			<div className="mx-auto">
				<Breadcrumb pageName="Edit Income Category" />
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<div className="p-7">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-5.5">
								<label
									className="mb-3 block text-sm font-medium text-black dark:text-white"
									htmlFor="name"
								>
									Name
								</label>
								<input
									className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									type="text"
									id="name"
									placeholder="category name"
									autoFocus
									{...register("name")}
								/>
								{errors.name && <p className='text-orange-700'>{errors.name?.message}</p>}
							</div>

							<div className="flex justify-end gap-4.5">
								<button
									className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
									onClick={() => navigate("/Icategory")}
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
		</>
	);
};

export default EditIncomeCategory;