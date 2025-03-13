import { Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import { UserOutlined } from '@ant-design/icons';

import { logout } from '../../store/userSlice';

import './Header.less';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);

  // const { data} = useGetCurrentUserQuery();
  // const user= data?.user
  // const isAuthenticated2=Boolean(user?.token)

  console.log(user);

  return (
    <div className="header">
      <Link to="/">
        <Button className="header__text" color="default" variant="link">
          Realworld Blog
        </Button>
      </Link>

      <div className="header__actions">
        {isAuthenticated ? (
          <div className="auth-wrapper">
            <Button className="create-article">Create article</Button>
            <Link to="/profile">
              <span className="header__username">
                {user?.username || localStorage.getItem('username')}
              </span>
              <Avatar size={46} src={user?.image} icon={!user?.image ? <UserOutlined /> : null} />
            </Link>
            <Button className="btn btn-logout" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Link to="/sign-in">
              <Button className="btn btn-in" color="default" variant="link">
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button className="btn btn-up">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
