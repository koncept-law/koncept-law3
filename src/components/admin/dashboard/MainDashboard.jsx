import React, { useEffect, useRef, useState } from "react";

import { Button } from "@material-tailwind/react";

import { LuSearch } from "react-icons/lu";
import { FaFileExport } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoReloadSharp } from "react-icons/io5";
import DetailsCard from "../../../common/cards/DetailsCard";
import Stats from "../campaigns/campaignDetails/Stats";

import { LuDownload } from "react-icons/lu";
import { IoEyeSharp } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { MdAccountBox, MdEmail, MdSms, MdWhatsapp } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import ExportModal from "../../../common/modals/ExportModal";
import AddCampaign from "../campaigns/AddCampaign";
import { downloadCampaignFilesThunkMiddleware, getAllCampaignThunkMiddleware, setCampaigns } from "../../../redux/features/campaigns";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const StatsCard = ({ title, value, icon, iconClass = "", textClass = "" }) => {
    return (
        <>
            <div
                key={value}
                className="bg-white rounded-md cursor-pointer flex w-full items-center  px-4 py-2 shadow-lg "
            >
                <div className="flex items-center gap-y-2 gap-x-5">
                    <div className={` w-fit h-fit p-2.5 rounded-full text-white text-xl ${iconClass}`}>
                        {icon}
                    </div>
                    <div>
                        <h1 className={`font-bold text-2xl ${textClass}`}>{value}</h1>
                        <h1 className=" font-medium text-[14px] font-poppins not-italic leading-normal">{title}</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

const MainDashboard = () => {
    const { campaignDetails, allCampaigns, singleUser } = useSelector(
        (state) => state.campaigns
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();;

    const { user } = useSelector(state => state.user);
    const permission = (user?.email === "hdfc" ? false: true);

    const [isOpenExport, setIsOpenExport] = useState(false);
    const [isOpenAddCampaign, setIsOpenAddCampaign] = useState(false);

    useEffect(() => {
        if (singleUser) {
            console.log("singleUser", singleUser);
            dispatch(getAllCampaignThunkMiddleware({ accountId: singleUser?.accountId }));
        }
    }, [singleUser]);

    useEffect(() => {
        try {
            if (allCampaigns) {
                dispatch(setCampaigns({ campaignDetails: [...allCampaigns].reverse()[0] }));
            }
        } catch (err) {
            console.error("Error: MainDashboard Campaign Details Reverse:", err);
        }
    }, [allCampaigns]);

    const refresh = () => {
        dispatch(getAllCampaignThunkMiddleware({ accountId: singleUser?.accountId }));
    }

    const data = [
        {
            title: "Total Documents",
            value: campaignDetails?.totalMainFilesUploaded ? campaignDetails?.totalMainFilesUploaded : 0,
            icon: <MdAccountBox size={"20px"} />,
            iconClass: "bg-[#0284c7]",
            textClass: "text-[#0284c7]",
        },
        {
            title: "Total SMS",
            value: campaignDetails?.totalSms ? campaignDetails?.totalSms : 0,
            icon: <MdSms size={"20px"} />,
            iconClass: "bg-[#3b82f6]",
            textClass: "text-[#3b82f6]",
        },
        {
            title: "Total Email",
            value: campaignDetails?.totalEmail ? campaignDetails?.totalEmail : 0,
            icon: <MdEmail size={"20px"} />,
            iconClass: "bg-[#c026d3]",
            textClass: "text-[#c026d3]",
        },
        {
            title: "Total Whatsapp",
            value: campaignDetails?.totalWhatsappSms
                ? campaignDetails?.totalWhatsappSms
                : 0,
            icon: <MdWhatsapp size={"21px"} className="text-white" />,
            iconClass: "bg-green-500",
            textClass: "text-green-500",
        },
        {
            title: "Click Reports",
            value: campaignDetails?.totalReports
                ? campaignDetails?.totalReports
                : 0,
            icon: <FiFileText size={"20px"} className="text-white" />,
            iconClass: "bg-[#3b82f6]",
            textClass: "text-[#3b82f6]",
        },
    ];

    const searchRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = allCampaigns?.filter(item => {
        return (
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return <>
        <Stats />

        <ExportModal visible={isOpenExport} onCancel={() => setIsOpenExport(false)} />
        <AddCampaign modal={isOpenAddCampaign} toggle={() => setIsOpenAddCampaign(false)} />

        <div className="flex gap-x-2 justify-start my-2 w-full items-center">
            <div className="flex justify-center border border-solid overflow-hidden rounded-md">
                <input ref={searchRef} type="text" placeholder="Search Campaign Name" className="outline-none px-2 py-1 w-[200px]" onChange={(e)=> setSearchQuery(e.target.value)} />
                <Button className="bg-slate-800 px-2 flex justify-center items-center shadow-none py-1 hover:shadow-none rounded-none text-white" onClick={()=> {
                    searchRef.current.value = "";
                    setSearchQuery("");
                }}>
                    <RxCross2 size={"17px"} />
                </Button>
            </div>

            <div className="flex justify-center border border-solid overflow-hidden rounded-md">
                <input type="text" placeholder="Enter Unique Account Number" className="outline-none px-2 py-1 w-[250px]" />
                <Button className="bg-slate-800 px-3 flex justify-center items-center shadow-none py-1 hover:shadow-none rounded-none text-white">
                    <LuSearch size={"16px"} />
                </Button>
            </div>
            <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-800 capitalize py-1 px-4 rounded-md shadow-sm hover:shadow-sm flex justify-center items-center text-[14px] gap-x-1.5" onClick={() => setIsOpenExport(true)}>
                <FaFileExport size={"17px"} />
                <span>Export</span>
            </Button>

            <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-800 capitalize py-1 px-4 rounded-md shadow-sm hover:shadow-sm flex justify-center items-center text-[14px] gap-x-1.5" onClick={() => setIsOpenAddCampaign(true)}>
                <FaPlus size={"17px"} />
                <span>Add</span>
            </Button>

            <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-800 capitalize py-1.5 px-4 rounded-md shadow-sm hover:shadow-sm flex justify-center items-center text-[14px] gap-x-1.5" onClick={refresh}>
                <IoReloadSharp size={"17px"} />
            </Button>
        </div>

        <div className="flex justify-center mt-3 items-center h-[70vh] w-full">
            <div className="w-1/2 h-full custom-scroll px-2 overflow-y-scroll">
                {
                    // allCampaigns ? [...allCampaigns]?.reverse()?.map((data, index) => (<DetailsCard key={index} data={data} active={data?.name === campaignDetails?.name} />)) : <h2>Loading...</h2>
                    filteredData ? [...filteredData]?.reverse()?.map((data, index) => (<DetailsCard key={index} data={data} active={data?.name === campaignDetails?.name} />)) : <h2>Loading...</h2>
                }
            </div>
            <div className="w-full h-full flex flex-col p-3 justify-start items-start ">
                <div className="w-full flex justify-between items-start">
                    <h2 className="font-semibold font-poppins not-italic leading-normal text-lg text-[#000000]">{campaignDetails?.name}</h2>
                    <div className="grid grid-cols-3 gap-y-1 justify-center items-center gap-x-2">
                        <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-800 capitalize py-0.5 px-1 rounded-md shadow-sm hover:shadow-sm flex justify-center text-[14px] items-center gap-x-1.5">
                            <LuDownload size={"18px"} />
                            <span>Sample</span>
                        </Button>

                        <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-800 capitalize py-1 px-1 rounded-md shadow-sm hover:shadow-sm flex justify-center text-[14px] items-center gap-x-1.5" onClick={() => {
                            navigate("/campaigns/documenttemplates");
                        }}>
                            <IoEyeSharp size={"18px"} />
                            <span>Documents</span>
                        </Button>

                        <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-800 capitalize py-1 px-1 rounded-md shadow-sm hover:shadow-sm flex justify-center text-[14px] items-center gap-x-1.5">
                            <IoEyeSharp size={"18px"} />
                            <span>PDF</span>
                        </Button>

                        <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-800 capitalize py-1 px-1 rounded-md shadow-sm hover:shadow-sm flex justify-center text-[14px] items-center gap-x-1.5">
                            <IoEyeSharp size={"18px"} />
                            <span>Links</span>
                        </Button>

                        <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-800 capitalize py-1 px-1 rounded-md shadow-sm hover:shadow-sm flex justify-center text-[14px] items-center gap-x-1.5" onClick={() => {
                            dispatch(
                                downloadCampaignFilesThunkMiddleware({
                                    campaignName: campaignDetails?.name,
                                    campaignType: campaignDetails?.type,
                                })
                            );
                        }}>
                            <LuSend size={"18px"} />
                            <span>Campaign</span>
                        </Button>

                        <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-800 capitalize py-1 px-1 rounded-md shadow-sm hover:shadow-sm flex justify-center text-[13px] items-center gap-x-1.5" onClick={() => {
                            navigate("/campaigns/campaigndetails/reports");
                        }}>
                            <IoEyeSharp size={"18px"} />
                            <span>Campaign Details</span>
                        </Button>
                    </div>
                </div>

                <div className="h-[1px] bg-gray-400 w-full my-2"></div>

                <div className="grid w-full gap-4 justify-start items-start grid-cols-3">
                    {data?.map((item, index) => (
                        <StatsCard
                            key={index}
                            value={item.value}
                            title={item.title}
                            icon={item.icon}
                            iconClass={item?.iconClass}
                            textClass={item?.textClass}
                        />
                    ))}
                </div>
            </div>
        </div>
    </>
}

export default MainDashboard;