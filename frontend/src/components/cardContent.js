import React from 'react';
import Button from './button';
import { PlusOutlined } from '@ant-design/icons';

const CardContent = ({
  title,
  description,
  children,
  visibility,
  creation,
  onClick,
  onCreate,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '2000px',
        border: '1px solid #d4d4d4',
        boxSizing: 'border-box',
        borderRadius: '2px',
        position: 'relative',
        height: 'fit-content',
        cursor: onClick ? 'pointer' : 'normal',
      }}
      onClick={onClick ? onClick : () => {}}
    >
      <div
        style={{
          borderBottom: '1px solid #d4d4d4',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        {onCreate && (
          <Button
            variant="primary"
            icon={<PlusOutlined />}
            style={{ width: '50px' }}
            onClick={onCreate}
          />
        )}
      </div>
      {description && (
        <div
          style={{
            borderBottom: '1px solid rgba(0,0,0,.06)',
            padding: '1rem',
            color: 'rgb(140 135 135)',
          }}
        >
          {description}
        </div>
      )}
      <div style={{ padding: '2rem' }}>{children}</div>
      <div
        style={{
          borderTop: '1px solid rgba(0,0,0,.06)',
          padding: '1rem',
          color: 'rgb(140 135 135)',
        }}
      >
        {creation}
      </div>
    </div>
  );
};

export default CardContent;
