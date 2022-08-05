import React from 'react';
import { Input as AntInput } from 'antd';

export const Input = ({ placeholder, label }) => {
  return <AntInput placeholder={placeholder} size="large" />;
};
