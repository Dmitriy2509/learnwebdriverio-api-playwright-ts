import Joi from "joi";

export class CommentSchemas {
  constructor() {}

  commentSchema = Joi.object({
    comment: {
      id: Joi.string().required(),
      createdAt: Joi.string().required(),
      author: Joi.object({
        username: Joi.string().required(),
        image: Joi.string().required(),
        following: Joi.boolean().required(),
      }),
    },
  });
}
