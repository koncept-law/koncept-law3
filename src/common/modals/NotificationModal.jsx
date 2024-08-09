import React from 'react';
import { Modal } from 'antd';
import { RxCross2 } from 'react-icons/rx';

const NotificationModal = ({ isVisible = false, onClose = function () { } }) => {
    const modalStyle = {
        position: 'fixed',
        top: 20, // Adjust top position
        right: 20, // Adjust right position
        margin: 0,
        transform: 'none', // Prevent default transformations
    };

    return (
        <Modal
            open={isVisible}
            closable={false}
            onCancel={onClose}
            footer={[]}
            okText="Confirm"
            cancelText="Cancel"
            className="custom-modal"
            centered={false} // Override centered positioning
            style={modalStyle} // Apply inline styles
        >
            <div className='flex flex-col'>
                <div className='w-full flex justify-between items-center py-2 px-3'>
                    <h2 className='font-poppns not-italic leading-normal font-semibold text-[16px]'>Notifications</h2>
                    <button className='cursor-pointer active:text-red-600' onClick={onClose}>
                        <RxCross2 size={"18px"} />
                    </button>
                </div>
                <div className='h-[1px] bg-gray-400 w-full'></div>

                <h2 className='text-center my-3'>No Notifications!</h2>
            </div>
        </Modal>
    );
};

export default NotificationModal;
