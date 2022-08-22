import React from 'react';
import { notification } from 'antd';

export const openNotification = ({ message, type }) => {
  if (type === 'error') {
    notification.error({
      message: `${message}`,
      placement: 'top',
    });
  } else {
    notification.info({
      message: `${message}`,
      placement: 'top',
    });
  }
};
