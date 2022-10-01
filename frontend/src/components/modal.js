import React from 'react';
import { Modal as AntdModal } from 'antd';

const Modal = ({ children, onOk, visible, onCancel, title, width }) => {
  return (
    <AntdModal
      title={title}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={width}
      destroyOnClose
      forceRender
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
