import joi from 'joi';

const purchaseSchema = joi.object({
  cardId: joi.number().required(),
  businessId: joi.number().required(),
  cardPassword: joi.string().length(4).required(),
  amount: joi.number().greater(0).required(),
});

export default purchaseSchema;
