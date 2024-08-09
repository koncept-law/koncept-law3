import { memo, useEffect, useState } from "react";
import DataTable from "react-data-table-component"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../../../../redux/features/loaders";
import { toastify } from "../../../../toast";
// import axios from "axios";
import Spinner from "../../../../common/Spinner";
import createAxiosInstance from "../../../../../config/axiosConfig";
import { format } from "date-fns"
import { downloadAllPdfsByCategoryThunkMiddleware, downloadDocumentCategorySinglePdfThunkMiddleware } from "../../../../../redux/features/campaigns";
import Progress from "../Progress";
import { DownloadDocumentTopBar } from "./DownloadDocumentTopBar";
import DocumentDownloadProgress from "./DocumentDownloadProgress";
import axios from "axios";

const DownloadDocumentByCategory = () => {

    const dispatch = useDispatch();

    const { campaignDetails } = useSelector((state) => state.campaigns);
    const { loader } = useSelector((state) => state.loaders);
    const [tableData, setTableData] = useState([]);
    // const axios = createAxiosInstance()

    const data = [
        {
            id: 1,
            category: "one"
        },
        {
            id: 2,
            category: "two"
        },
        {
            id: 3,
            category: "three"
        },
        {
            id: 4,
            category: "four"
        },
        {
            id: 5,
            category: "five"
        },
        {
            id: 6,
            category: "six"
        },
    ];

    // const handleDownloadSinglePdf = () => {
    //     // dispatch(downloadDocumentCategorySinglePdfThunkMiddleware({
    //     //     campaignName: campaignDetails.name,
    //     //     templateId: tableData.templateId , 
    //     //     links: tableData.links , description: row.description,
    //     // }));
    // }


    const columns = [
        {
            name: 'Template Name',
            selector: row => row.templateName,
            width: "400px",
        },
        {
            name: "Record Type",
            selector: row => row.recordType,
            width: "200px",
        },
        {
            name: "No. Of Files",
            selector: row => row.numberOfFiles,
            width: "200px",
        },
        {
            name: "Time",
            selector: row => {

                const formatDateDateFns = (dateStr) => {
                    const date = new Date(dateStr);
                    return format(date, 'dd-MM-yyyy HH:mm:ss');
                };

                return (<>{formatDateDateFns(row.dateCreated)}
                    {/* {row.links[0]?.link.split("/")[6]} */}
                </>)
            },
            width: "300px",
        },
        {
            name: "Description",
            selector: row => {
                return (
                    <span className="flex flex-wrap w-fit">{row.description}</span>
                )
            },
            width: "200px",
        },
        {
            name: "Download All",
            // selector: row => <div>Download Button</div>,
            selector: row => {

                const handleDownloadAll = () => {
                    // console.log("download single pdf button has been clicked")
                    dispatch(downloadAllPdfsByCategoryThunkMiddleware({ linksData: row.links }))
                }

                return (
                    <>
                        <div>
                            <button className="flex bg-green-600 font-semibold text-white rounded-lg justify-center 
                                items-center px-3 py-1"  onClick={handleDownloadAll}>
                                <span className="text-sm">Download All</span>
                            </button>
                        </div>
                    </>
                )
            },
            width: "200px",
        },
        {
            name: "Download Single Pdf",
            // selector: row => <div>Download Button</div>,
            selector: row => {

                const handleDownloadSinglePdf = () => {
                    dispatch(downloadDocumentCategorySinglePdfThunkMiddleware({
                        campaignName: campaignDetails.name,
                        templateId: row.templateId , 
                        links: row.links , description: row.description,
                    }));
                }

                return (
                    <>
                        <div>
                            <button className="flex bg-gray-600 font-semibold text-white rounded-lg justify-center 
                                items-center px-3 py-1"  onClick={handleDownloadSinglePdf}>
                                <span className="text-sm">Download Single Pdf</span>
                            </button>
                        </div>
                    </>
                )
            },
            width: "200px",
        },
    ];

    const tableCustomStyles = {
        headRow: {
            style: {
                background: "linear-gradient(90deg, #359FF3 0%, #8256FF 100%)",
                // background: "#34201F",
                color: "#ffffff",
                fontWeight: "38px",
                fontSize: "14px",
                borderRadius: "5px",
                minHeight: "41px",
                minWidht: "100vw",
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


    const getTableData = async () => {
        try {
            dispatch(setLoader({ loader: true }))
            const response = await axios.post(`https://m.kcptl.in/docs/getAllCategoryData`, { campaignName: campaignDetails.name })

            if (response.status === 200) {
                // console.log(response.data)
                const { message } = response.data;
                setTableData(response.data.resultArray);
                toastify({ msg: message, type: "success" });
            }
        } catch (error) {
            if (error.response?.data) {
                toastify({ msg: error.response.data.message, type: "error" })
            }
            else {
                toastify({ msg: error.message, type: "error" })
            }
            // dispatch(setLoader({loader: false}))
        } finally {
            dispatch(setLoader({ loader: false }))
        }
    }

    // console.log(loader)

    // console.log("table data", tableData)

    useEffect(() => {
        getTableData();
    }, []);

    useEffect(() => { }, [tableData])

    return (
        <>

            {/* { loader && <Spinner/>} */}
            <div className="h-[94vh] w-[100%] overflow-hidden px-6 py-4 flex gap-2 md:gap-4 flex-col">
                <DownloadDocumentTopBar  title={campaignDetails.name} refreshPage={()=>getTableData()} />
                {/* <Topbar toggle={openAddCampaignHandler} /> */}
                <div className="p-3 min-h-fit h-[90%]  bg-white rounded-md overflow-scroll horizontal-container table-container">
                    {/* <CampaignsTable toggle={openAddCampaignHandler} /> */}
                    <DataTable
                        data={tableData ? tableData : []}
                        columns={columns}
                        pagination
                        customStyles={tableCustomStyles}
                        responsive={true}
                        loader={loader}
                        noDataComponent={< CustomNoDataComponenet />}
                        progressComponent={< CustomProgressComponenet />}
                    />
                </div>
                <DocumentDownloadProgress campaignType={campaignDetails.type} pageType="docByCategory" />
            </div>
            {/* <div>
                <h1>Download Document By Category</h1>
                <DataTable
                    data={data}
                    columns={columns}
                    pagination
                    customStyles={tableCustomStyles}
                    responsive={true}
                    noDataComponent={< CustomNoDataComponenet />}
                    progressComponent={< CustomProgressComponenet />}
                />
            </div> */}

        </>
    )
}

export default DownloadDocumentByCategory



const CustomNoDataComponenet = () => {
    return (
        <div className="w-full p-10 text-center">
            There are no records to displays
        </div>
    );
};

const CustomProgressComponenet = () => {
    return <div className="w-full p-10 text-center">Loading...</div>;
};




// {
//     "numberOfFiles": 2,
//         "description": "241.pdf-245.pdf",
//             "links": [
//                 {
//                     "link": "https://konc1.s3.ap-south-1.amazonaws.com/mainMerged/dipeshMergeType/668bd257ba56fefcad03faa0/241.pdf",
//                     "lastModified": "2024-07-27T07:37:36.000Z"
//                 },
//                 {
//                     "link": "https://konc1.s3.ap-south-1.amazonaws.com/mainMerged/dipeshMergeType/668bd257ba56fefcad03faa0/245.pdf",
//                     "lastModified": "2024-07-27T07:37:40.000Z"
//                 }
//             ],
//                 "templateName": "card salary attachment",
//                     "recordType": "pdfData",
//                         "dateCreated": "2024-07-27T07:37:36.000Z"
// }
