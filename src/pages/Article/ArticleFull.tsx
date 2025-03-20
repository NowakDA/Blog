import { FC } from 'react';

import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import Loading from '@shared/ui/Loading/Loading';
import ArticlePreview from '@widgets/ArticlePreview/ArticlePreview';
import { useGetArticleQuery } from '@entities/articles/api/articlesApi';

import './ArticleFull.less';
import ErrorMessage from '@shared/ui/ErrorMassage/ErrorMessage';

const ArticleFull: FC = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useGetArticleQuery(slug);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  const article = data.article;

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
      />

      <div className="article-body">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ArticleFull;
