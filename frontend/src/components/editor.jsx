import { Form, Button } from 'antd';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['image'],
  ],
};

const Editor = ({ onSubmit, submitting, defaultValue, onCancel, disable }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ conteudo: defaultValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);
  return (
    <Form
      onFinish={(value) => {
        if (value === '<p><br></p>') {
          form.setFieldsValue({ conteudo: '' });
        } else {
          onSubmit(value);
        }
      }}
      form={form}
    >
      <Form.Item
        name="conteudo"
        rules={[
          {
            required: true,
            message: 'Para comentar é necessário digital algo',
          },
        ]}
      >
        <ReactQuill modules={modules} theme="snow" placeholder="Digite aqui" />
      </Form.Item>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Form.Item>
          <Button htmlType="submit" loading={submitting} type="primary">
            Comentar
          </Button>
        </Form.Item>
        {onCancel && (
          <Button htmlType="submit" onClick={onCancel} type="primary">
            Cancelar
          </Button>
        )}
      </div>
    </Form>
  );
};

export default Editor;
