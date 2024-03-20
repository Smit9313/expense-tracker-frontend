import { lazy } from "react";

const Calendar = lazy(() => import("../pages/Calendar"));
const Chart = lazy(() => import("../pages/Chart"));
const FormElements = lazy(() => import("../pages/Form/FormElements"));
const FormLayout = lazy(() => import("../pages/Form/FormLayout"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const Tables = lazy(() => import("../pages/Tables"));
const Alerts = lazy(() => import("../pages/UiElements/Alerts"));
const Buttons = lazy(() => import("../pages/UiElements/Buttons"));
const ExpenseList = lazy(() => import("../pages/Expense"));
const AddExpense = lazy(() => import("../pages/Expense/AddExpense"));
const EditExpense = lazy(() => import("../pages/Expense/EditExpense"));
const IncomeList = lazy(() => import("../pages/Income"));
const AddIncome = lazy(() => import("../pages/Income/AddIncome"));
const EditIncome = lazy(() => import("../pages/Income/EditIncome"));
const Ecategory = lazy(() => import("../pages/Ecategory"));
const Icategory = lazy(() => import("../pages/Icategory"));
const AddExpenseCategory = lazy(() => import("../pages/Ecategory/AddExpenseCategory"));
const EditExpenseCategory = lazy(() => import("../pages/Ecategory/EditExpenseCategory"));
const AddIncomeCategory = lazy(() => import("../pages/Icategory/AddIncomeCategory"));
const EditIncomeCategory = lazy(() => import("../pages/Icategory/EditIncomeCategory"));
const Remainder = lazy(() => import("../pages/Remainder"));
const AddRemainder = lazy(() => import("../pages/Remainder/AddRemainder"))
const EditRemainder = lazy(() => import("../pages/Remainder/EditRemainder"))

const coreRoutes = [
  {
    path: "/calendar",
    title: "Calender",
    component: Calendar,
  },
  {
    path: "/profile",
    title: "Profile",
    component: Profile,
  },
  {
    path: "/forms/form-elements",
    title: "Forms Elements",
    component: FormElements,
  },
  {
    path: "/forms/form-layout",
    title: "Form Layouts",
    component: FormLayout,
  },
  {
    path: "/tables",
    title: "Tables",
    component: Tables,
  },
  {
    path: "/settings",
    title: "Settings",
    component: Settings,
  },
  {
    path: "/chart",
    title: "Chart",
    component: Chart,
  },
  {
    path: "/ui/alerts",
    title: "Alerts",
    component: Alerts,
  },
  {
    path: "/ui/buttons",
    title: "Buttons",
    component: Buttons,
  },
  {
    path: "/expense",
    title: "Buttons",
    component: ExpenseList,
  },
  {
    path: "/expense/add",
    title: "Buttons",
    component: AddExpense,
  },
  {
    path: "/expense/edit/:id",
    title: "Buttons",
    component: EditExpense,
  },
  {
    path: "/income",
    title: "Buttons",
    component: IncomeList,
  },
  {
    path: "/income/add",
    title: "Buttons",
    component: AddIncome,
  },
  {
    path: "/income/edit/:id",
    title: "Buttons",
    component: EditIncome,
  },
  {
    path: "/Ecategory",
    title: "Buttons",
    component: Ecategory,
  },
  {
    path: "/Ecategory/add",
    title: "Buttons",
    component: AddExpenseCategory,
  },
  {
    path: "/Ecategory/edit/:id",
    title: "Buttons",
    component: EditExpenseCategory,
  },
  {
    path: "/Icategory",
    title: "Buttons",
    component: Icategory,
  },
  {
    path: "/Icategory/add",
    title: "Buttons",
    component: AddIncomeCategory,
  },
  {
    path: "/Icategory/edit/:id",
    title: "Buttons",
    component: EditIncomeCategory,
  },
  {
    path: "/remainders",
    title: "Remainder",
    component: Remainder,
  },
  {
    path: "/remainders/add",
    title: "Remainder",
    component: AddRemainder,
  },
  {
    path: "/remainders/edit/:id",
    title: "Remainder",
    component: EditRemainder,
  },
];

const routes = [...coreRoutes];
export default routes;
