import React, { useState } from "react";
import { Button, Drawer } from "antd";

const NavBarMobile = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p className="text-white font-bold " type="primary" onClick={showDrawer}>
        Login/Logout
      </p>
      <Drawer
        // title="Action phim"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        placement="left"
      >
        <button className="bg-pink-400 p-2">Đăng nhập</button>
        <br />
        <br />
        <br />
        <button className="bg-pink-400 p-2">Đăng ký</button>
      </Drawer>
    </>
  );
};

export default NavBarMobile;
