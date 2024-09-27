import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserAPI } from "../../services/UserAPI";
import {
  Form,
  Input,
  Button,
  Spin,
  Card,
  Row,
  Col,
  notification,
  Breadcrumb,
  Select,
} from "antd";
import InputMask from "react-input-mask";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const fetchUserDetail = async (id) => {
    try {
      const response = await UserAPI.get(id);
      setUserDetail(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserDetail(id);
  }, [id]);

  const handleUpdate = async (values) => {
    try {
      const { try_password, ...updatedValues } = values;
      const response = await UserAPI.patch(id, updatedValues);
      if (response?.error) {
        notification.error({
          message: "Hata",
          description: "Aynı Emaile kayıtlı kullanıcı mevcut.",
          placement: "topRight",
        });
      }else{
        notification.success({
          message: "Başarılı",
          description: "Kullanıcı başarıyla güncellendi.",
          placement: "topRight",
        });
        navigate("/");
      }
      
     
    } catch (err) {
      console.error(err);
      notification.error({
        message: "Hata",
        description: "Güncellemeyi yaparken bir hata oluştu.",
        placement: "topRight",
      });
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      <Col span={24}>
        <Card style={{ margin: "16px 0" }}>
          <Row justify="end">
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">Kullanıcı Listesi</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Kullanıcı Güncelle</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Card>
      </Col>
      <Card title="Kullanıcı Güncelle">
        <Form
          form={form} 
          initialValues={{
            ...userDetail,
            password: "",
          }}
          onFinish={handleUpdate}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="İsim"
                name="name"
                rules={[{ required: true, message: "Lütfen isminizi girin!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Soyisim"
                name="surname"
                rules={[
                  { required: true, message: "Lütfen soyisminizi girin!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Şifre"
                name="password"
                rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
              >
                <Input.Password placeholder="Yeni şifreyi girin" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Yeni Şifreyi Tekrar Gir"
                name="try_password"
                rules={[
                  { required: true, message: "Lütfen şifrenizi girin!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Şifreler eşleşmiyor!"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Yeni şifreyi girin" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                label="Rol"
                name="role"
                rules={[{ required: true, message: "Lütfen rolünüzü seçin!" }]}
              >
                <Select placeholder="Rol seçin">
                  <Select.Option value="user">Kullanıcı</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Yaş"
                name="age"
                rules={[
                  { required: true, message: "Lütfen yaşınızı girin!" },
                  {
                    validator(_, value) {
                      if (
                        value === undefined ||
                        value === null ||
                        value === ""
                      ) {
                        return Promise.reject(
                          new Error("Lütfen yaşınızı girin!")
                        );
                      }
                      if (value < 0) {
                        return Promise.reject(
                          new Error("Yaş 0'dan küçük olamaz!")
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Geçerli bir email girin!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Telefon"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Lütfen telefon numaranızı girin!",
                  },
                  {
                    validator(_, value) {
                      if (!value || /^\(\d{3}\) \d{3} \d{4}$/.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Telefon numarası geçerli formatta olmalıdır!"
                        )
                      );
                    },
                  },
                ]}
              >
                <InputMask
                  mask="(999) 999 9999"
                  maskChar={null}
                  placeholder="Örnek: (555) 555 5555"
                  onBlur={(e) => {
                    const value = e.target.value;
                    form.validateFields(["phone"]).catch((info) => {
                      console.log("Validation Failed:", info);
                    });
                  }}
                >
                  {(inputProps) => <Input {...inputProps} maxLength={14} />}
                </InputMask>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ülke"
                name="country"
                rules={[{ required: true, message: "Lütfen ülkenizi girin!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="İlçe"
                name="district"
                rules={[{ required: true, message: "Lütfen ilçenizi girin!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Güncelle
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="button"
                  style={{ width: "100%" }}
                  onClick={() => navigate(`/`)}
                  danger
                >
                  İptal
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default UserEdit;
