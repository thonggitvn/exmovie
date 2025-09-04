import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { userService } from '../../service/userService';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("✅ Form values:", values); // Log khi form submit thành công

    try {
      const payload = {
        taiKhoan: values.taiKhoan.trim(),
        matKhau: values.matKhau,
        email: values.email.trim(),
        soDT: values.soDT?.trim() || '',
        maNhom: 'GP01',
        hoTen: values.hoTen?.trim() || '',
      };

      console.log("📤 Payload gửi API:", payload);

      const res = await userService.register(payload);
      console.log("📥 API response:", res);

      message.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (err) {
      console.error("❌ API error:", err);
      const msg = err?.response?.data?.content || err?.message || 'Đăng ký thất bại';
      message.error(String(msg));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.warn("⚠️ Form validation failed:", errorInfo);
  };

  const validatePasswordConfirm = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('matKhau') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
    },
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Đăng ký tài khoản</h1>

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={false}
          initialValues={{ maNhom: 'GP01' }}
        >
          <Form.Item
            label="Tài khoản"
            name="taiKhoan"
            rules={[
              { required: true, message: 'Vui lòng nhập tài khoản' },
              { max: 20, message: 'Tối đa 20 ký tự' },
            ]}
          >
            <Input placeholder="Nhập tài khoản (tối đa 10 ký tự)" />
          </Form.Item>

          <Form.Item
            label="Họ tên"
            name="hoTen"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="soDT"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^\d{9,11}$/, message: 'Số điện thoại 9–11 chữ số' },
            ]}
          >
            <Input placeholder="098xxxxxxx" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 6, message: 'Ít nhất 6 ký tự' },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="matKhauConfirm"
            dependencies={['matKhau']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu' },
              validatePasswordConfirm,
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full mt-2">
            Đăng ký
          </Button>

          <div className="text-center mt-4 text-sm">
            Đã có tài khoản? <Link to="/login" className="text-blue-600">Đăng nhập</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
