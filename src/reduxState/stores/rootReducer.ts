import userReducer from '../slices/userSlice';
import expenseCategoryReducer from "../slices/expenseCategorySlice";


const rootReducer = {
	user: userReducer,
	expenseCategory: expenseCategoryReducer
}

export default rootReducer;