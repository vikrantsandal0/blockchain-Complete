import consts from '../static/constants';
import * as errorHandler from '../utils/error_handler'
import logger from '../utils/logger';
import logMsgs from '../static/log_messages';

/** Check whether the given data is Error type */
const isError = (obj) => {
	return Object.prototype.toString.call(obj).indexOf("Error") !== -1;
};

/** Check whether the given data is object type */
const isObject = (obj) => {
	return Object.prototype.toString.call(obj).indexOf(consts.TYPE.OBJECT) !== -1;
};
// Check whether given data is object and is empty
const isObjectAndEmpty = (obj) => {
	return (Object.keys(obj).length === 0 && obj.constructor === Object);
};

const checkFlowAndParams = (req) => {
	logger.info(logMsgs.cF_start(req.originalUrl, req.query, req.params))

	return req.originalUrl.includes(consts.FLOWS.GET_RAW_BLOCK) ?
		consts.FLOWS.GET_RAW_BLOCK : consts.FLOWS.GET_BLOCKS;

}

const getPaginatedData = (allItems, currentPage, pageSize) => {
	let startIndex = (currentPage - 1) * pageSize;

	logger.info('getPaginatedData-->', allItems.length, currentPage, pageSize);

	return allItems.slice(startIndex, pageSize + startIndex)
}

const validateFields = (toValidate, res, schema) => {
	const validation = schema.validate(toValidate);
	if (validation.error) {
		let errorObj = validation.error.details !== undefined ? validation.error.details[0] : { message: 'Parameter missing or parameter type is wrong' };
		logger.info("validateFields", errorObj.message);

		const response = errorHandler.formatErrorMessage(errorObj);
		logger.info('error from validator', response);

		res.status(response.statusCode).json(response.body);
		return false;
	}
	return true;
};
export default { isError, isObject, isObjectAndEmpty, checkFlowAndParams, getPaginatedData, validateFields }