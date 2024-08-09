import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import Stats from "./Stats";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {
  getCampaignEmailTemplateThunkMiddleware,
  getCampaignSmsTemplateThunkMiddleware,
  getCampaignWhatsappTemplateThunkMiddleware,
  SelectedDocumentTemplateThunkMiddleware,
} from "../../../../redux/features/campaigns";
import Progress from "./Progress";
import { useEffect, useMemo, useState } from "react";
import { LuMessageCircle } from "react-icons/lu";
import { CiFileOn } from "react-icons/ci";
import Prepare from "./Prepare";
import Process from "./Process";
import Finalize from "./Finalize";
import Reports from "./Reports";
import Text from "../../../../common/Texts/Text";

// icons
import { MdOutlineAttachEmail } from "react-icons/md";
import { Button } from "@material-tailwind/react";
import CampaignRoutes from "../../../../common/CampaignRoutes";

const CampaignDetails = () => {

  // const { campaignDetails, selectedDocs } = useSelector(
  //   (state) => state.campaigns
  // );
  // const { user } = useSelector(state => state.user);
  // const permission = (user?.email === "hdfc" ? false: true);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();


  // // console.log("campaign details ", campaignDetails);
  // // console.log("Selected Documents", selectedDocs);

  // useEffect(() => {
  //   dispatch(SelectedDocumentTemplateThunkMiddleware({ documents: null }));
  // }, []);

  // const isDataMappedCorrectly = useMemo(
  //   () => campaignDetails.isDataMappedCorrectly,
  //   [campaignDetails]
  // );

  // console.log("Campaign Details", campaignDetails);

  // const sendCampaignHandler = async () => {
  //   // if (isDataMappedCorrectly) {
  //   //   dispatch(
  //   //     getCampaignSmsTemplateThunkMiddleware(() => {
  //   //       navigate("sms");
  //   //     })
  //   //   );
  //   // }
  //   if(permission){
  //     dispatch(
  //       getCampaignSmsTemplateThunkMiddleware(() => {
  //         navigate("sms");
  //       })
  //     );
  //   }
  // };

  // const whatsappCampaignHandler = async () => {
  //   // if (isDataMappedCorrectly) {
  //   //   dispatch(
  //   //     getCampaignWhatsappTemplateThunkMiddleware(() => {
  //   //       navigate("whatsapp");
  //   //     })
  //   //   );
  //   // }
  //   if(permission){
  //     dispatch(
  //       getCampaignWhatsappTemplateThunkMiddleware(() => {
  //         navigate("whatsapp");
  //       })
  //     );
  //   }
  // };

  // const bulkEmailCampaignHandler = async () => {
  //   // if (isDataMappedCorrectly) {
  //   //   dispatch(
  //   //     getCampaignEmailTemplateThunkMiddleware(() => {
  //   //       navigate("bulkemail");
  //   //     })
  //   //   );
  //   // }
  //   if(permission){
  //     dispatch(
  //       getCampaignEmailTemplateThunkMiddleware(() => {
  //         navigate("bulkemail");
  //       })
  //     );
  //   }
  // };

  const { campaignDetails } = useSelector(
    (state) => state.campaigns
  );

  console.log("campaign details ", campaignDetails)
  // console.log("campaign doccument count ", campaignDocCount)
  // // const { singleUser } = useSelector((state)=>state.campaings)

  // // const isDownloadSinglePdfReady = useMemo(
  // //   () => campaignDetails.isDownloadSinglePdfReady,
  // //   [campaignDetails]
  // // );

  // // const { uploadCampaignFileStatus } = useSelector((state) => state.progress);

  // // const isExcelPresent = useMemo(
  // //   () => campaignDetails.isExcelPresent,
  // //   [campaignDetails]
  // // );

  // // const isExcelValidated = useMemo(
  // //   () => campaignDetails.isExcelValidated,
  // //   [campaignDetails]
  // // );

  // // const isFilePresent = useMemo(() => {
  // //   return campaignCount.noOfFiles && campaignCount.noOfFiles !== 0
  // //     ? true
  // //     : false;
  // // }, [campaignDetails]);

  const isDataMappedCorrectly = useMemo(
    () => campaignDetails.isDataMappedCorrectly,
    [campaignDetails]
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendCampaignHandler = async () => {
    if (isDataMappedCorrectly) {
      dispatch(
        getCampaignSmsTemplateThunkMiddleware(() => {
          navigate("sms");
        })
      );
    }
  };

  const whatsappCampaignHandler = async () => {
    if (isDataMappedCorrectly) {
      dispatch(
        getCampaignWhatsappTemplateThunkMiddleware(() => {
          navigate("whatsapp");
        })
      );
    }
  };

  const bulkEmailCampaignHandler = async () => {
    if (isDataMappedCorrectly) {
      dispatch(
        getCampaignEmailTemplateThunkMiddleware(() => {
          navigate("bulkemail");
        })
      );
    }
  };

  // console.log(campaignDetails)

  return (
    <>
      <div className="h-[93vh] flex flex-col w-full overflow-y-scroll">
        <div className="px-2 py-2 w-full flex gap-2 md:gap-4 flex-col">
          <Topbar path="/dashboard" />
          <div className="py-1 w-full space-y-4">
            <div className="w-full">
              <Stats />
            </div>

            {/* changes made by abhyanshu */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
              <div className="bg-white p-4 rounded-md w-full">
                <Prepare campaignType={campaignDetails?.type} />
              </div>

              {campaignDetails.type === "mergeType" && (
                <div className="bg-white p-4 rounded-md w-full lg:col-span-1">
                  <Process campaignType={campaignDetails?.type} />
                </div>
              )}

              <div className="bg-white p-4 sm:px-8 sm:py-5 flex flex-col justify-between h-full items-center rounded-md w-full">
                <div className="gap-4 grid w-full h-1/2 grid-cols-3">
                  <Button
                    className="relative flex-col items-center justify-center h-full gap-3 flex bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-md hover:bg-slate-800 text-[#000000] capitalize not-italic leading-normal hover:text-white transition-all duration-200 w-full"
                    onClick={bulkEmailCampaignHandler}
                  >
                    <MdOutlineAttachEmail size={30} />
                    <Text className="text-center text-[14px]">Email</Text>
                    {(!isDataMappedCorrectly) && (
                      <>
                        <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full rounded-3xl bg-opacity-80"></div>
                      </>
                    )}
                    {/* {!permission && (
                      <div className="absolute top-0 left-0 bg-gray-100 w-full h-full rounded-md bg-opacity-80"></div>
                    )} */}
                  </Button>

                  <Button
                    className="relative flex-col items-center justify-center gap-3 flex bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-md hover:bg-slate-800 text-[#000000] capitalize not-italic leading-normal hover:text-white transition-all duration-200 w-full"
                    onClick={sendCampaignHandler}
                  >
                    <BiMessageRoundedDetail size={30} />
                    <Text className="text-center text-[14px]">SMS</Text>
                    {(!isDataMappedCorrectly) && (
                      <>
                        <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full rounded-3xl bg-opacity-80"></div>
                      </>
                    )}
                    {/* {!permission && (
                      <div className="absolute top-0 left-0 bg-gray-100 w-full h-full rounded-md bg-opacity-80"></div>
                    )} */}
                  </Button>

                  <Button
                    className="relative flex-col items-center justify-center gap-3 flex bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-md hover:bg-slate-800 hover:text-white text-[#000000] capitalize not-italic leading-normal transition-all duration-300 w-full"
                    onClick={whatsappCampaignHandler}
                  >
                    <MdOutlineRemoveRedEye size={30} />
                    <Text className="text-center text-[14px]">Whatsapp</Text>
                    {(!isDataMappedCorrectly) && (
                      <>
                        <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full rounded-3xl bg-opacity-80"></div>
                      </>
                    )}
                    {/* {!permission && (
                      <div className="absolute top-0 left-0 bg-gray-100 w-full h-full rounded-md bg-opacity-80"></div>
                    )} */}
                  </Button>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                  <h2 className="h-[1px] bg-slate-300 w-full my-3"></h2>
                  <h1 className=" font-bold text-xl text-center">View</h1>
                </div>
              </div>

              <div className="bg-white p-4 w-full rounded-md">
                <Finalize campaignType={campaignDetails?.type} />
              </div>

              <div className="bg-white p-4 w-full rounded-md">
                <Reports campaignType={campaignDetails?.type} />
              </div>
            </div>

          </div>
        </div>
        {/* {
          campaignDetails.type === "mergeType" && (
            selectedDocs ? <>
              <CampaignRoutes documentTemplateFiles={selectedDocs} />
            </> : null
          )
        } */}
      </div>
      {/* <Progress campaignType={campaignDetails.type} /> */}
      {/* <ProgressUpdateChecking/> */}
    </>
  );
};



export default CampaignDetails;


// const TopScreenButton = ({ children, select = false, onClick = function () { } }) => {
//   return <button className={"p-2 bg-white flex justify-center transition-all items-center" + (select ? ` rounded-t-md border-2 border-solid border-blue-600` : null)} onClick={onClick}>{children}</button>
// }