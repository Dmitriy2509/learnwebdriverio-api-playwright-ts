import Joi from "joi";

export class UserSchemas {
  constructor() {}

  userSchema = Joi.object({
    user: Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required(),
      token: Joi.string().required(),
    }),
  });

  updatedUserSchema = Joi.object({
    user: Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required(),
      token: Joi.string().required(),
      bio: Joi.string().required(),
      image: Joi.string().required(),
    }),
  });
}
