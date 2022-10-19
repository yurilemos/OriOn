import React from 'react';
import Modal from '../../../components/modal';
import useUserList from '../hooks/userGroupHooks';
import Table from '../../../components/table';
import { useState } from 'react';
import { Button, Select, Spin } from 'antd';

const UserModal = ({ open, onClose, groupId, userId }) => {
  const [search, setSearch] = useState(null);
  const [userAddResquest, setUserAddResquest] = useState([]);
  const {
    userList,
    searchList,
    searchLoading,
    addToUserList,
    deleteUserFromGroup,
    changeUserPermission,
  } = useUserList({
    groupId,
    search,
  });

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      render: (text) => {
        return text;
      },
    },
    {
      title: 'e-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tipo usuário',
      dataIndex: 'nivel_participacao',
      key: 'nivel_participacao',
      render: (value, record) => {
        if (value === 1) {
          return 'Administrador';
        }
        return (
          <Select
            style={{
              width: 120,
            }}
            defaultValue={value}
            onChange={(e) => {
              changeUserPermission({
                nivel_participacao: e,
                userId: record.id,
              });
            }}
          >
            <Select.Option value={2}>Editor</Select.Option>
            <Select.Option value={3}>Leitor</Select.Option>
          </Select>
        );
      },
    },
    {
      title: 'Ação',
      key: 'acao',
      render: (_, record) =>
        userId !== record.id && (
          <Button
            type="link"
            block
            onClick={(e) => {
              deleteUserFromGroup(record.id);
            }}
          >
            Deletar
          </Button>
        ),
    },
  ];

  return (
    <>
      <Modal
        visible={open}
        onOk={onClose}
        onCancel={onClose}
        width={1000}
        title="Gerenciar usuários"
        footer={[
          <Button key="back" type="primary" onClick={onClose}>
            Ok
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Table columns={columns} dataSource={userList} />
          <h3>Adicionar um novo membro para o grupo</h3>
          <Select
            mode="multiple"
            showSearch
            optionFilterProp="children"
            value={userAddResquest}
            onChange={(v) => {
              setUserAddResquest(v);
            }}
            onSearch={(e) => {
              setSearch(e);
            }}
            notFoundContent={searchLoading ? <Spin size="small" /> : null}
          >
            {searchList
              ?.filter((s) => !userList.find((u) => u.id === s.id))
              ?.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.nome}
                </Select.Option>
              ))}
          </Select>
          {userAddResquest.length > 0 && (
            <Button
              style={{ width: 200 }}
              onClick={() => {
                addToUserList({ userList: userAddResquest });
                setUserAddResquest([]);
              }}
            >
              Adicionar membro(s)
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UserModal;
