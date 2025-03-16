import { FC } from 'react';
import './ErrorMessage.less';

const ErrorMessage: FC = () => {
  return (
    <div className="error-message">
      <span className="error-icon">⚠️</span>
      <p>Something went wrong</p>
    </div>
  );
};

export default ErrorMessage;
