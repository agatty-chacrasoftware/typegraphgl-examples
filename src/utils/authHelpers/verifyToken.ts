import { getAuth, signInWithCustomToken } from "firebase/auth";

export const verifyToken = async (token) => {
	const auth = getAuth();

	const userCredential = await signInWithCustomToken(auth, token);

	return userCredential.user.uid;
};
