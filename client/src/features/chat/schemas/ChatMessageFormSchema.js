import Joi from 'joi';

export const ChatMessageFormSchema = Joi.object({
  content: Joi.string().trim().min(1).max(140).required().label('content'),
});
