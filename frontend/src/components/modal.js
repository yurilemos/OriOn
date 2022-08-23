import React from 'react';
import { Modal as AntdModal } from 'antd';

const Modal = ({ children, onOk, visible, onCancel, title }) => {
  return (
    <AntdModal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      {children}
    </AntdModal>
  );
};

export default Modal;
