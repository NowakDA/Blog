import { QuestionCircleOutlined } from '@ant-design/icons';

import { Article } from '@entities/articles/model/ArticleTypes.ts';

import { formatDate } from '@shared/lib/formatDate.ts';

import { FC } from 'react';

import { Button, Popconfirm } from 'antd';

import { useNavigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import heartEmpty from './assets/heart-empty.svg';
import heartRed from './assets/red-heart.svg';

import {
  useDeleteAnArticleMutation,
  useToggleFavoriteMutation,
} from '@entities/articles/api/articlesApi';

import './ArticlePreview.less';
import { selectIsAuthenticated, selectUser } from '@entities/user/model/userSlice';

const ArticlePreview: FC<Article> = ({
  title,
  slug,

  description,
  tagList,
  createdAt,
  favorited,
  favoritesCount,
  author,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [deleteArticle] = useDeleteAnArticleMutation();
  const [toggleFavorite] = useToggleFavoriteMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthor = isAuthenticated && author.username === user?.username;

  const handleFavoriteClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await toggleFavorite({ slug, favorited }).unwrap();
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteArticle(slug).unwrap();

      navigate('/');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };
  const handleClick = () => {
    if (location.pathname !== `/article/${slug}`) {
      navigate(`/article/${slug}`);
    }
  };

  return (
    <div className="article-preview" onClick={handleClick}>
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

      <div className="article-wrapper">
        <div className="description">{description}</div>
        {isAuthor && (
          <div className="article-actions">
            <Popconfirm
              title="Delete the article"
              description="Are you sure to delete this article?"
              onConfirm={confirmDelete}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button danger className="delete-btn">
                Delete
              </Button>
            </Popconfirm>

            <Button className="edit-btn" ghost onClick={() => navigate(`/article/${slug}/edit`)}>
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePreview;
