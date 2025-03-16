import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setUser } from '@entities/user/model/userSlice';
import { useSignUpMutation } from '@features/auth/api/authApi';
import { validateFormRegex } from '@shared/lib/regex';
import { FieldError, FormValues } from '@features/auth/models/authTypes';

import './SignUpForm.less';

const SignupForm: FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp, { isLoading, error }] = useSignUpMutation();

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await signUp(values).unwrap();
      dispatch(setUser(response.user));
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.status === 422 && err.data?.errors) {
        const fieldErrors: FieldError[] = Object.entries(err.data.errors).map(
          ([field, message]) => ({
            name: field,
            errors: [message as string],
          }),
        );

        form.setFields(fieldErrors);
      }
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
          rules={[
            { required: true, message: 'Please enter your username' },
            { max: 20, min: 3, message: 'Username must be between 3 and 20 characters' },
            {
              pattern: validateFormRegex,
              message: 'Username must contain only lowercase latin letters and numbers',
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email address"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Enter a valid email' },
            {
              pattern: validateFormRegex,
              message: 'Email must contain only lowercase latin letters and numbers',
            },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please enter your password' },
            {
              max: 40,
              min: 6,
              message: 'Password must be between 6 and 40 characters',
            },
            {
              pattern: validateFormRegex,
              message: 'Password must contain only lowercase latin letters and numbers',
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item
          hasFeedback
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

        {error && <div className="sign-up-error">⛔️ Signup failed</div>}

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
