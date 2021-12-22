import { getAuth } from "firebase-admin/auth";

export const getToken = async (uid) => {
	return getAuth()
		.createCustomToken(uid)
		.then((customToken) => {
			return customToken;
		})
		.catch((error) => {
			console.log("Error creating custom token:", error);
		});
};
