import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { setUser } from '@entities/user/model/userSlice';
import { useUpdateUserMutation, useGetCurrentUserQuery } from '@entities/user/api/userApi';
import { validateFormRegex } from '@shared/lib/regex';
import { FieldError, FormValues } from '@features/auth/models/authTypes';
import './UserSettings.less';
import Loading from '@shared/ui/Loading/Loading';

const UserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading: isLoadingUser, error: userError } = useGetCurrentUserQuery();
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const [form] = Form.useForm();

  const initialValues = data?.user
    ? {
        username: data.user.username || '',
        email: data.user.email || '',
        bio: data.user.bio || '',
        Avatar: data.user.image || '',
        password: '',
      }
    : {};

  const handleUpdateUser = async (values: FormValues) => {
    try {
      const response = await updateUser(values).unwrap();
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

  if (isLoadingUser) return <Loading />;
  if (userError) return <Alert message="Failed to load user data" type="error" />;

  return (
    <div className="edit-profile">
      <h2>Edit profile</h2>
      <Form
        form={form}
        onFinish={handleUpdateUser}
        initialValues={initialValues}
        layout="vertical"
        className="edit-form"
      >
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
            { type: 'email', message: 'Invalid email format' },
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
          label="New password"
          rules={[
            { required: true, message: 'Please enter your new password' },
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
            placeholder="New password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item
          name="Avatar"
          label="Avatar (url)"
          rules={[
            { type: 'url', warningOnly: true },
            { type: 'string', min: 6 },
          ]}
        >
          <Input placeholder="Avatar image" />
        </Form.Item>
        {error && <div className="sign-up-error">⛔️ Update failed</div>}
        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={isLoading}>
            {isLoading ? 'Saving' : 'Save'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserSettings;
