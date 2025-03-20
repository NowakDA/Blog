export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    image: string;
  };
}

export interface ArticleResponse {
  articles: Article[];
  articlesCount: number;
}
