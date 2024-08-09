import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { LuLogOut, LuUser } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunkMiddleware } from "../../../redux/features/user";
import { toastify } from "../../toast";
import NotificationModal from "../../../common/modals/NotificationModal";
import { Button } from "@material-tailwind/react";

import "./CustomMenu.css";
import SwitchUserBox from "../users/SwitchUserBox";
// import AddUser from "../users/addUser";

const DashboardNavbar = () => {
    const { singleUser } = useSelector(state => state.campaigns);
    const dispatch = useDispatch();
    const [OpenNotification, setOpenNotification] = useState(false);
    const [open, setOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const logoutHandle = () => {
        dispatch(logoutThunkMiddleware());
        toastify({ msg: "Logout Successfully", type: "success" });
    };

    const userMenu = (
        <Menu 
            className="custom-menu"
            style={{ width: 250, backgroundColor: '#1e293b' }} // Set background color here
        >
            <Menu.Item key="account" onClick={() => setOpen(true)}>
                <span>Switch Account</span>
            </Menu.Item>
            <Menu.Item key="addUser" onClick={() => setAddOpen(true)}>
                <span>Add User</span>
            </Menu.Item>
            <Menu.Item key="profile">
                <span>Profile</span>
            </Menu.Item>
            <Menu.Item key="logout" onClick={logoutHandle}>
                <span>Logout</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <NotificationModal isVisible={OpenNotification} onClose={() => setOpenNotification(false)} />
            <SwitchUserBox open={open} setOpen={setOpen} />
            {/* <AddUser open={addOpen} setOpen={()=>setAddOpen(false)} /> */}

            <nav className="bg-white w-full flex justify-between shadow-md shadow-slate-200 items-center py-1.5 px-3">
                <h2 className="font-poppins not-italic leading-normal font-medium text-lg">
                    {singleUser?.firstName + (singleUser?.lastName ? ` ${singleUser?.lastName}` : "")}
                </h2>
                <div className="flex justify-center items-center gap-x-2">
                    <Button className="font-poppins font-medium text-white bg-blue-700 p-2" onClick={() => setOpenNotification(true)}>
                        <FaRegBell size={"18px"} />
                    </Button>

                    <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
                        <Button className="font-poppins font-medium text-white bg-green-700 p-2">
                            <LuUser size={"18px"} />
                        </Button>
                    </Dropdown>

                    <Button className="font-poppins font-medium text-white bg-red-700 p-2" title="logout" onClick={logoutHandle}>
                        <LuLogOut size={"18px"} />
                    </Button>
                </div>
            </nav>
        </>
    );
};

export default DashboardNavbar;
