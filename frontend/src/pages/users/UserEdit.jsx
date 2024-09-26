import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAPI } from "../../services/UserAPI";
import { Form, Input, Button, Spin, Card, Row, Col, notification } from "antd";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(true);

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
      await UserAPI.patch(id, updatedValues);

      notification.success({
        message: "Başarılı",
        description: "Kullanıcı başarıyla güncellendi.",
        placement: "topRight",
      });
      navigate("/"); 

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
    <Card title="Kullanıcı Güncelle">
      <Form
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
              rules={[{ required: true, message: "Lütfen soyisminizi girin!" }]}
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
              rules={[{ required: true, message: "Lütfen rolünüzü girin!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Yaş"
              name="age"
              rules={[{ required: true, message: "Lütfen yaşınızı girin!" }]}
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
                { required: true, message: "Lütfen telefon numaranızı girin!" },
              ]}
            >
              <Input />
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
  );
};

export default UserEdit;
