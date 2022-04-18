import joi from 'joi';

const activateCardSchema = joi.object({
  cardId: joi.number().required(),
  securityCode: joi.string().length(3).required(),
  cardPassword: joi.string().length(4).required(),
});

export default activateCardSchema;
