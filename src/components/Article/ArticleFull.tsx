import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import ArticlePreview from './ArticlePreview';
import {
  useGetArticleQuery,
  useFavoritAnArticleMutation,
  useUnFavoritAnArticleMutation,
} from '../../store/apiSlice';

import './ArticleFull.less';

const ArticleFull: FC = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useGetArticleQuery(slug);
  const [favoritAnArticle] = useFavoritAnArticleMutation();
  const [unFavoritAnArticle] = useUnFavoritAnArticleMutation();

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке</p>;
  const article = data.article;

  const handleFavorite = async (slug: string, favorited: boolean) => {
    try {
      if (favorited) {
        await unFavoritAnArticle(slug).unwrap();
      } else {
        await favoritAnArticle(slug).unwrap();
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <div className="article-full">
      <ArticlePreview
        key={article.slug}
        slug={article.slug}
        title={article.title}
        description={article.description}
        body={article.body}
        tagList={article.tagList}
        createdAt={article.createdAt}
        favorited={article.favorited}
        favoritesCount={article.favoritesCount}
        author={article.author}
        onClick={() => {}}
        onFavoriteClick={(slug, favorited) => handleFavorite(slug, favorited)}
      />

      <div className="article-body">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ArticleFull;
