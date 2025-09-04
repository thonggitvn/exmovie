import React, { useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { userService } from "../../service/userService";
import { useDispatch, useSelector } from "react-redux";
import { setInfoUserAction } from "../../stores/user";
import { localStorageUtil, keysLocalStorage } from "../../util/localStorage";

const { Option } = Select;

const UserInfoPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.userSlice.infoUser);

  // ✅ Lấy dữ liệu user khi vào trang
  const fetchUserInfo = async () => {
    try {
      const res = await userService.getInfoUser();
      const userData = res?.data?.content;
      if (userData) {
        form.setFieldsValue(userData);
        dispatch(setInfoUserAction(userData));
        localStorageUtil.set(keysLocalStorage.INFO_USER, userData);
      }
    } catch (err) {
      console.error("❌ Get info error:", err);
      message.error("Không tải được thông tin người dùng");
    }
  };

  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Submit cập nhật user
  const onFinish = async (values) => {
    try {
      const payload = {
        taiKhoan: values.taiKhoan?.trim(),
        matKhau: values.matKhau,
        email: values.email?.trim(),
        soDT: values.soDT?.trim(),
        hoTen: values.hoTen?.trim(),
        maNhom: "GP01",
        maLoaiNguoiDung: values.maLoaiNguoiDung || "KhachHang",
      };

      console.log("📤 Payload update:", payload);

      await userService.upDateInfoUser(payload);

      // ✅ Gọi lại getInfoUser để lấy bản mới nhất
      const res = await userService.getInfoUser();
      const userData = res?.data?.content;
      dispatch(setInfoUserAction(userData));
      localStorageUtil.set(keysLocalStorage.INFO_USER, userData);

      message.success("Cập nhật thành công!");
    } catch (error) {
      console.error("❌ Update error:", error);
      message.error(error?.response?.data?.content || "Cập nhật thất bại");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Cập nhật thông tin
      </h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ maLoaiNguoiDung: "KhachHang" }}
      >
        <Form.Item label="Tài khoản" name="taiKhoan">
          <Input disabled /> {/* tài khoản không cho sửa */}
        </Form.Item>

        <Form.Item
          label="Họ tên"
          name="hoTen"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="soDT"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            { pattern: /^\d{9,11}$/, message: "Số điện thoại 9–11 chữ số" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Loại người dùng"
          name="maLoaiNguoiDung"
          rules={[{ required: true, message: "Vui lòng chọn loại người dùng" }]}
        >
          <Select>
            <Option value="KhachHang">Khách hàng</Option>
            <Option value="QuanTri">Quản trị</Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-full mt-2">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default UserInfoPage;
