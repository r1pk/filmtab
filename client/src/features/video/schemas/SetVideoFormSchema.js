import Joi from 'joi';

export const SetVideoFormSchema = Joi.object({
  url: Joi.string().trim().uri().required().label('url'),
});
