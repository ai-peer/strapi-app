import Article from "./article";
import Category from "./category";

type Ret = {
  article: Article;
  category: Category;
};
let rets: Ret;

export default function (strapi): Ret {
  if (!rets) {
    rets = {
      article: new Article(strapi),
      category: new Category(strapi),
    };
  }
  return rets;
}
