import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useCreateIncomeCategoryMutation } from '../../reduxState/apis/incomeCategoryApi';

const AddIncomeCategory = () => {
  const navigate = useNavigate();
  const [createIncomeCategory] = useCreateIncomeCategoryMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required")
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data: { name: string }) => {
    await createIncomeCategory(data).unwrap().then(res => {
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
    <>
      <div className="mx-auto">
        <Breadcrumb pageName="Add New Income Category" />
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
                  type='button'
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  onClick={() => navigate("/Icategory")}
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

export default AddIncomeCategory;
