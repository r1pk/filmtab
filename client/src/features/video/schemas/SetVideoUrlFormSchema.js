import Joi from 'joi';

export const SetVideoUrlFormSchema = Joi.object({
  url: Joi.string().trim().uri().required().label('url'),
});
