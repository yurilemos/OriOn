import React from 'react';
import { Button as AntdButton } from 'antd';

const Button = ({ onClick, style }) => {
  return <AntdButton onClick={onClick} style={{ width: 400, ...style }} />;
};

export default Button;
