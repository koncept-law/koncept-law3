import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdCloudUpload, MdOutlineClose } from "react-icons/md";
import { IoReloadCircle, IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addCampaignExcelThunkMiddleware,
  deleteCampaignExcelThunkMiddleware,
  deleteCampaignFilesThunkMiddleware,
  deleteMapSelectedVariableValues,
  getAllTemplateFilesThunkMiddleware,
  // getDocumentTemplateVaribalesThunkMiddleware,
  mapCampaignFilesThunkMiddleware,
  sendDocumentVaribleValuesThunkMiddleware,
  sendSelectedDocumentTemplateThunkMiddleware,
  uploadCampaignFilesThunkMiddleware,
  validateCampaignExcelThunkMiddleware,
} from "../../../../redux/features/campaigns";
import DataTable from "react-data-table-component";
import { Modal, Select } from "antd";
// import { useForm } from "react-hook-form";
// import { parse } from "papaparse";
import "../scrollBar.scss"
import axios from "axios";
import { setLoader } from "../../../../redux/features/loaders";
import Spinner from "../../../common/Spinner";
import MoonLoader from "react-spinners/MoonLoader"
import MapDataModal from "./DocumentPrepareModal/MapDataModal";
import DocumentTemplateModal from "./DocumentPrepareModal/DocumentTemplateModal";

import Text from "../../../../common/Texts/Text";


