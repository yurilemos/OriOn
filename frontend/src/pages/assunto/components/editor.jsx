import { Form, Button, Select } from 'antd';
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

const Editor = ({
  onSubmit,
  submitting,
  defaultValue,
  onCancel,
  disable,
  relations,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (disable) {
      return;
    }
    form.setFieldsValue({ conteudo: defaultValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, disable]);

  if (disable) {
    return <></>;
  }
  const style = relations ? { width: '70%' } : { width: '100%' };

  return (
    <>
      {!disable && (
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
          <div style={{ display: 'flex' }}>
            <Form.Item
              name="conteudo"
              rules={[
                {
                  required: true,
                  message: 'Para comentar é necessário digital algo',
                },
              ]}
              style={style}
            >
              <ReactQuill
                modules={modules}
                theme="snow"
                placeholder="Digite aqui"
              />
            </Form.Item>
            {relations && (
              <div style={{ marginLeft: '1rem' }}>
                <p>Tipo de relação (opcional)</p>
                <Form.Item name="relacao_id">
                  <Select
                    style={{
                      width: 170,
                    }}
                  >
                    {relations.map((relation) => (
                      <Select.Option key={relation.id} value={relation.id}>
                        {relation.nome}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            )}
          </div>

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
      )}
    </>
  );
};

export default Editor;
