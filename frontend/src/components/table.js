import { Space, Table as AntTable, Tag } from 'antd';
import React from 'react';

const Table = ({ columns, dataSource }) => (
  <AntTable columns={columns} dataSource={dataSource} />
);

export default Table;
