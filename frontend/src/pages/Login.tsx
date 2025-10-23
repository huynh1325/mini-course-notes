import { Form, Input, Button, Card, message, notification } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { callLogin } from '../util/api';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { username, password } = values;
    const res = await callLogin(username, password);
    if (res?.data) {
        localStorage.setItem('access_token', res.data.access_token);
        console.log(res)
        toast.success(res.message || "Đăng nhập thành công!")
        navigate("/");
    } else {
      toast.error(res.message || "Đăng nhập thất bại!")
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5',
      }}
    >
      <Card title="Đăng nhập hệ thống" style={{ width: 400 }}>
        <Form
          name="login-form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <a onClick={() => navigate('/register')}>Chưa có tài khoản? Đăng ký</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
