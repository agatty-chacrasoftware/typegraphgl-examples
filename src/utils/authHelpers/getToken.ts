import { getAuth } from "firebase-admin/auth";
import { logger } from "../logger";

export const getToken = async (uid) => {
	return getAuth()
		.createCustomToken(uid)
		.then((customToken) => {
			return customToken;
		})
		.catch((error) => {
			logger.error("Error creating custom token:", error);
		});
};
