import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentTemplateTopBar from "./DocumentTemplateTopBar";

// changes by devankar
// import AllCampaignsSidebar from "./AllCampaignsSidebar.jsx";
import AllDocumentSidebar from "./AllDocumentSidebar";
import { getAllTemplateFilesThunkMiddleware } from "../../../../redux/features/campaigns";
import { setLoader } from "../../../../redux/features/loaders";
import axios from "axios";
import { logoutThunkMiddleware } from "../../../../redux/features/user";
import { toastify } from "../../../toast";
import DocumentTemplateCard from "./DocumentTemplateCard";
import DocumentViewer from "../../../../common/documents/DocumentViewer";
import {  FaPlus } from "react-icons/fa6";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { Button } from "@material-tailwind/react";
import { CategoriesModal } from "./DocumentTemplateModal/CategoryModal";
import { TemplateModal } from "./DocumentTemplateModal/TemplateModal";
import FolderViewer from "../../../../common/documents/FolderViewer";
import { BiLeftArrow } from "react-icons/bi";
import CreateTemplateModal from "./DocumentTemplateModal/CreateTemplateModal";
// import { getAllCampaignThunkMiddleware } from "../../../../redux/features/campaigns";
// import { gettingCampaignDetailsData } from "../../../../redux/features/campaigns";

