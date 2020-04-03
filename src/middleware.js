const notFound = (req, res, next) => {
	const error = new Error(`Error 404 - Resource ${req.url} not found.`);
	res.status(404);
	next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
	const statusCode = res.statusCode === 200
		? 500
		: res.statusCode;
	res.status(statusCode);

	const isDev = process.env.NODE_ENV === 'development';
	res.json({
		code: statusCode,
		message: error.message,
		stack: isDev
			? error.stack
			: undefined,
	});
};

module.exports = {
	notFound,
	errorHandler,
};
