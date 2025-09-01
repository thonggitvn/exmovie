import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { userService } from "../../service/userService";

const shema = yup.object({
  taiKhoan: yup
    .string()
    .trim()
    .max(10, "Trường tài khoản chỉ được nhập tối đa 10 ký tự")
    .required("Trường này không được để trống"),
  hoTen: yup.string().typeError("Họ tên phải là chuỗi"),
  soDT: yup
    .string()
    .matches(
      /^(?:\+?84|0)(?:3[2-9]|5[25689]|7(?:0|[6-9])|8[1-9]|9[0-9])\d{7}$/,
      "Số điện thoại phải là số việt nam"
    )
    .required("Trường này không được để trống"),
});

const UserInfoPage = () => {
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(shema),
    mode: "onChange",
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
    },
  });

  const handleSubmitValueForm = async (dataForm) => {
    console.log("dataForm: ", dataForm);

    try {
      await userService.upDateInfoUser({ ...dataForm, maNhom: "GP00" });

    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchInfoUser = async () => {
    try {
      const response = await userService.getInfoUser();
      console.log("response: ", response);
      const { email, hoTen, maLoaiNguoiDung, maNhom, matKhau, soDT, taiKhoan } =
        response.data.content;

      reset({
        taiKhoan,
        matKhau,
        hoTen,
        email,
        soDT,
        maLoaiNguoiDung, 
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchInfoUser();
  }, []);

  console.log("errors.taiKhoan?.message: ", errors.taiKhoan?.message);

  return (
    <div className="flex flex-col items-center justify-center">
      <h3>Thông tin người dùng</h3>

      <div className="border-2 rounded-2xl shadow-2xl p-8">
        <form
          onSubmit={handleSubmit(handleSubmitValueForm)}
          className="space-y-3"
        >
          {/* Tài khoản */}
          <div>
            <p className="w-full">Tài khoản</p>
            <input
              {...register("taiKhoan")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.taiKhoan?.message}</p>
          </div>
          {/* Mật khẩu */}
          <div>
            <p className="w-full">Mật khẩu</p>
            <input
              {...register("matKhau")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.matKhau?.message}</p>
          </div>
          {/* Họ tên */}
          <div>
            <p className="w-full">Họ tên</p>
            <input
              {...register("hoTen")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.hoTen?.message}</p>
          </div>
          {/* Email */}
          <div>
            <p className="w-full">Email</p>
            <input
              {...register("email")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          {/* Số điện thoại */}
          <div>
            <p className="w-full">Số điện thoại</p>
            <input
              {...register("soDT")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.soDT?.message}</p>
          </div>
          {/* Mã người dùng */}

          <div>
            <p className="w-full">Mã loại người dùng</p>

            <select {...register("maLoaiNguoiDung")}>
              <option value="khachHang">Khách hàng</option>
              <option value="quanTri">Quản trị</option>
            </select>
            <p className="text-red-500">{errors.maLoaiNguoiDung?.message}</p>
          </div>

          <button className="mt-3 bg-purple-400 p-2 rounded text-white">
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoPage;