const DocumentTemplates = () => {
  const dispatch = useDispatch();
  const { documentTemplateFiles } = useSelector((state) => state.campaigns);
  const [SelectFile, setSelectFile] = useState({});
  // console.log("document template files ", documentTemplateFiles)

  // modals variables 
  const [categoriesModal, setCategoriesModal] = useState(false);
  const [templateModal, setTemplateModal] = useState(false)
  const [OpenFolderSection, setOpenFolderSection] = useState(false);

  const getDocumentTemplates = async () => {
    dispatch(getAllTemplateFilesThunkMiddleware());
  };

  useEffect(() => {
    getDocumentTemplates();
  }, [dispatch]);

  useEffect(() => { }, [documentTemplateFiles]);

  return (
    <>
    {categoriesModal && <CategoriesModal categoriesModal={categoriesModal} setCategoriesModal={setCategoriesModal} />}
    {templateModal && <TemplateModal templateModal={templateModal} setTemplateModal={setTemplateModal} />}
    {/* <CreateTemplateModal open={templateModal} setTemplateModal={setTemplateModal} /> */}
      <div className="relative h-full w-full px-2 py-2 flex gap-2 md:gap-4 flex-col">
        {/* <button className="bg-blue-600 text-white">Refresh</button> */}
        <DocumentTemplateTopBar title="Document Templates" path="/dashboard" />
        <div className="flex gap-2 flex-col">
          {/* <CreateFolderStructure /> */}
          {/* <div className="w-full">
            <AllDocumentSidebar
              data={documentTemplateFiles && documentTemplateFiles.length > 0 ? documentTemplateFiles : []}
            // refreshData={refreshCampaignData}
            />
          </div> */}
          <div className="w-full h-auto gap-x-2 border-t border-solid py-1 flex justify-start items-start">
            <div className="w-[45%] relative flex flex-col justify-start items-start h-[80vh]">
            <div className={`transition-all z-30 duration-300 overflow-x-hidden ${OpenFolderSection ? "w-full": "w-0"} absolute top-0 left-0 flex flex-col bg-gray-100 justify-start items-start h-full`}>
              <button className="text-[#000] flex justify-start gap-x-2 items-center cursor-pointer px-3 py-3" onClick={() => setOpenFolderSection(false)}>
                <RxCross2 size={"17px"} />
                <span>Close Folder</span>
              </button>
              <FolderViewer folders={documentTemplateFiles ? documentTemplateFiles[0]?.folderName: '...'} />
            </div>
              <div className="flex flex-col justify-start w-[95%] gap-y-1 items-start">

                <div className="flex gap-x-2 my-1 justify-start items-center">
                  {/* <h2 className="font-poppins not-italic leading-normal font-semibold text-lg">Templates</h2> */}
                  {/* <button className="cursor-pointer p-2" onClick={()=> setOpenFolderSection(true)}>
                    <RxHamburgerMenu size={"18px"} />
                  </button> */}
                  <Button className='buttonBackground capitalize flex justify-center items-center cursor-pointer text-[14px] py-1 px-2 gap-x-1.5 font-poppins not-italic leading-normal font-medium rounded-md text-white' onClick={() => setOpenFolderSection(!OpenFolderSection)}>
                    Open Folder
                  </Button>

                  <Button className='buttonBackground capitalize flex justify-center items-center cursor-pointer text-[14px] py-1 px-2 gap-x-1.5 font-poppins not-italic leading-normal font-medium rounded-md text-white' onClick={() => setTemplateModal(true)}>
                    <FaPlus size={"14px"} />
                    Create Template
                  </Button>
                  <Button className='buttonBackground capitalize flex justify-center items-center cursor-pointer text-[14px] py-1 px-2 gap-x-1.5 font-poppins not-italic leading-normal font-medium rounded-md text-white' onClick={() => setCategoriesModal(true)}>
                    Category
                  </Button>
                </div>
                <input type="text" placeholder="Search" className="outline-none border py-1 px-2 w-full border-solid" />
              </div>

              <div className="w-full h-full my-2 pr-2 overflow-y-scroll">
                {
                  documentTemplateFiles && (documentTemplateFiles?.map((item, index) => (<DocumentTemplateCard
                    key={index}
                    value={item}
                    isActive={item?._id === SelectFile?._id}
                    handleSelectedCard={() => {
                      // console.log(item)
                      setSelectFile(item);
                      // handleSelectedTemplate(item);
                    }}
                  />)))
                }
              </div>
            </div>

            <div className="w-[55%] flex justify-start items-start flex-col h-[80vh]">
              <div className="w-full flex justify-between px-2 my-3 items-center">
                <div className="flex justify-center items-center gap-x-2">
                  <h2 className="font-poppins not-italic leading-normal font-bold text-[#000] text-[14px]">Name:</h2>
                  <h3 className="font-poppins not-italic leading-normal font-medium text-[#000000] text-[13px]">{SelectFile?.name}</h3>
                </div>

                <div className="flex justify-center items-center gap-x-2">
                  <h2 className="font-poppins not-italic leading-normal font-bold text-[#000] text-[14px]">Type:</h2>
                  <h3 className="font-poppins not-italic leading-normal font-medium text-[#000000] text-[13px] uppercase">{SelectFile?.fileType}</h3>
                </div>

                <div className="flex justify-center items-center gap-x-2">
                  <h2 className="font-poppins not-italic leading-normal font-bold text-[#000] text-[14px]">Category:</h2>
                  <h3 className="font-poppins not-italic leading-normal font-medium text-[#000000] text-[13px]">{SelectFile?.category}</h3>
                </div>
              </div>

              <div className="h-full w-full">
                {
                  SelectFile && (
                    SelectFile?.path ? <DocumentViewer fileUrl={SelectFile?.path?.split("/")[1]} data={SelectFile} />: null
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentTemplates;


export const CreateFolderStructure = () => {

  const [pending, setPending] = useState(false)

  const dispatch = useDispatch();

  // const { documentTemplateFiles } = useSelector((state) => state.campaigns)

  // console.log(documentTemplateFiles);

  const [folderLists, setFolderLists] = useState([])

  const createFolderStructure = async (data) => {

    const folderList = [];
    const tempMap = new Map();

    await data.forEach((folder) => {
      const profile = folder.name || "superAdmin"; // Handle folders without profile
      if (!tempMap.has(profile)) {
        tempMap.set(profile, []);
      }
      tempMap.get(profile).push(folder.name);
    })

    for (const [profile, folders] of tempMap.entries()) {
      folderList.push({ profile, folders });
    }

    // return folderList;
    // setFolderLists(folderList);
    return folderList;
  }


  const getFolderList = async () => {
    try {
      // setPending(true);
      // dispatch(setLoader({ loader : true}))
      // setPending(true)
      const response = await axios.get(`http://192.168.1.26:3000/docs/folders`);

      if (response?.status === 200) {
        const data = response.data;
        const grpData = await createFolderStructure(data);
        setFolderLists(grpData);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 403) {
        dispatch(logoutThunkMiddleware());
      } else if (error.response?.data) {
        toastify({ msg: error.response.data, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      // setPending(false);
      // dispatch(setLoader({ loader : false}))
    }
  };


  useEffect(() => {
    getFolderList();
  }, [])

  // console.log("created folder structure", folderLists)

  return (
    <>
      <div className="h-[60vh] w-full bg-yellow-200" >
        {/* ${documentSidebar ? " translate-x-0" : "translate-x-[-110%]"}   */}
        <div
          className={`w-full h-full justify-center items-center`}
        >
          {
            folderLists.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-2 text-lg font-semibold">
                  <p>
                    {item.profile}
                    <ul className="relative left-5">
                      {
                        item.folders.map((itemnested, idx) => {
                          return (
                            <li key={idx}>
                              {itemnested}
                            </li>
                          )
                        })
                      }
                    </ul>
                  </p>
                </div>
              )
            })
          }
          {/* <button
            className={`bg-green-600 px-4 p-2 rounded-md font-semibold text-md`}
            onClick={() => createFolderStructure(documentTemplateFiles)}
          >
            Create Folder list
          </button> */}
          {/* <ul>
            <li></li>
          </ul> */}
        </div>
        {/* <button >animation</button>
        <div 
          className="h-[100px] w-[100px] transition-all bg-red-500 z-1 duration-[2s] delay-[200ms]  hover:translate-x-[500px]"
        ></div> */}
        {/* <div className={`box-animation  h-[100px] w-[100px] bg-blue-500 `} ></div> */}
      </div>
    </>
  )
}