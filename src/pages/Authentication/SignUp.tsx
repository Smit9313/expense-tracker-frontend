import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useRegisterUserMutation } from '../../reduxState/apis/authApi';
import AuthSvg from '../../components/svgs/AuthSvg';
import { ISignup } from '../../interfaces/auth/ISignup';
import UserSvg from '../../components/svgs/UserSvg';
import EmailSvg from '../../components/svgs/EmailSvg';
import LockSvg from '../../components/svgs/LockSvg';
import GoogleSvg from '../../components/svgs/GoogleSvg';
import { useState } from 'react';

const SignUp = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [imageLoading, setImageLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data: ISignup) => {
    await registerUser(data)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.status) {
          toast.success(res.message);
          navigate('/auth/signin');
        } else {
          toast.error(res.message);
        }
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      });
  };

  const handleImageUpload = (e: any) => {
    setImageLoading(true);
    const data = new FormData();
    data.append('image', e.target.files[0]);

    fetch('http://localhost:8080/image-upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setImageLoading(false);
      });
  };

  return (
    <div className="rounded-sm border m-8 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <AuthSvg />
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign Up to MyExpense
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register('username')}
                  />

                  <span className="absolute right-4 top-4">
                    <UserSvg />
                  </span>
                  {errors.username && (
                    <p className="text-orange-700">
                      {errors.username?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register('email')}
                  />

                  <span className="absolute right-4 top-4">
                    <EmailSvg />
                  </span>
                  {errors.email && (
                    <p className="text-orange-700">{errors.email?.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register('password')}
                  />

                  <span className="absolute right-4 top-4">
                    <LockSvg />
                  </span>
                  {errors.password && (
                    <p className="text-orange-700">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-5">
                <br />
                {imageLoading ? (
                  <div className="flex items-center justify-center w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">
                    <span className="h-7 w-7 animate-spin rounded-full border-4 border-solid border-slate-200 border-t-transparent"></span>
                  </div>
                ) : (
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                )}
              </div>

              <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                <span>
                  <GoogleSvg />
                </span>
                Sign up with Google
              </button>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/auth/signin" className="text-primary">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
