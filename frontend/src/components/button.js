import React from 'react';
import { Button as AntdButton } from 'antd';

const Button = ({
  children,
  onClick,
  style,
  variant = 'outlined',
  htmlType,
  type,
  icon,
}) => {
  return (
    <AntdButton
      onClick={onClick}
      variant={variant}
      style={{ width: 250, ...style }}
      htmlType={htmlType}
      type={type}
      icon={icon}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
