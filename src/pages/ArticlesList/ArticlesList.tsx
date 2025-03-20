import { Article } from '@entities/articles/model/ArticleTypes';

import { censorshipRegex } from '@shared/lib/regex';

import PagePagination from '@widgets/Pagination/ui/Pagination.tsx';

import { FC, useState } from 'react';

import { Switch } from 'antd';

import { useSelector } from 'react-redux';

import { useGetArticlesQuery } from '@entities/articles/api/articlesApi';
import ArticlePreview from '@widgets/ArticlePreview/ArticlePreview';
import Loading from '@shared/ui/Loading/Loading';
import './ArticlesList.less';
import ErrorMessage from '@shared/ui/ErrorMassage/ErrorMessage';
import { selectCurrentPage, selectLimit } from '@widgets/Pagination/model/paginationSlice';

const ArticlesList: FC = () => {
  const currentPage = useSelector(selectCurrentPage);
  const limit = useSelector(selectLimit);
  const [showSensitive, setShowSensitive] = useState(false);

  const { data, error, isLoading } = useGetArticlesQuery({
    offset: (currentPage - 1) * limit,
    limit,
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;
  if (!data) return null;

  const allArticles: Article[] = data?.articles ?? [];
  const filteredArticles: Article[] =
    data?.articles?.filter((article: Article) => {
      const textToCheck = article.title + ' ' + article.description + ' ' + article.body;
      const hasBadWords = censorshipRegex.test(textToCheck);
      const hasBadTags = article.tagList.some((tag: string) => censorshipRegex.test(tag));

      return !hasBadWords && !hasBadTags;
    }) || [];

  const hasHiddenArticles = data.articles.length > filteredArticles.length;

  return (
    <>
      {hasHiddenArticles && (
        <div className="sensitive-msg">
          <span>
            Articles that may contain offensive content are hidden. Use the toggle switch to see
            them
          </span>
          <Switch
            checked={showSensitive}
            onChange={() => setShowSensitive(!showSensitive)}
            style={{ marginLeft: '10px' }}
          />
        </div>
      )}
      <div className="articles-list">
        {(showSensitive ? allArticles : filteredArticles).map((article: Article) => (
          <ArticlePreview
            key={article.slug}
            title={article.title}
            slug={article.slug}
            description={article.description}
            body={article.body}
            tagList={article.tagList}
            createdAt={article.createdAt}
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
            author={article.author}
          />
        ))}
      </div>
      <PagePagination totalArticles={data?.articlesCount || 0} />
    </>
  );
};

export default ArticlesList;
