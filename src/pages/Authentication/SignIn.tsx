import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useLoginMutation } from '../../reduxState/apis/authApi';
import AuthSvg from '../../components/svgs/AuthSvg';
import { ISignin } from '../../interfaces/auth/ISignin';
import EmailSvg from '../../components/svgs/EmailSvg';
import LockSvg from '../../components/svgs/LockSvg';
import { useEffect } from 'react';
import GoogleSvg from '../../components/svgs/GoogleSvg';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (location.pathname === '/auth/signin' && location.state) {
      if (!location.state?.res?.status && location.state?.res?.code !== 404) {
        toast.error(location.state.res.message);
      }
    }
  }, []);

  const onSubmit = async (data: ISignin) => {
    await login(data)
      .unwrap()
      .then((res) => {
        if (res.status) {
          localStorage.setItem('token', res.data.token);
          navigate('/');
        } else {
          toast.error(res.message);
        }
      })
      .catch((err: any) => {
        toast.error(err.data.message);
      });
  };

  const handleGoogleSubmit = () => {
    window.open('http://localhost:8080/auth/google', '_self');
  };

  return (
    <div className="rounded-sm border m-8 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <p className="2xl:px-20">{/* Smit Dudhat */}</p>
            <AuthSvg />
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to MyExpense
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
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

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="6+ Characters, 1 Capital letter"
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

              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                onClick={handleGoogleSubmit}
              >
                <span>
                  <GoogleSvg />
                </span>
                Sign in with Google
              </button>

              <div className="mt-6 text-center">
                <p>
                  Don’t have any account?{' '}
                  <Link to="/auth/signup" className="text-primary">
                    Sign Up
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

export default SignIn;
