import Joi from "joi";

export class ArticleSchemas {
  constructor() {}

  articleSchema = Joi.object({
    article: Joi.object({
      slug: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      body: Joi.string().required(),
      createdAt: Joi.string().required(),
      updatedAt: Joi.string().required(),
      tagList: Joi.array().items(Joi.string()),
      favorited: Joi.boolean().required(),
      favoritesCount: Joi.number().required(),
      author: Joi.object({
        username: Joi.string().required(),
        image: Joi.string().required(),
        following: Joi.boolean().required(),
      }),
    }),
  });
}
