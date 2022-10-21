import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

export const AvatarPic = ({ avatar, width, height }) => {
  return (
    <Avatar
      width={width ?? 200}
      height={height ?? 200}
      chape="circle"
      src={avatar ?? ''}
      icon={<UserOutlined />}
    />
  );
};
