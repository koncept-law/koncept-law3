import React, { useRef, useState } from "react";
import { Modal } from "antd";
import { Button } from "@material-tailwind/react";
import { LuDownload } from "react-icons/lu";
import { FaRegFolderOpen } from "react-icons/fa";

const ExportModal = ({ visible = false, onCancel = function(){} }) => {
    const inpRef = useRef(null);
    const [fileName, setFileName] = useState(""); // State to keep track of the selected file name

    // Handler for file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file ? file.name : "Choose a File");
    };

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            centered
            closable={false}
            okText="Export"
            footer={[]}
            className="custom-modal rounded-sm"
        >
            <div className="py-2.5">
                <h2 className="font-poppins not-italic px-3 leading-normal text-xl font-semibold text-[#000000]">
                    Export Using Custom List
                </h2>
                <div className="h-[1px] bg-slate-400 w-full my-2"></div>
                <div className="flex flex-col justify-start items-start p-3">
                    <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-800 capitalize py-2 px-4 rounded-md shadow-sm hover:shadow-sm w-full flex justify-between text-lg items-center gap-x-1.5">
                        <LuDownload size={"22px"} />
                        <span className="w-full text-center">Download Template</span>
                    </Button>

                    <div
                        className="flex w-full justify-center cursor-pointer text-lg gap-x-2 items-center rounded-md border-[3px] border-dotted border-slate-600 py-4 my-3"
                        onClick={() => {
                            inpRef.current.click();
                        }}
                    >
                        <FaRegFolderOpen size={"22px"} />
                        <span>{fileName || "Choose a File"}</span>
                    </div>
                </div>
                <input
                    type="file"
                    ref={inpRef}
                    className="hidden"
                    onChange={handleFileChange} // Handle file input changes
                />
                <div className="h-[1px] bg-slate-400 w-full my-2"></div>
                <div className="flex justify-end gap-x-1 px-2 items-center my-1">
                    <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-700 capitalize py-2 px-3 rounded-md shadow-sm hover:shadow-sm flex justify-center items-center gap-x-1.5">
                        <LuDownload size={"18px"} />
                        <span className="w-full text-center">Export List</span>
                    </Button>

                    <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-700 capitalize py-2 px-3 rounded-md shadow-sm hover:shadow-sm flex justify-center items-center gap-x-1.5">
                        <LuDownload size={"18px"} />
                        <span className="w-full text-center">Export Document</span>
                    </Button>

                    <Button className="font-poppins not-italic leading-normal text-white font-medium bg-slate-600 capitalize py-2 px-3 rounded-md shadow-sm hover:shadow-sm flex justify-center items-center gap-x-1.5" onClick={onCancel}>
                        <span className="w-full text-center">Close</span>
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ExportModal;
