export class NotAuthorizedError extends Error {
	code = 401;
	status = "Not authorized";
}

export class NotFoundError extends Error {
	code = 404;
	status = "Not Found";
}
