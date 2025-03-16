import { FC } from 'react';

import { Avatar, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { UserOutlined } from '@ant-design/icons';
import { logout } from '@entities/user/model/userSlice';

import { RootState } from '../../app/store';

import './Header.less';

const Header: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
  console.log('user: ', user);

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
            <Link to="/create-article">
              <Button className="create-article">Create article</Button>
            </Link>
            <Link to="/profile">
              <span className="header__username">{user?.username}</span>
              <Avatar size={46} src={user?.image} icon={!user?.image ? <UserOutlined /> : null} />
            </Link>
            <Button
              className="btn btn-logout"
              onClick={() => {
                dispatch(logout());
                navigate('/');
              }}
            >
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
