import Search from '../../../components/search';
import React from 'react';
import Modal from '../../../components/modal';
import useUserList from '../hooks/userGroupHooks';

const UserModal = ({ open, onClose, onSearch, groupId }) => {
  const { userList } = useUserList({ groupId });

  return (
    <Modal
      visible={open}
      onCancel={onClose}
      onOk={() => {}}
      title="Gerenciar usuários"
    >
      <div>
        <Search
          onSearch={(e) => {
            onSearch(e);
          }}
        />
      </div>
    </Modal>
  );
};

export default UserModal;
