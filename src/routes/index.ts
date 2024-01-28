import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const ExpenseList = lazy(() => import('../pages/Expense'))
const Ecategory = lazy(()=> import('../pages/Ecategory'))
const Icategory = lazy(()=> import('../pages/Icategory'))
const AddExpenseCategory = lazy(()=> import('../pages/Ecategory/AddExpenseCategory'))
const EditExpenseCategory = lazy(()=> import('../pages/Ecategory/EditExpenseCategory'))
const AddIncomeCategory = lazy(()=> import('../pages/Icategory/AddIncomeCategory'))
const EditIncomeCategory = lazy(()=> import('../pages/Icategory/EditIncomeCategory'))


const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/expense',
    title: 'Buttons',
    component: ExpenseList,
  },
  {
    path: '/income',
    title: 'Buttons',
    component: ExpenseList,
  },
  {
    path: '/Ecategory',
    title: 'Buttons',
    component: Ecategory,
  },
  {
    path: '/Ecategory/add',
    title: 'Buttons',
    component: AddExpenseCategory,
  },
  {
    path: '/Ecategory/edit/:id',
    title: 'Buttons',
    component: EditExpenseCategory,
  },
  {
    path: '/Icategory',
    title: 'Buttons',
    component: Icategory,
  },
  {
    path: '/Icategory/add',
    title: 'Buttons',
    component: AddIncomeCategory,
  },
  {
    path: '/Icategory/edit/:id',
    title: 'Buttons',
    component: EditIncomeCategory,
  },


];

const routes = [...coreRoutes];
export default routes;
