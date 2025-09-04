import { axiosCustom } from "./config";

export const userService = {
  // ✅ Đăng ký
  register: (payload) => {
    return axiosCustom.post("/QuanLyNguoiDung/DangKy", payload);
  },

  // ✅ Đăng nhập
  login: (infoUser) => {
    return axiosCustom.post("/QuanLyNguoiDung/DangNhap", infoUser);
  },

  // ✅ Lấy thông tin người dùng
  getInfoUser: () => {
    return axiosCustom.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  },

  // ✅ Cập nhật thông tin
  upDateInfoUser: (infoUser) => {
    return axiosCustom.put(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      infoUser
    );
  },

  // ✅ Lấy danh sách user
  getListUser: () => {
    return axiosCustom.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
  },

  // ✅ Xoá user
  deleteUser: (taiKhoan) => {
    return axiosCustom.delete(
      `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  },
};
