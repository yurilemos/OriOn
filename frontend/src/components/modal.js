import React from 'react';
import { Modal as AntdModal } from 'antd';

const Modal = ({ children, onOk, visible, onCancel, title, width, footer }) => {
  return (
    <AntdModal
      title={title}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      cancelButtonProps={!onCancel ?? { style: { display: 'none' } }}
      cancelText="Cancelar"
      width={width}
      destroyOnClose
      forceRender
      footer={footer}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
