import { Image, Form, Input, Upload } from 'antd';
import React from 'react';
import Button from '../../components/button';
import { useState } from 'react';
import useProfile from './hooks/meuPerfil';
import { useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import AuthContext from '../../utils/auth';
import { ProfilePic } from '../../components/profilePic';

export const Perfil = () => {
  const [isDisable, setDisable] = useState(true);
  const [form] = Form.useForm();

  const [deleteAvatar, setDeleteAvatar] = useState(false);
  const { updateUser } = useContext(AuthContext);

  const { user, editUser } = useProfile({ updateUser });

  const handleProfileType = (id) => {
    if (id === 3) return 'Administrador';
    return 'Membro';
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.file;
  };

  useEffect(() => {
    form.setFieldsValue({
      nome: user?.nome,
      avatar: user?.avatar || '',
    });
  }, [form, user]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '1rem',
        marginLeft: '2rem',
      }}
    >
      <Button
        onClick={() => {
          setDisable(!isDisable);
          setDeleteAvatar(false);
        }}
      >
        {isDisable ? 'Editar' : 'Cancelar'}
      </Button>
      <Form
        onFinish={(value) => {
          editUser({
            nome: value.nome,
            avatar: value.upload?.thumbUrl
              ? value.upload.thumbUrl
              : !deleteAvatar
              ? user?.avatar
              : null,
          });
          setDisable(!isDisable);
        }}
        form={form}
      >
        <div>
          <ProfilePic avatar={deleteAvatar ? '' : user?.avatar ?? ''} />
          {!isDisable && user?.avatar && !deleteAvatar && (
            <Button
              variant="primary"
              icon={<DeleteOutlined />}
              style={{ width: '50px' }}
              onClick={(event) => {
                event.stopPropagation();
                setDeleteAvatar(true);
              }}
            />
          )}
          {!isDisable && (
            <Form.Item
              name="upload"
              valuePropName="avatar"
              getValueFromEvent={normFile}
            >
              <Upload.Dragger
                listType="picture-card"
                height={100}
                accept=".png,.jpg"
              >
                Clique aqui ou arraste uma imagem <br /> para atualizar a imagem
                de perfil
              </Upload.Dragger>
            </Form.Item>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <div>
            <h1>Nome:</h1>
            <Form.Item
              name="nome"
              rules={[
                {
                  required: true,
                  message: 'O nome é obrigatório!',
                },
              ]}
            >
              <Input style={{ width: '100%' }} disabled={isDisable} />
            </Form.Item>
          </div>
          {!isDisable && (
            <Button
              onClick={() => {
                form.submit();
              }}
            >
              Confirmar
            </Button>
          )}
          <div>
            <h1>Email:</h1>
            <p>{user?.email}</p>
          </div>
          <div>
            <h1>Perfil:</h1>
            <p>{handleProfileType(user?.profile)}</p>
          </div>
        </div>
      </Form>
    </div>
  );
};
