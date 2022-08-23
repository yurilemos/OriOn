import { Select as AntdSelect } from 'antd';
import React from 'react';
const { Option } = AntdSelect;

const Select = ({ options, onChange, style, defaultValue }) => (
  <AntdSelect
    defaultValue={defaultValue}
    style={{
      width: 120,
      ...style,
    }}
    onChange={onChange}
  >
    {options.map((option) => (
      <Option value={option.value}>{option.label}</Option>
    ))}
  </AntdSelect>
);

export default Select;
