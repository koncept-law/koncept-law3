import React, { useEffect, useState } from 'react';
import { Modal, Button, Select } from 'antd';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { setLoader } from '../../../../../redux/features/loaders';
import { createDocumentTemplateFileThunkMiddleware, getAllCategoriesThunkMiddleware } from '../../../../../redux/features/campaigns';

const CreateTemplateModal = ({ open, setOpen }) => {
    const handleOk = () => {
        setOpen(false); // Close the modal when 'OK' is clicked
    };

    const handleCancel = () => {
        setOpen(false); // Close the modal when 'Cancel' is clicked
    };

    const dispatch = useDispatch();
    const { documentTemplateCategories } = useSelector((state) => state.campaigns);
    const [activeInputMethod, setActiveInputMethod] = useState("")

    const { addLoader } = useSelector((state) => state.loaders)

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    const handleTemplateSubmit = async (data) => {
        try {
            dispatch(setLoader({ addLoader: true }));
            const formData = new FormData();
            formData.append('folderName', data.foldername);
            formData.append('docsName', data.name);
            if (data.category !== "select") formData.append('category', data.category);
            if (data.file && data.file.length > 0) {
                formData.append('file', data.file[0]); // Get the first file
            }
            await dispatch(createDocumentTemplateFileThunkMiddleware(formData));
            // reset();
        } catch (error) {
            console.log("template modal error", error)
        } finally {
            dispatch(setLoader({ addLoader: false }));
            reset();
        }
    };

    useEffect(() => {
        const getCategories = async () => {
            dispatch(getAllCategoriesThunkMiddleware());
        };
        getCategories();
    }, [dispatch]);


    const handleActiveInputMethod = (method, value) => {
        setActiveInputMethod("")
        if (method === "input" && value !== "") {
            setActiveInputMethod("input");
        }
        else if (method === "dropdown" && (value !== "select")) {
            setActiveInputMethod("dropdown");
        }
    }

    const TextField = ({ control, errors, name = "", placeholder = "", label = "" }) => {
        return <>
            <div className="w-full">
                <label
                    htmlFor="firstname"
                    className="block text-sm font-medium font-poppins not-italic leading-normal text-[#000000]"
                >
                    {label}
                </label>
                <div className="flex items-center border w-full border-solid mt-1 border-[#6E6E6E] overflow-hidden  rounded-sm">
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id={name}
                                type="text"
                                name={name}
                                placeholder={placeholder}
                                className="w-full px-2.5 py-2 text-[#000000] text-sm font-poppins placeholder:font-poppins placeholder:not-italic placeholder:text-sm placeholder:leading-normal placeholder:font-medium placeholder:text-[#6E6E6E] not-italic leading-normal bg-transparent font-medium outline-none border-none"
                            />
                        )}
                    />
                </div>
                {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors[name].message}
                    </p>
                )}
            </div>
        </>
    }

    return (
        <Modal
            open={true} // Control visibility with the 'open' prop
            onCancel={handleCancel}
            footer={[]}
            centered
            closable={false}
            width={800}
        >
            <div className="w-full flex flex-col">
                <div className="relative modelHeadingBackground p-3 border-blue-800 rounded flex items-center justify-between">
                    <h1 className="text-white text-lg font-poppins not-italic leading-normal font-semibold">Create Template</h1>
                    <span
                        className="absolute right-4 text-white text-xl cursor-pointer"
                        onClick={handleCancel}
                    >
                        <MdOutlineClose />
                    </span>
                </div>
                <div className="bg-white px-4 py-2 w-full">
                    <div className="">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Folder Name
                        </label>
                        <div className="flex gap-x-4 items-end w-full">
                            <TextField
                                name="foldername"
                                control={control}
                                errors={errors}
                                placeholder='Enter Folder Name'
                            />

                            <span className="text-lg flex justify-center items-start h-full">OR</span>

                            <Controller
                                name="foldername"
                                control={control}
                                rules={activeInputMethod === "dropdown" ? { required: true } : { required: false }}
                                render={({ field }) => (
                                    <Select
                                        showSearch
                                        placeholder="Select an Option"
                                        // defaultValue={{label : "Select An Option" , value : "Some Option"}}
                                        className="w-full h-[40px] block rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...field}
                                        options={[
                                            { label: "Select an Option", value: "select" },
                                            ...(documentTemplateCategories?.map((option) => ({ label: option.name, value: option.name })) || [])
                                        ]}
                                        onChange={(value) => handleActiveInputMethod("dropdown", value)}
                                        disabled={activeInputMethod === "input" ? true : false}
                                    />
                                )}
                            />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Template Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                autoComplete="name"
                                {...register("name", { required: true })}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="file"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Document Upload
                        </label>
                        <div className="mt-2">
                            <input
                                id="file"
                                name="file"
                                type="file"
                                {...register("file", { required: true })}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.file && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium leading-6 text-gray-900 my-2"
                        >
                            Select Category
                        </label>
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    showSearch
                                    placeholder="Select an Option"
                                    // defaultValue={{label : "Select An Option" , value : "Some Option"}}
                                    className="w-full h-[40px] block rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...field}
                                    options={[
                                        { label: "Select an Option", value: "select" },
                                        ...(documentTemplateCategories?.map((option) => ({ label: option.name, value: option.name })) || [])
                                    ]}
                                />
                            )}
                        />
                        {errors.category && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={addLoader}
                            className={`flex w-full justify-center rounded-md ${addLoader ? "bg-indigo-400" : "bg-indigo-600"}  min-h-fit 
                                            h-[40px] sm:px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
                                            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                                            focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                            {addLoader ? <span className="flex justify-center items-center"><Spinner /></span> : "Create Template"}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CreateTemplateModal;
