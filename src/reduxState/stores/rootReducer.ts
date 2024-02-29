import userReducer from "../slices/userSlice";
import totaldataReducer from "../slices/totalDataSlice"
import expenseCategoryReducer from "../slices/expenseCategorySlice";
import incomeCategoryReducer from "../slices/incomeCategorySlice";
import expenseReducer from "../slices/expenseSlice";
import incomeReducer from "../slices/incomeSlice";

const rootReducer = {
  user: userReducer,
  totalData: totaldataReducer,
  expenseCategory: expenseCategoryReducer,
  expense: expenseReducer,
  incomeCategory: incomeCategoryReducer,
  income: incomeReducer,
};

export default rootReducer;
