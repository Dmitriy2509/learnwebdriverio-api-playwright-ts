import { APIRequestContext } from "@playwright/test";
import { Article } from "../controllers/Article.controller";
import { User } from "../controllers/User.controller";
import { HelperCheckRequest } from "../HelperCheckRequest";
import { FavoriteArticle } from "../controllers/FavoriteArticle.controller";
import { Comments } from "../controllers/Comments.controller";
import { Tag } from "../controllers/Tag.controller";

export class APIClient {
  article: Article;
  favoriteArticle: FavoriteArticle;
  user: User;
  comment: Comments;
  tag: Tag;
  helperCheckRequest: HelperCheckRequest;

  constructor(request: APIRequestContext) {
    this.article = new Article(request);
    this.favoriteArticle = new FavoriteArticle(request);
    this.user = new User(request);
    this.comment = new Comments(request);
    this.tag = new Tag(request);
    this.helperCheckRequest = new HelperCheckRequest();
  }
}