const Prepare = ({ campaignType }) => {

  // const [isMapDataModal, setIsMapDataModal] = useState(false)
  // const [isDocumentTemplateModal, setIsDocumentTemplateModal] = useState(false)

  // const dispatch = useDispatch();
  // const inputRef = useRef();

  // const { campaignDetails } = useSelector(
  //   (state) => state.campaigns
  // );

  // const { uploadCampaignFileStatus } = useSelector((state) => state.progress);

  // const isExcelPresent = useMemo(
  //   () => campaignDetails.isExcelPresent,
  //   [campaignDetails]
  // );

  // const isExcelValidated = useMemo(
  //   () => campaignDetails.isExcelValidated,
  //   [campaignDetails]
  // );

  // const isDocumentTemplateSelected = useMemo(
  //   () => campaignDetails.isDocumentTemplatesSelected,
  //   [campaignDetails]
  // );

  // // const isDocumentTemplatesSelected = useMemo(
  // //   () => campaignDetails.isDocumentTemplateSelected,
  // //   [campaignDetails]
  // // );

  // // const isDocumentTemplateSelected = useMemo(
  // //   () => campaignDetails.isDocumentTemplateSelected,
  // //   [campaignDetails]
  // // );

  // // const isFilePresent = useMemo(() => {
  // //   return campaignCount.noOfFiles && campaignCount.noOfFiles !== 0
  // //     ? true
  // //     : false;
  // // }, [campaignDetails]);

  // const isFilePresent = useMemo(() => {
  //   return campaignDetails.pdfsUploaded && campaignDetails.pdfsUploaded !== "0"
  //     ? true
  //     : false;
  // }, [campaignDetails])



  // const isDataMappedCorrectly = useMemo(
  //   () => campaignDetails.isDataMappedCorrectly,
  //   [campaignDetails]
  // );

  // // const isDocumentTemplatesSelected = useMemo(
  // //   () => campaignDetails.itemsInExcel,
  // //   [campaignDetails]
  // // )

  // const uploadExcelFileHandler = (event) => {
  //   if (event.target.files[0]) {
  //     dispatch(
  //       addCampaignExcelThunkMiddleware({
  //         campaignName: campaignDetails.name,
  //         // change made by abhyanshu
  //         campaignType: campaignType,
  //         file: event.target.files[0],
  //         inputRef,
  //       })
  //     );
  //   }
  // };

  // const deleteExcelFileHandler = () => {
  //   dispatch(
  //     deleteCampaignExcelThunkMiddleware({
  //       campaignName: campaignDetails.name,
  //       // change made by abhyanshu
  //       // campaignType: campaignType,
  //     })
  //   );
  // };

  // const validateExcelFileHandler = () => {
  //   if (isExcelPresent) {
  //     if (!isExcelValidated) {
  //       dispatch(
  //         validateCampaignExcelThunkMiddleware({
  //           campaignName: campaignDetails.name,
  //           // change made by abhyanshu
  //           // campaignType: campaignType,
  //         })
  //       );
  //     }
  //   }
  // };

  // // console.log("campaign name ", campaignDetails.name)

  // const uploadMultipleFileHandler = (event) => {
  //   dispatch(
  //     uploadCampaignFilesThunkMiddleware({
  //       campaignName: campaignDetails.name,
  //       // change made by abhyanshu
  //       campaignType: campaignType,
  //       files: event.target.files,
  //       inputRef,
  //     })
  //   );
  // };

  // const deleteFilesHandler = () => {
  //   dispatch(
  //     deleteCampaignFilesThunkMiddleware({
  //       campaignName: campaignDetails.name,
  //       // change made by abhyanshu
  //       campaignType: campaignType,
  //     })
  //   );
  // };

  // const mapFilesHandler = () => {
  //   // original  condition
  //   // if (isFilePresent) {
  //   if (isFilePresent) {
  //     dispatch(
  //       mapCampaignFilesThunkMiddleware({
  //         campaignName: campaignDetails.name,
  //         // change made by abhyanshu
  //         campaignType: campaignType,
  //       })
  //     );
  //   }
  // };

  // const deleteMapSelectedVarialbesHandler = () => {
  //   if (isDataMappedCorrectly) {
  //     dispatch(deleteMapSelectedVariableValues({ campaignName: campaignDetails.name }))
  //   }
  // }

  const [isMapDataModal, setIsMapDataModal] = useState(false)
  const [isDocumentTemplateModal, setIsDocumentTemplateModal] = useState(false)

  const dispatch = useDispatch();
  const inputRef = useRef();

  const { campaignDetails } = useSelector(
    (state) => state.campaigns
  );

  const { uploadCampaignFileStatus } = useSelector((state) => state.progress);

  const isExcelPresent = useMemo(
    () => campaignDetails.isExcelPresent,
    [campaignDetails]
  );

  const isExcelValidated = useMemo(
    () => campaignDetails.isExcelValidated,
    [campaignDetails]
  );

  const isDocumentTemplateSelected = useMemo(
    () => campaignDetails.isDocumentTemplatesSelected,
    [campaignDetails]
  );

  // const isDocumentTemplatesSelected = useMemo(
  //   () => campaignDetails.isDocumentTemplateSelected,
  //   [campaignDetails]
  // );

  // const isDocumentTemplateSelected = useMemo(
  //   () => campaignDetails.isDocumentTemplateSelected,
  //   [campaignDetails]
  // );

  // const isFilePresent = useMemo(() => {
  //   return campaignCount.noOfFiles && campaignCount.noOfFiles !== 0
  //     ? true
  //     : false;
  // }, [campaignDetails]);

  const isFilePresent = useMemo(() => {
    return campaignDetails.pdfsUploaded && campaignDetails.pdfsUploaded !== "0"
      ? true
      : false;
  }, [campaignDetails])



  const isDataMappedCorrectly = useMemo(
    () => campaignDetails.isDataMappedCorrectly,
    [campaignDetails]
  );

  // const isDocumentTemplatesSelected = useMemo(
  //   () => campaignDetails.itemsInExcel,
  //   [campaignDetails]
  // )

  const uploadExcelFileHandler = (event) => {
    if (event.target.files[0]) {
      dispatch(
        addCampaignExcelThunkMiddleware({
          campaignName: campaignDetails.name,
          // change made by abhyanshu
          campaignType: campaignType,
          file: event.target.files[0],
          inputRef,
        })
      );
    }
  };

  const deleteExcelFileHandler = () => {
    dispatch(
      deleteCampaignExcelThunkMiddleware({
        campaignName: campaignDetails.name,
        // change made by abhyanshu
        // campaignType: campaignType,
      })
    );
  };

  const validateExcelFileHandler = () => {
    if (isExcelPresent) {
      if (!isExcelValidated) {
        dispatch(
          validateCampaignExcelThunkMiddleware({
            campaignName: campaignDetails.name,
            // change made by abhyanshu
            // campaignType: campaignType,
          })
        );
      }
    }
  };

  // console.log("campaign name ", campaignDetails.name)

  const uploadMultipleFileHandler = (event) => {
    dispatch(
      uploadCampaignFilesThunkMiddleware({
        campaignName: campaignDetails.name,
        // change made by abhyanshu
        campaignType: campaignType,
        files: event.target.files,
        inputRef,
      })
    );
  };

  const deleteFilesHandler = () => {
    dispatch(
      deleteCampaignFilesThunkMiddleware({
        campaignName: campaignDetails.name,
        // change made by abhyanshu
        campaignType: campaignType,
      })
    );
  };

  const mapFilesHandler = () => {
    // original  condition
    // if (isFilePresent) {
    if (isFilePresent) {
      dispatch(
        mapCampaignFilesThunkMiddleware({
          campaignName: campaignDetails.name,
          // change made by abhyanshu
          campaignType: campaignType,
        })
      );
    }
  };

  const deleteMapSelectedVarialbesHandler = () => {
    if (isDataMappedCorrectly) {
      dispatch(deleteMapSelectedVariableValues({ campaignName: campaignDetails.name }))
    }
  }

  return (
    <>
      {/* <MoonLoader/> */}
      <div className="flex flex-col w-full justify-between h-full">
        <div className=" grid grid-cols-2 w-full md:grid-cols-2 xl:grid-cols-4 gap-2">
          {/* Upload Excel Section  */}
          <div
            className={`relative flex items-center w-full justify-between flex-col gap-3 bg-blue-100 px-3 py-5 cursor-pointer border border-gray-700 rounded-md group transition-all duration-200 hover:bg-slate-800 hover:text-[#FFFF] capitalize text-[#000] overflow-hidden`}
          >
            <MdCloudUpload size={30} />
            <Text className="text-center text-[14px]">Upload Contact Excel</Text>
{/* 
            {isExcelPresent && (
              <>
                <div
                  className="absolute top-2 right-2 z-20"
                  onClick={deleteExcelFileHandler}
                >
                  <figure
                    className={`text-red-600 font-bold  -translate-y-10 transition-all duration-300 
                      group-hover:translate-y-0`}
                  >
                    <IoReloadCircle size={30} />
                  </figure>
                </div>
                <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
              </>
            )}


            {!isExcelPresent && (
              <input
                ref={inputRef}
                type="file"
                className=" absolute top-0 left-0 w-full h-full opacity-0"
                onChange={uploadExcelFileHandler}
              />
            )}

            <div className={` min-h-7 px-1 bg-green-600 min-w-7 text-white font-bold rounded-full absolute top-2 
              left-2 grid place-items-center`}>
              {Number.parseInt(campaignDetails.itemsInExcel) ? Number.parseInt(campaignDetails.itemsInExcel) : 0}
            </div> */}
            
            {isExcelPresent && (
              <>
                <div
                  className="absolute top-2 right-2 z-20"
                  onClick={deleteExcelFileHandler}
                >
                  <figure
                    className={`text-red-600 font-bold  -translate-y-10 transition-all duration-300 
                      group-hover:translate-y-0`}
                  >
                    <IoReloadCircle size={30} />
                  </figure>
                </div>
                <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
              </>
            )}


            {!isExcelPresent && (
              <input
                ref={inputRef}
                type="file"
                className=" absolute top-0 left-0 w-full h-full opacity-0"
                onChange={uploadExcelFileHandler}
              />
            )}

            <div className={` min-h-7 px-1 bg-green-600 min-w-7 text-white font-bold rounded-full absolute top-2 
              left-2 grid place-items-center`}>
              {Number.parseInt(campaignDetails.itemsInExcel) ? Number.parseInt(campaignDetails.itemsInExcel) : 0}
            </div>
          </div>

          {/* Validate Excel Section  */}
          {campaignType === "pdfType" && (<div
            onClick={validateExcelFileHandler}
            className={`relative flex items-center w-full justify-between flex-col gap-3 bg-blue-100 px-3 py-5 cursor-pointer border border-gray-700 rounded-md group transition-all duration-200 hover:bg-slate-800 hover:text-[#FFFF] capitalize text-[#000] overflow-hidden`}
          >
            <MdCloudUpload size={30} />
            <Text className="text-center text-[14px]">Validate Excel</Text>

            {(!isExcelPresent || isExcelValidated) && (
              <>
                <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
              </>
            )}
          </div>)}

          {/* Upload Files Section  */}
          {
            campaignType === "pdfType" &&
            (
              <>
                <div
                  className={`relative flex items-center w-full justify-between flex-col gap-3 bg-blue-100 px-3 py-5 cursor-pointer border border-gray-700 rounded-md group transition-all duration-200 hover:bg-slate-800 hover:text-[#FFFF] capitalize text-[#000] overflow-hidden`}
                >
                  <MdCloudUpload size={30} />
                  <Text className="text-center text-[14px]">Upload Multiple File</Text>
                  {(!isExcelValidated ||
                    isFilePresent ||
                    uploadCampaignFileStatus) && (
                      <>
                        {isFilePresent && (
                          <div className="absolute top-2 right-2 z-20">
                            <figure
                              className={`text-red-600 font-bold  -translate-y-10 transition-all duration-300 group-hover:translate-y-0`}
                              onClick={deleteFilesHandler}
                            >
                              <IoReloadCircle size={30} />
                            </figure>
                          </div>
                        )}

                        <div className="absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
                      </>
                    )}

                  {isExcelPresent &&
                    isExcelValidated &&
                    !isFilePresent &&
                    !uploadCampaignFileStatus && (
                      <input
                        ref={inputRef}
                        type="file"
                        multiple
                        className=" absolute top-0 left-0 w-full h-full opacity-0"
                        onChange={uploadMultipleFileHandler}
                      />
                    )}

                  <div className=" min-h-7 px-1 bg-green-600 min-w-7 text-white font-bold rounded-full absolute top-2  left-2 
                        grid place-items-center">
                    {Number.parseInt(campaignDetails.pdfsUploaded) ? Number.parseInt(campaignDetails.pdfsUploaded) : 0}
                  </div>
                </div>
              </>
            )
          }

          {
            campaignType === "mergeType" && (
              <>
                <div
                  className={`relative flex items-center w-full justify-between flex-col gap-3 bg-blue-100 px-3 py-5 cursor-pointer border border-gray-700 rounded-md group transition-all duration-200 hover:bg-slate-800 hover:text-[#FFFF] capitalize text-[#000] overflow-hidden`}
                  onClick={
                    !isExcelPresent || isDocumentTemplateSelected ? () => { } :
                      () => setIsDocumentTemplateModal(true)}
                >
                  <MdCloudUpload size={30} />
                  <Text className="text-center text-[14px]">Document Template</Text>
                  {(!isExcelPresent || isDocumentTemplateSelected) && (
                    <>
                      {/* {isFilePresent && (
                        <div className="absolute top-2 right-2 z-20">
                          <figure
                            className={`text-red-600 font-bold  -translate-y-10 transition-all duration-300 
                            group-hover:translate-y-0`}
                            onClick={deleteFilesHandler}
                          >
                            <IoReloadCircle size={30} />
                          </figure>
                        </div>
                      )} */}
                      <div className="absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
                    </>
                  )}
                  {/* // (isDocxExcelPresent && isDocxExcelValidated) && ( */}
                  {/* {
                    (isExcelPresent ||
                      !isDocumentTemplateSelected
                    ) && (
                      <button className="absolute top-0 left-0 w-full h-full opacity-0" onClick={() =>
                        setIsDocumentTemplateModal(true)}
                      >
                      </button>
                    )
                  } */}
                  {/* // ) */}
                </div>
              </>
            )
          }

          {
            campaignType === "pdfType" && (
              <>
                <div
                  className={`relative flex items-center w-full justify-between flex-col gap-3 bg-blue-100 px-3 py-5 cursor-pointer border border-gray-700 rounded-md group transition-all duration-200 hover:bg-slate-800 hover:text-[#FFFF] capitalize text-[#000] overflow-hidden`}
                  onClick={mapFilesHandler}
                >
                  <MdCloudUpload size={30} />
                  <Text className="text-center text-[14px]">Map Data</Text>

                  {/* {!isFilePresent && ( */}
                  {/* original condition */}
                  {/* {(!isFilePresent) && (
                    <>
                      <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
                    </>
                  )} */}
                  {(!isFilePresent) && (
                    <>
                      <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
                    </>
                  )}
                </div>
              </>
            )
          }

          {
            campaignType === "mergeType" && (
              <>
                <div
                  className={`relative flex items-center w-full justify-between flex-col gap-3 bg-blue-100 px-3 py-5 cursor-pointer border border-gray-700 rounded-md group transition-all duration-200 hover:bg-slate-800 hover:text-[#FFFF] capitalize text-[#000] overflow-hidden`}
                  // onClick={mapFilesHandler}
                  onClick={!isDocumentTemplateSelected || isDataMappedCorrectly ? () => { } : () => setIsMapDataModal(true)}
                >
                  <MdCloudUpload size={30} />
                  <Text className="text-center text-[14px]">Map Data</Text>
                  {/* {(!isExcelPresent ||
                    !isDocumentTemplateSelected ||
                    isDataMappedCorrectly) && (
                      <>
                        {isDataMappedCorrectly && (
                          <div className="absolute top-2 right-2 z-20">
                            <figure
                              className={`text-red-600 font-bold  -translate-y-10 transition-all duration-300 group-hover:translate-y-0`}
                              onClick={deleteMapSelectedVarialbesHandler}
                            >
                              <IoReloadCircle size={30} />
                            </figure>
                          </div>
                        )}
                        <div className="absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
                      </>
                    )} */}
                    {(!isExcelPresent ||
                    !isDocumentTemplateSelected ||
                    isDataMappedCorrectly) && (
                      <>
                        {isDataMappedCorrectly && (
                          <div className="absolute top-2 right-2 z-20">
                            <figure
                              className={`text-red-600 font-bold  -translate-y-10 transition-all duration-300 group-hover:translate-y-0`}
                              onClick={deleteMapSelectedVarialbesHandler}
                            >
                              <IoReloadCircle size={30} />
                            </figure>
                          </div>
                        )}
                        <div className="absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
                      </>
                    )}
                </div>
              </>
            )
          }
        </div>
        <h2 className="h-[1px] bg-slate-300 w-full my-3"></h2>
        <h1 className=" font-bold text-xl text-center">Prepare</h1>
      </div>
      {isDocumentTemplateModal && <DocumentTemplateModal isDocumentTemplateModal={isDocumentTemplateModal}
        campaignType={campaignType} setIsDocumentTemplateModal={setIsDocumentTemplateModal} />}
      {isMapDataModal && <MapDataModal isMapDataModal={isMapDataModal} setIsMapDataModal={setIsMapDataModal}
        campaignType={campaignType} />}
    </>
  );
};

export default Prepare;
