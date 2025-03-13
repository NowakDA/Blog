import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { setCurrentPage, setLimit } from '../../store/paginationSlice';

import './Pagination.less';

interface PagePaginationProps {
  totalArticles: number;
}

const PagePagination: React.FC<PagePaginationProps> = ({ totalArticles }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
  const limit = useSelector((state: RootState) => state.pagination.limit);

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
