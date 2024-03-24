import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import { useLazyGoogleAuthQuery } from './reduxState/apis/authApi';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [googleAuth] = useLazyGoogleAuthQuery({});
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    const token = localStorage.getItem('token');

    const getUser = () => {
      googleAuth({})
        .unwrap()
        .then((res: any) => {
          if (res.status) {
            localStorage.setItem('token', res.data.token);
            navigate('/');
          } else {
            navigate('auth/signin', { state: { res } });
          }
        });
    };

    if (!token) {
      getUser();
    } else {
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
