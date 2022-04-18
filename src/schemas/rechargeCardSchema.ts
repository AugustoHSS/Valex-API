import joi from 'joi';

const rechargeCardSchema = joi.object({
  amount: joi.number().greater(0).required(),
});

export default rechargeCardSchema;
