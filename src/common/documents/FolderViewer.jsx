import React from "react";

// icons
import { FaRegFolderOpen } from "react-icons/fa"; // folder

const FolderViewer = ({ folders = "" }) => {
    return <>
        <div className="h-full w-full overflow-y-scroll">
            <div className="flex justify-start items-center text-[#000] py-2 gap-x-2 px-3 bg-[#42cae88d] w-full cursor-pointer">
                <FaRegFolderOpen size={"18px"} />
                <span>{folders !== "" ? folders: "..."}</span>
            </div>
        </div>
    </>
}

export default FolderViewer;