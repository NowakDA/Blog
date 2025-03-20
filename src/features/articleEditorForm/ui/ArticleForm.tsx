import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Article } from '@entities/articles/model/ArticleTypes';
import {
  useCreateAnArticleMutation,
  useGetArticleQuery,
  useUpdateAnArticleMutation,
} from '@entities/articles/api/articlesApi';
import { setCurrentPage } from '@widgets/Pagination/model/paginationSlice';
import { Form, Input, Button, Tag } from 'antd';
import './ArticleForm.less';

const ArticleForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const isEditing = location.pathname.endsWith('/edit');

  const { data: currentArticle } = useGetArticleQuery(slug, { skip: !isEditing });

  useEffect(() => {
    if (isEditing && currentArticle) {
      setTags(currentArticle.article.tagList || []);
      form.setFieldsValue({
        title: currentArticle.article.title,
        description: currentArticle.article.description,
        body: currentArticle.article.body,
      });
    }
  }, [currentArticle, isEditing, form]);

  useEffect(() => {
    if (!isEditing) {
      form.resetFields();
      setTags([]);
    }
  }, [isEditing, form]);

  const [createArticle, { isLoading: createLoading }] = useCreateAnArticleMutation();
  const [updateArticle, { isLoading: updateLoading }] = useUpdateAnArticleMutation();

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmitArticle = async (
    values: Omit<
      Article,
      | 'slug'
      | 'createdAt'
      | 'favorited'
      | 'favoritesCount'
      | 'author'
      | 'onClick'
      | 'onFavoriteClick'
    >,
  ) => {
    try {
      if (isEditing && currentArticle) {
        await updateArticle({
          ...values,
          tagList: tags,
          slug: currentArticle.article.slug,
        }).unwrap();
        navigate(`/article/${currentArticle.article.slug}`);
      } else {
        const response = await createArticle({ ...values, tagList: tags }).unwrap();

        dispatch(setCurrentPage(1));

        navigate(`/article/${response.article.slug}`);
      }
    } catch (err) {
      console.error(isEditing ? 'Failed to edit article:' : 'Failed to create article:', err);
    }
  };

  return (
    <Form form={form} className="create-form" layout="vertical" onFinish={handleSubmitArticle}>
      <h2>{isEditing ? 'Edit article' : 'Create new article'}</h2>

      <Form.Item
        label="Title"
        name="title"
        rules={[
          { required: true, message: 'Please enter a title' },
          {
            validator: (_, value) =>
              value && value.trim()
                ? Promise.resolve()
                : Promise.reject(new Error('Title cannot be empty or contain only spaces')),
          },
          { max: 300, message: 'Title cannot be more than 300 characters' },
        ]}
      >
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item
        label="Short description"
        name="description"
        rules={[
          { required: true, message: 'Please enter a short description' },
          {
            validator: (_, value) =>
              value && value.trim()
                ? Promise.resolve()
                : Promise.reject(
                    new Error('Short description cannot be empty or contain only spaces'),
                  ),
          },
          { max: 1000, message: 'Description cannot be more than 1000 characters' },
        ]}
      >
        <Input placeholder="Short description" />
      </Form.Item>

      <Form.Item
        label="Text"
        name="body"
        rules={[
          { required: true, message: 'Please enter the article text' },
          {
            validator: (_, value) =>
              value && value.trim()
                ? Promise.resolve()
                : Promise.reject(new Error('Text cannot be empty or contain only spaces')),
          },
          { max: 4000, message: 'Text cannot be more than 4000 characters' },
        ]}
      >
        <Input.TextArea rows={4} placeholder="Text" />
      </Form.Item>

      <Form.Item label="Tags">
        <div className="tags-container">
          {tags.map((tag) => (
            <Tag key={tag} closable onClose={() => handleRemoveTag(tag)} color="blue">
              {tag}
            </Tag>
          ))}
        </div>
        <div className="tag-actions">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Tag"
            onPressEnter={handleAddTag}
          />
          <Button type="primary" onClick={handleAddTag} disabled={!tagInput.trim()}>
            Add tag
          </Button>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" block htmlType="submit" disabled={createLoading || updateLoading}>
          {isEditing
            ? updateLoading
              ? 'Updating...'
              : 'Update'
            : createLoading
              ? 'Creating...'
              : 'Send'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ArticleForm;
