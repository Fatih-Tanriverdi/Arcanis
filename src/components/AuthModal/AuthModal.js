import React, { useState } from 'react';
import '../AuthModal/AuthModal.css';
import { Modal } from 'antd';
import UserLogin from '../../pages/Login/UserLogin';
import Register from '../../pages/Register/Register';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';

export default function AuthModal({ isModalOpen, setIsModalOpen }) {

    const [pageAuthType, setPageAuthType] = useState('authLogin');

    const getAuthContent = () => {
        switch (pageAuthType) {
            case 'authLogin':
                return (
                    <UserLogin setPageAuthType={setPageAuthType} />
                );
            case 'authRegister':
                return (
                    <div className='authRegisterContainer'>
                        <Register setPageAuthType={setPageAuthType}/>
                    </div>
                );
            case 'authResetPassword':
                return (
                    <div>
                        <ResetPassword setPageAuthType={setPageAuthType}/>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='authModalContainer'>
            <Modal
                className="customerLoginModal"
                visible={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                ]}
            >
                {getAuthContent()}
            </Modal>
        </div>
    )
}
