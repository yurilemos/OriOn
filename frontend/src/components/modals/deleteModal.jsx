import React from 'react';
import Modal from '../modal';
import { WarningOutlined } from '@ant-design/icons';

const DeleteModal = (props) => {
  return (
    <Modal
      visible={props.open}
      onCancel={props.onClose}
      onOk={() => {
        props.onFinish();
      }}
      title={props.title}
      width={600}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItemns: 'center',
          gap: '1rem',
          textAlign: 'center',
        }}
      >
        <WarningOutlined style={{ fontSize: '3rem', color: 'red' }} />
        <h2>{props.subtitle}</h2>
        <p>{props.description}</p>
      </div>
    </Modal>
  );
};

export default DeleteModal;
