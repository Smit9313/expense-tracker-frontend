import userReducer from "../slices/userSlice";
import expenseCategoryReducer from "../slices/expenseCategorySlice";
import incomeCategoryReducer from "../slices/incomeCategorySlice";
import expenseReducer from "../slices/expenseSlice";
import incomeReducer from "../slices/incomeSlice";

const rootReducer = {
  user: userReducer,
  expenseCategory: expenseCategoryReducer,
  expense: expenseReducer,
  incomeCategory: incomeCategoryReducer,
  income: incomeReducer,
};

export default rootReducer;
