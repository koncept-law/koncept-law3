import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from 'antd';
import logo from "./../../../assets/konceptLogo.png";
import { BsFillSendFill } from "react-icons/bs";
import './CustomMenu.css'; // Import the custom CSS file
import SwitchUserBox from "../users/SwitchUserBox.jsx";


// icons
import { FaFolderOpen } from "react-icons/fa6"; // folder
import { IoCall } from "react-icons/io5"; // phone
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const DashBoardSideBar = () => {
    // Define the menu items for the dropdown
    const [open, setOpen] = useState(false);
    const { singleUser } = useSelector((state) => state.campaigns);
    const navigate = useNavigate();

    const dropdownMenu = (
        <Menu
            className="custom-menu" // Apply custom class here
            style={{ width: 250, backgroundColor: '#1e293b' }} // Set background color here
        >
            <h2 className="w-full text-start text-white not-italic leading-normal font-poppins font-medium px-2 py-1">Marketing</h2>
            <h2 className="w-full my-1 h-[1px] bg-gray-600"></h2>
            <Menu.Item key="1" className="w-full" onClick={() => {
                navigate("/campaigns/documenttemplates");
            }}>
                <div className="w-full flex justify-start gap-x-3 py-1.5 items-center text-white">
                    <FaFolderOpen size={"18px"} />
                    <span className="font-poppins not-italic leading-normal font-light text-[15px]">Document Templates</span>
                </div>
            </Menu.Item>
            <Menu.Item key="2" className="w-full" onClick={() => {
                navigate("/my-number");
            }}>
                <div className="w-full flex justify-start gap-x-3 py-1.5 items-center text-white">
                    <IoCall size={"18px"} />
                    <span className="font-poppins not-italic leading-normal font-light text-[15px]">My Numbers</span>
                </div>
            </Menu.Item>
            {/* <Menu.Item key="3" className="w-full">
                <div className="w-full flex justify-start gap-x-3 py-1.5 items-center text-white">
                    <IoCall size={"18px"} />
                    <span className="font-poppins not-italic leading-normal font-light text-[15px]">My Numbers</span>
                </div>
            </Menu.Item> */}
        </Menu>
    );

    const userBox = () => {
        setOpen(true)
    }

    useEffect(() => {
        if(!singleUser){
            setOpen(true);
        }
    }, [singleUser]);

    return <>
        <SwitchUserBox open={open} setOpen={setOpen} />
        <div className="bg-slate-800 h-screen flex flex-col px-2 justify-start items-center sticky top-0 left-0">
            <img src={logo} alt="logo" className="w-12 h-10 cursor-pointer my-3" onClick={userBox} />
            <div className="flex flex-col justify-center w-full items-center my-3">
                {/* <Dropdown
                    overlay={dropdownMenu}
                    trigger={['hover']}
                    placement="rightBottom"
                    overlayStyle={{ width: 200 }} // Optional: Ensure consistency in width
                >
                    <button className="flex flex-col justify-center hover:bg-slate-700 active:bg-slate-800 py-2 transition-all duration-200 px-2 rounded-md items-center w-full text-white cursor-pointer">
                        <BsFillSendFill size={"22px"} />
                        <span className="font-poppins not-italic leading-normal text-[12px] mt-1 font-medium">Mktg</span>
                    </button> 
                </Dropdown> */}
                <Button key="1" className="w-full shadow-none p-0 hover:shadow-none" onClick={() => {
                    navigate("/campaigns/documenttemplates");
                }}>
                    <div className="w-full flex justify-start flex-col gap-x-3 py-1.5 items-center text-white">
                        <FaFolderOpen size={"18px"} />
                        <span className="font-poppins capitalize not-italic leading-normal font-light text-[12px]">Docs</span>
                    </div>
                </Button>

                <Button key="1" className="w-full shadow-none p-0 my-2 hover:shadow-none" onClick={() => {
                    navigate("/my-number");
                }}>
                    <div className="w-full flex justify-start flex-col gap-x-3 py-1.5 items-center text-white">
                        <IoCall size={"18px"} />
                        <span className="font-poppins not-italic leading-normal capitalize font-light text-[12px]">Num</span>
                    </div>
                </Button>
            </div>
        </div>
    </>
}

export default DashBoardSideBar;
