import { ArticleSchemas } from "../schemas/ArticleSchemas";
import { CommentSchemas } from "../schemas/CommentSchemas";
import { UserSchemas } from "../schemas/UserSchemas";

export class SchemaClient {
  userSchemas: UserSchemas;
  articleSchemas: ArticleSchemas;
  commentSchemas: CommentSchemas;

  constructor() {
    this.userSchemas = new UserSchemas();
    this.articleSchemas = new ArticleSchemas();
    this.commentSchemas = new CommentSchemas();
  }
}
