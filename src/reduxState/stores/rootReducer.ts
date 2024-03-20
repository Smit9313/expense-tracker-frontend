import userReducer from "../slices/userSlice";
import totaldataReducer from "../slices/totalDataSlice"
import expenseCategoryReducer from "../slices/expenseCategorySlice";
import incomeCategoryReducer from "../slices/incomeCategorySlice";
import expenseReducer from "../slices/expenseSlice";
import incomeReducer from "../slices/incomeSlice";
import remainderReducer from "../slices/remainderSlice";

const rootReducer = {
  user: userReducer,
  totalData: totaldataReducer,
  expenseCategory: expenseCategoryReducer,
  expense: expenseReducer,
  incomeCategory: incomeCategoryReducer,
  income: incomeReducer,
  remainder: remainderReducer
};

export default rootReducer;
