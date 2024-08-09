import { memo } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const DownloadDocumentTopBar = memo(({ title = "" , refreshPage }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { docuementTemplateFiles } = useSelector((state) => state.campaigns);

    // useEffect(() => { }, [docuementTemplateFiles])

    // const refreshHandler = () => {
    //     dispatch(
    //         // getAllCampaignThunkMiddleware({ accountId: singleUser.accountId})
    //         getAllTemplateFilesThunkMiddleware()
    //     );
    // };

    return (
        <div className="h-fit px-4 py-2 gap-4 flex flex-wrap w-full justify-between bg-white rounded-md">
            <div className=" flex md:flex-row flex-col md:items-center items-startS gap-4">
                <button
                    onClick={() => navigate("/campaigns/campaigndetails")}
                    className="w-fit flex items-center gap-1 buttonBackground px-2 py-1 rounded-md text-white font-semibold"
                >
                    <IoMdArrowRoundBack size={26} />
                </button>
                <h1 className=" text-xl font-semibold">{title}</h1>
            </div>
            <div>
                <button
                    onClick={refreshPage}
                    className="w-fit flex items-center gap-1 buttonBackground px-2 py-1 rounded-md text-white font-semibold"
                >
                    Refresh
                </button>
            </div>
        </div>
    )
});
