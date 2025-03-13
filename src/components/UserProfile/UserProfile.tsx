import { useEffect } from 'react';

import { Alert, Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { UserProfileFormValues } from './UserTypes';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { setUser } from '../../store/userSlice';
import { useUpdateUserMutation, useGetCurrentUserQuery } from '../../store/apiSlice';

import './UserProfile.less';

const UserProfile = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { data, isLoading: isLoadingUser, error: userError } = useGetCurrentUserQuery();
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const [form] = Form.useForm();

  useEffect(() => {
    if (data?.user) {
      form.setFieldsValue({
        username: data.user.username || '',
        email: data.user.email || '',
        bio: data.user.bio || '',
        image: data.user.image || '',
        password: '',
      });
    }
  }, [data, form]);

  const handleUpdateUser = async (values: UserProfileFormValues) => {
    try {
      const response = await updateUser(values).unwrap();
      dispatch(setUser(response.user));
      alert('User updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (isLoadingUser) return <p>Loading user data...</p>;
  if (userError) return <Alert message="Failed to load user data" type="error" />;

  return (
    <div>
      <h2>Edit profile</h2>
      <Form form={form} onFinish={handleUpdateUser} layout="vertical">
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
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item
          name="password"
          label="New password"
          rules={[{ message: 'Please enter your new password' }]}
        >
          <Input.Password
            placeholder="New password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item name="image" label="Avatar image (url)">
          <Input placeholder="Avatar image" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={isLoading}>
            {isLoading ? 'Saving' : 'Save'}
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message="Error updating user" type="error" />}
    </div>
  );
};

export default UserProfile;
