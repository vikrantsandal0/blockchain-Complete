
import Joi from 'joi';
import logMsgs from '../static/log_messages';
import helper from '../utils/helper';
import logger from '../utils/logger';

export const getBlocksValidator = (req, res, next) => {
    const schemaToCheck = { ...req.query };
    logger.info(logMsgs.gBs_valReqBody(schemaToCheck));

    const schema = Joi.object().keys({
        page: Joi.number().optional()
    });
    if (helper.validateFields(schemaToCheck, res, schema)) {
        req.query.page = req.query.page || 1;
        next()
    }
};

export const getRawBlockValidator = (req, res, next) => {
    const schemaToCheck = { ...req.query, ...req.params };
    logger.info(logMsgs.gRb_valReqBody(schemaToCheck));
    
    const schema = Joi.object().keys({
        block_hash_id: Joi.string().required(),
        page: Joi.number().optional()
    });
    if (helper.validateFields(schemaToCheck, res, schema)) {
        req.query.page = req.query.page || 1;
        next()
    }
};