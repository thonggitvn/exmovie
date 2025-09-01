import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { userService } from '../../service/userService';
import { useDispatch, useSelector } from 'react-redux';
import { setInfoUserAction } from '../../stores/user';
import { localStorageUtil ,keysLocalStorage} from '../../util/localStorage';
import { Navigate, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import ThePanda from '../../asset/ThePanda.json'


const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const LoginPage  = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {infoUser} = useSelector ((state)=> state.userSlice);

 


  const onFinish = async (values) => {
      try {
        console.log('Success:', values);
        const reponseLogin = await userService.login(values);
        console.log("reponseLogin:", reponseLogin);
        const infoUser = reponseLogin.data.content;
        // lưu thông tin user vào redux
        dispatch(setInfoUserAction(infoUser));
        // luu thông tin user vào localStorage
        localStorageUtil.set(keysLocalStorage.INFO_USER,infoUser)
        // đá user về trnag chủ
        navigate("/");
      } catch (error) {
          console.log("error:",error);
          
      }
};
  
  
  return (
    <div className='p-2 rounded-2xl bg-gray-300 opacity-98 flex items-center'> 
      
        {/* icon */}
        <div className='w-80'>
          <Lottie animationData={ThePanda} />
        </div>

        {/* form */}
        <div>
          <h3 className='text-2xl font-bold text-center py-4' > Đăng nhập </h3> 

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="taiKhoan"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="matKhau"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
        </Form>
        </div>
        
    </div>
  )
}

export default LoginPage 