import DataTable from "react-data-table-component";
import Spinner from "../../../../common/Spinner";
import { IoSearch } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { SelectedDocumentTemplateThunkMiddleware, sendSelectedDocumentTemplateThunkMiddleware } from "../../../../../redux/features/campaigns";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../../../redux/features/loaders";
import { toastify } from "../../../../toast";
import MoonLoader from "react-spinners/MoonLoader";
import { Button } from "@material-tailwind/react";

import "./DocumentTemplateStyle.css";

const DocumentTemplateModal = ({ isDocumentTemplateModal, setIsDocumentTemplateModal, campaignType }) => {

    const dispatch = useDispatch();
    const [multiSelectRows, setMultiSelectRows] = useState([]);

    // dispalying folder and files of those folders
    const [folderList, setFolderList] = useState([]);
    const [filesInFolder, setFilesInFolder] = useState([]);
    // const [listData, setListData] = useState([]);
    const [filesView, setFilesView] = useState(false);
    const [folderView, setFolderView] = useState(true);
    // const [columnsValues, setColumnsValues] = useState([])

    const {
        // documentTemplateFiles,
        campaignDetails } = useSelector((state) => state.campaigns);
    const { addLoader, loader } = useSelector((state) => state.loaders)

    const [documentTemplateFiles, setDocumentTemplateFiles] = useState([]);

    const columnsFiles = [
        {
            name: "Template",
            selector: (row) => row.name,
            width: "40vw",
        },
        {
            name: "Category",
            selector: (row) => row.category,
            width: 20,
        },
        {
            name: "File Type",
            selector: (row) => row.fileType,
            width: 20,
        },
    ];

    const columnsFolders = [
        {
            name: "Folders",
            selector: (row) => row,
            width: "40vw",
        },
    ];


    const tableCustomStyles = {
        headRow: {
            style: {
                background: "linear-gradient(90deg, #359ff3 0%, #8256ff 100%)",
                // background: "linear-gradient(103.45deg, #DFC066 24.76%, #2E1A1B 100%);",
                // background: "#34201F",
                color: "#ffffff",
                fontWeight: "38px",
                fontSize: "14px",
                borderRadius: "5px",
                minHeight: "41px",
            },
        },
        rows: {
            style: {
                borderBottomStyle: "solid",
                borderBottomWidth: "1px",
                borderBottomColor: "#42bbff",
                cursor: "pointer",
                "&:not(:last-of-type)": {
                    borderBottomStyle: "solid",
                    borderBottomWidth: "1px",
                    borderBottomColor: "#42bbff",
                },
            },
        },
    };

    const handleCancel = () => {
        setIsDocumentTemplateModal(false)
    }

    const handleSelectedRowsChange = (state) => {
        setMultiSelectRows(state.selectedRows);
    };

    const handleSelectedRowsSend = async () => {

        try {
            dispatch(setLoader({ addLoader: true }));

            console.log("multiSelectRows", multiSelectRows);
            let templateSelectedIdArray = [];
            multiSelectRows.forEach((row) => {
                templateSelectedIdArray.push(row._id);
            })
            // dispatch(SelectedDocumentTemplateThunkMiddleware({ documents: multiSelectRows }));
            dispatch(sendSelectedDocumentTemplateThunkMiddleware({ documents: multiSelectRows }));
            await dispatch(sendSelectedDocumentTemplateThunkMiddleware({
                templateId: templateSelectedIdArray,
                campaignName: campaignDetails.name, campaignType: campaignType
            }, (error) => {
                if (!error) {
                    setIsDocumentTemplateModal(false);
                    // dispatch(getUserAllCampaignThunkMiddleware({ accountId : singleUser.accountId }));
                }
            }));
        } catch (error) {
            console.error("document template modal error", error)
        } finally {
            dispatch(setLoader({ addLoader: false }))
        }
    }

    const handleModalClose = () => {
        setIsDocumentTemplateModal(false)
    }

    useEffect(() => {
        // const getDocumentTemplates = async () => {
        //   dispatch(getAllTemplateFilesThunkMiddleware());
        // };
        // getDocumentTemplates();
        const getDocumentTemplates = async () => {
            const response = await axios.get(`https://m.kcptl.in/docs/get`);
            if (response.status === 200) {
                // console.log(response.data)
                setDocumentTemplateFiles(response.data)
                // setDocumentTemplateFiles(response.data.data)
            }
        };
        getDocumentTemplates();
    }, []);

    useEffect(() => { }, [documentTemplateFiles])

    const handleCloseBtn = () => {
        setIsDocumentTemplateModal(false);
    }

    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    const handleSearch = () => {
        setSearchQuery(searchInput);
    };

    const handleChange = async (folder) => {
        await handleGetFiles(folder);
    };

    const getFolderList = async () => {
        try {
            dispatch(setLoader({ loader: true }));
            const response = await axios.get(
                // `http://localhost:3000/docs/docsFolders`,
                `https://m.kcptl.in/docs/docsFolders`,
            );


            // console.log(response)

            if (response.status === 200) {
                const data = response.data;
                setFolderList(data);
                const { message } = response.data;
                toastify({
                    msg: message,
                    type: "success",
                });
                // await dispatch(getAllTemplateFilesThunkMiddleware());
            }

        } catch (error) {
            // console.log(error);
            if (error.response?.data) {
                toastify({ msg: error.response.data.message, type: "error" });
            } else {
                toastify({ msg: error.message, type: "error" });
            }
        } finally {
            dispatch(setLoader({ loader: false }));
        }
    }

    // // console.log("folderlist", folderList)

    // /* */
    const handleGetFiles = async (folder) => {
        // let folderArray = [];
        // folderArray.push(folder);
        // for(let i = 0 ; i < folder.lenght ; i++){
        //     folderArray.push(folder[i].name)
        // }

        if (folder.length === 0) {
            setFilesInFolder([]);
            return;
        }

        if (folder.length > 0) {

            try {
                dispatch(setLoader({ loader: true }));
                const response = await axios.post(
                    // `http://localhost:3000/docs/docsFolders`,
                    `https://m.kcptl.in/docs/getDocsByFolders`,
                    {
                        folderNames: folder,
                    }
                );


                // console.log(response)

                if (response.status === 200) {
                    const data = response.data;
                    // setFilesInFolder((prevData) => [...prevData , ...data]);
                    // console.log("files data", data)
                    setFilesInFolder(data);
                    const { message } = response.data;
                    toastify({
                        msg: message,
                        type: "success",
                    });
                    // await dispatch(getAllTemplateFilesThunkMiddleware());
                }

            } catch (error) {
                console.error(error);
                if (error.response?.data) {
                    toastify({ msg: error.response.data.message, type: "error" });
                } else {
                    toastify({ msg: error.message, type: "error" });
                }
            } finally {
                dispatch(setLoader({ loader: false }));
            }
        }

    }

    useEffect(() => {
        getFolderList();
    }, [])

    useEffect(() => { }, [folderList, filesInFolder])

    const filteredDataFiles = (filesInFolder && filesInFolder.length !== 0) && filesInFolder?.filter(item => {
        return (
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.fileType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const filteredDataFolders = (folderList && folderList.length !== 0) && folderList?.filter(item => {
        return (
            item.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    useEffect(() => {
        if (folderList) {
            if (filesInFolder.length !== 0) {
                setFilesView(true);
                setFolderView(false);
                // console.log("files length while changing view", filesInFolder.length)
            }
            else
                if (filesInFolder.length === 0) {
                    setFilesView(false);
                    setFolderView(true);
                    // console.log("files length while changing view", filesInFolder.length)
                }
        }
    }, [folderView, filesView, filesInFolder, folderList]);

    const rowClickHandler = async (folderName) => {
        const setFolderName = []
        setFolderName.push(folderName)
        await handleGetFiles(setFolderName)
        // console.log("folder data when row gets clicked" , rowData)
    }

    return (
        <>
            {/* <div className="absolute w-[90%] h-[90%] bg-black opacity-25"></div> */}
            <Modal
                width={"90%"} centered open={isDocumentTemplateModal}
                onCancel={handleCancel}
                cancelButtonProps={{ hidden: true }}
                okButtonProps={{ hidden: true }}
                closable={false}
            >
                <div className={`bg-white rounded-lg relative ${filesView ? "min-h-[80vh] h-[80vh]": "h-auto"} mx-auto flex flex-col w-full gap-y-1`}>
                    <div className="modelHeadingBackground p-3 border-blue-800 rounded flex items-center justify-between">
                        <h1 className="text-white  text-xl font-semibold">Select Document Templates</h1>
                        <span
                            className=" text-white text-xl cursor-pointer"
                            onClick={handleCloseBtn}
                        >
                            <MdOutlineClose />
                        </span>
                    </div>
                    {/* <div className='bg-gray-200 flex my-1 rounded-md mx-2 sm:h-[60px] gap-y-2'
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        <input
                            type="text"
                            className="border-2 rounded p-1 w-full outline-none"
                            placeholder="Search Now"
                            onChange={handleInputChange}
                        // onKeyDown={handleSearch}  
                        />
                        <Button
                            type="submit"
                            className=" flex items-center buttonBackground shadow-none px-4 rounded-sm py-1 text-white font-semibold"
                            onClick={() => handleSearch()}
                        // onChange={handleSearch}
                        // onKeyDown={handleSearch}  
                        >
                            <IoSearch size={20} />
                        </Button>
                    </div> */}
                    <div className="w-full flex justify-center my-2 items-center">
                        <div className="w-[99%]">
                            <Select
                                mode="multiple"
                                allowClear
                                className="w-full document-drop"
                                placeholder="Select Folders"
                                onChange={handleChange}
                                options={[
                                    // { label: "Select A Folder", value: "select" },
                                    ...(folderList?.map((option) => ({ label: option, value: option })) || []),
                                ]}
                            />
                        </div>
                    </div>
                    <div className="w-[100%] mx-auto py-2 px-2 rounded-md h-[100%] table-container overflow-y-scroll">
                        {/* {
                            (folderView) && (
                                <DataTable
                                    // data={folderList ? folderList : []}
                                    data={filteredDataFolders ? filteredDataFolders.reverse() : []}
                                    // data={documentTemplateFiles ? documentTemplateFiles.slice().reverse() : []}
                                    columns={columnsFolders}
                                    noHeader
                                    // noTableHead
                                    progressPending={loader}
                                    // selectableRows
                                    fixedHeader
                                    // onSelectedRowsChange={handleSelectedRowsChange}
                                    customStyles={tableCustomStyles}
                                    // progressPending={getLoader}
                                    // onRowClicked={(row)=>rowClickHandler(row)}
                                    responsive={true}
                                    noDataComponent={<CustomNoDataComponenet />}
                                    progressComponent={<CustomProgressComponenet />}
                                />
                            )
                        } */}
                        {
                            folderView && (
                                <div className="flex justify-center items-center w-full h-full">
                                    <h2 className="text-slate-500 font-poppins not-italic leading-normal my-4 font-semibold text-xl">Select a Folder</h2>
                                </div>
                            )
                        }
                        {
                            (filesView) && (
                                <DataTable
                                    columns={columnsFiles}
                                    data={filteredDataFiles ? filteredDataFiles.slice().reverse() : []}
                                    noHeader
                                    selectableRows
                                    fixedHeader
                                    onSelectedRowsChange={handleSelectedRowsChange}
                                    customStyles={tableCustomStyles}
                                    progressPending={loader}
                                    // onRowClicked={rowClickHandler}
                                    responsive={true}
                                    noDataComponent={<CustomNoDataComponenet />}
                                    progressComponent={<CustomProgressComponenet />}
                                />
                            )
                        }
                        {
                            (!folderView && !filesView) && (
                                <CustomNoDataComponenet />
                            )
                        }
                    </div>
                </div>
                <div className="flex justify-end items-center gap-x-2 p-3">
                    <Button disabled={addLoader} onClick={() => handleSelectedRowsSend()}
                        className={`py-2 px-4 flex justify-center items-center capitalize gap-x-2 rounded-sm shadow-none text-white font-poppins not-italic leading-normal font-medium ${addLoader ? "bg-green-400" : "bg-green-600"}`}
                    >
                        {addLoader ? <span className="flex"><Spinner /></span> : "Send"}
                    </Button>
                    <Button onClick={() => handleModalClose()} className="py-2 px-4 flex justify-center items-center gap-x-2 rounded-sm shadow-none text-[#000000] border border-solid capitalize font-poppins not-italic leading-normal font-medium bg-gray-50" >Close</Button>
                </div>
            </Modal >
        </>
    )
}

export default DocumentTemplateModal;

const CustomNoDataComponenet = () => {
    return (
        <div className="w-full p-10 text-center">
            There are no records to displays
        </div>
    );
};

const CustomProgressComponenet = () => {
    return <div className="w-full p-10 text-center"><Spinner /></div>;
};