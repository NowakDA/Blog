import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { Rule } from 'antd/es/form';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { setUser } from '../../store/userSlice';
import { useSignInMutation } from '../../store/apiSlice';

import './SignInForm.less';

const SignIn: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn, { isLoading, error }] = useSignInMutation();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await signIn(values).unwrap();
      dispatch(setUser(response.user));
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="sign-in-container">
      <h2 className="sign-in-title">Sign In</h2>

      <Form className="sign-in-form" onFinish={handleLogin} layout="vertical">
        <Form.Item
          name="email"
          label="Email address"
          rules={[
            { required: true, message: 'Please enter your email' } as Rule,
            { type: 'email', message: 'Invalid email format' } as Rule,
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' } as Rule]}
        >
          <Input.Password
            placeholder="Password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        {error && (
          <div className="sign-in-error">
            {'data' in error && typeof error.data === 'string'
              ? error.data
              : 'Something went wrong, please try again.'}
          </div>
        )}

        <Form.Item>
          <Button className="login-btn" type="primary" htmlType="submit" block disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form.Item>
      </Form>
      <p className="signin-text">
        Don't have an account? <Link to="/sign-up"> Sign Up. </Link>
      </p>
    </div>
  );
};

export default SignIn;
