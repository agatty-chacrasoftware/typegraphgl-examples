import { errorType } from "./errorConstants";

export const getErrorType = (errorName) => {
	return errorType[errorName];
};
