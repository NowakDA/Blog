import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { JSX } from 'react/jsx-runtime';
import { useGetArticleQuery } from '@entities/articles/api/articlesApi';
import { selectIsAuthenticated, selectUser } from '@entities/user/model/userSlice';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const isAuth = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectUser);
  const { slug } = useParams();

  const isEditing = location.pathname.endsWith('/edit');
  const { data: articleData, isLoading } = useGetArticleQuery(slug, { skip: !isEditing });

  if (!isAuth) {
    return <Navigate to="/sign-in" replace />;
  }

  if (isEditing) {
    if (isLoading) return null;

    const articleAuthor = articleData?.article.author.username;

    if (currentUser?.username !== articleAuthor) {
      return <Navigate to={`/article/${slug}`} replace />;
    }
  }

  return element;
};

export default PrivateRoute;
