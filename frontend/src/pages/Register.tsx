import { Form, Input, Button, Card } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { callRegister } from '../util/api'; // bạn cần tạo API này tương tự callLogin

const Register = () => {
  const navigate = useNavigate();

    const onFinish = async (values: any) => {
    const { username, password, confirmPassword } = values;

    if (password !== confirmPassword) {
        toast.error("Mật khẩu xác nhận không khớp!");
        return;
    }

    const res = await callRegister(username, password);

    if (res?.data) {
        toast.success(res.message || "Đăng ký thành công!");
        navigate("/login");
    } else {
        // 🔥 Chuẩn hóa message trước khi hiển thị
        const errMsg = Array.isArray(res?.message)
        ? res.message.join(', ')
        : res?.message || "Đăng ký thất bại!";
        toast.error(errMsg);
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
      <Card title="Đăng ký tài khoản" style={{ width: 400 }}>
        <Form name="register-form" layout="vertical" onFinish={onFinish}>
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

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Mật khẩu xác nhận không khớp!');
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng ký
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <a onClick={() => navigate('/login')}>Đã có tài khoản? Đăng nhập</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
