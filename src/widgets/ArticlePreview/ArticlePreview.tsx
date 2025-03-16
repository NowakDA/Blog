import { QuestionCircleOutlined } from '@ant-design/icons';

import { Article } from '@entities/articles/model/ArticleTypes.ts';

import { formatDate } from '@shared/lib/formatDate.ts';

import { FC } from 'react';

import { Button, Popconfirm } from 'antd';

import { useNavigate, Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import heartEmpty from './assets/heart-empty.svg';
import heartRed from './assets/red-heart.svg';
import { RootState } from '@app/store';
import { useDeleteAnArticleMutation } from '@entities/articles/api/articlesApi';

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
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
  const [deleteArticle] = useDeleteAnArticleMutation();
  const navigate = useNavigate();
  const isAuthor = isAuthenticated && author.username === user?.username;

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onFavoriteClick(slug, favorited);
  };

  const confirmDelete = async () => {
    try {
      await deleteArticle(slug).unwrap();

      navigate('/');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
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
            <Link to={'/edit-article'}>
              <Button className="edit-btn" ghost>
                Edit
              </Button>{' '}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePreview;
