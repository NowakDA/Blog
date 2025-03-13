import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { useSignUpMutation } from '../../store/apiSlice';

import './SignupForm.less';

const SignupForm: FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp, { isLoading, error }] = useSignUpMutation();

  const handleSubmit = async (values: { username: string; email: string; password: string }) => {
    try {
      const response = await signUp(values).unwrap();
      dispatch(setUser(response.user));
      alert('Registration successful!');
      navigate('/');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="signup-container">
      <Form
        form={form}
        className="signup-form"
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={true}
      >
        <h2>Create new account</h2>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email address"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            placeholder="Password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Repeat Password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[{ required: true, message: 'You must agree before submitting' }]}
        >
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>

        {error && <div className="sign-up-error">⛔️ 'Signup failed'</div>}

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isLoading} block>
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </Form.Item>

        <p className="signin-text">
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </p>
      </Form>
    </div>
  );
};

export default SignupForm;
