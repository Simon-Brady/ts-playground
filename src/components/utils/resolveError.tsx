type ErrorResponse = {
	response: string
}

export const resolveError = (errorReponse: ErrorResponse, setErrorMethod: (arg: boolean) => void) => {
	console.error(
		'Cannot retrieve data',
		errorReponse || 'CRITICAL ERROR: no response'
	);
	setErrorMethod(true);
};

