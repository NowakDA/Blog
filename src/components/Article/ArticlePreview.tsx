import { FC } from 'react';

import { formatDate } from '../../utils/formatDate.ts';
import heartEmpty from '../../assets/heart-empty.svg';
import heartRed from '../../assets/red-heart.svg';
import { Article } from './ArticleTypes';

import './ArticlePreview.less';

const ArticlePreview: FC<Article> = ({
  title,
  slug,
  description,
  tagList,
  createdAt,
  favorited,
  favoritesCount,
  author,
  onClick,
  onFavoriteClick,
}) => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onFavoriteClick(slug, favorited);
  };

  return (
    <div className="article-preview" onClick={onClick}>
      <div className="article-content column">
        <a href="#" className="article-title">
          {title}
        </a>
        <button className="favorite-btn" onClick={handleFavoriteClick} disabled={!isAuthenticated}>
          {favorited ? <img src={heartRed} alt="like" /> : <img src={heartEmpty} alt="like" />}
        </button>
        <span className="likes">{favoritesCount}</span>
        <div className="tags-container">
          {tagList.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="author-info column">
        <div className="author-details">
          <span className="author-name">{author.username}</span>
          <span className="publish-date">{formatDate(createdAt)}</span>
        </div>
        <img className="avatar" src={author.image} alt="Avatar" />
      </div>
      <span className="description">{description}</span>
    </div>
  );
};

export default ArticlePreview;
