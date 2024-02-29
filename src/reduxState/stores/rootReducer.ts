import userReducer from "../slices/userSlice";
import expenseCategoryReducer from "../slices/expenseCategorySlice";
import incomeCategoryReducer from "../slices/incomeCategorySlice";
import expenseReducer from "../slices/expenseSlice";

const rootReducer = {
  user: userReducer,
  expenseCategory: expenseCategoryReducer,
  expense: expenseReducer,
  incomeCategory: incomeCategoryReducer,
};

export default rootReducer;
