import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@app/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { Article } from '@entities/articles/model/ArticleTypes';
import {
  useCreateAnArticleMutation,
  useUpdateAnArticleMutation,
} from '@entities/articles/api/articlesApi';
import { setCurrentPage } from '@widgets/Pagination/model/paginationSlice';
import { Form, Input, Button, Tag } from 'antd';
import './ArticleForm.less';

const ArticleForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isEditing = location.pathname.startsWith('/edit-article');

  const currentArticle = useSelector(
    (state: RootState) => state.currentArticle.currentArticle,
  ) as Article | null;

  useEffect(() => {
    if (isEditing && currentArticle) {
      setTags(currentArticle.tagList || []);
    }
  }, [currentArticle, isEditing]);

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
        await updateArticle({ ...values, tagList: tags, slug: currentArticle.slug }).unwrap();
        navigate(`/article/${currentArticle.slug}`);
      } else {
        await createArticle({ ...values, tagList: tags }).unwrap();
        dispatch(setCurrentPage(1));
        navigate('/');
      }
    } catch (err) {
      console.error(isEditing ? 'Failed to edit article:' : 'Failed to create article:', err);
    }
  };

  return (
    <Form
      className="create-form"
      layout="vertical"
      onFinish={handleSubmitArticle}
      initialValues={isEditing && currentArticle ? currentArticle : undefined}
    >
      <h2>{isEditing ? 'Edit article' : 'Create new article'}</h2>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter a title' }]}
      >
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item
        label="Short description"
        name="description"
        rules={[{ required: true, message: 'Please enter a short description' }]}
      >
        <Input placeholder="Short description" />
      </Form.Item>

      <Form.Item
        label="Text"
        name="body"
        rules={[{ required: true, message: 'Please enter the article text' }]}
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
