import userReducer from "../slices/userSlice";
import expenseCategoryReducer from "../slices/expenseCategorySlice";
import expenseReducer from "../slices/expenseSlice";

const rootReducer = {
  user: userReducer,
  expenseCategory: expenseCategoryReducer,
  expense: expenseReducer,
};

export default rootReducer;
