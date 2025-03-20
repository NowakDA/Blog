import { FC } from 'react';

import { Pagination } from 'antd';
import { PaginationProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentPage, selectLimit, setCurrentPage, setLimit } from '../model/paginationSlice';

import './Pagination.less';

interface PagePaginationProps {
  totalArticles: number;
}

const PagePagination: FC<PagePaginationProps> = ({ totalArticles }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const limit = useSelector(selectLimit);

  const handlePagination: PaginationProps['onChange'] = (page) => {
    dispatch(setCurrentPage(page));
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    dispatch(setCurrentPage(current));
    dispatch(setLimit(pageSize));
  };

  return (
    <Pagination
      align="center"
      current={currentPage}
      defaultCurrent={1}
      total={totalArticles}
      pageSize={limit}
      showSizeChanger
      pageSizeOptions={[5, 10, 15]}
      onShowSizeChange={onShowSizeChange}
      onChange={handlePagination}
    />
  );
};

export default PagePagination;
