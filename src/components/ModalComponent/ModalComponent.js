import React, { useState } from 'react';
import '../ModalComponent/ModalComponent.css';
import { Space, Input, Button, Modal } from 'antd';
import { AiOutlineSave } from 'react-icons/ai';

export function ModelComponent({ isModalVisible, onCancel, modalContent }) {

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: "",
        modelYear: 0,
        modelName: "",
        serialNumber: "",
        description: "",
        maxNumberOfPassengers: 0,
        ageLimit: 0
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onCancel();
        }, 3000);
    };

    const contentMap = {
        spaceShips: (
            <Space direction="vertical" id='date-picker-body'>
                <div className='modal-list'>
                    <Input
                        id='modal-username-style-input' value={values.name} onChange={handleInput} placeholder='Name' name="name" style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }}
                    />
                    <Input
                        id='modal-username-style-input' value={values.modelName} onChange={handleInput} placeholder='Model Name' name="modelName" style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }}
                    />
                    <Input
                        id='modal-username-style-input' value={values.modelYear} onChange={handleInput} placeholder='Model Years' name="modelYear" style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }}
                    />
                    <Input
                        id='modal-username-style-input' value={values.serialNumber} onChange={handleInput} placeholder='Seri No' name="serialNumber" style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }}
                    />

                    <Input
                        id='modal-username-style-input' value={values.description} onChange={handleInput} placeholder='description' name="description" style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }}
                    />
                    <Input
                        id='modal-username-style-input' value={values.maxNumberOfPassengers} onChange={handleInput} placeholder='maxNumberOfPassengers' name="maxNumberOfPassengers" style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }}
                    />
                    <Input
                        id='modal-username-style-input' value={values.ageLimit} onChange={handleInput} placeholder=' ageLimit' name="ageLimit" style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }}
                    />
                </div>
            </Space>
        ),
        users: (
            <Space direction="vertical" id='date-picker-body'>
                <div className='modal-list'>
                    <Input
                        id='modal-username-style-input' value={values.name} onChange={handleInput} placeholder='users' name="name" style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }}
                    />
                </div>
            </Space>
        ),
        planets: (
            <Space direction="vertical" id='date-picker-body'>
                <div className='modal-list'>
                    <Input
                        id='modal-username-style-input' value={values.name} onChange={handleInput} placeholder='planets' name="name" style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }}
                    />
                </div>
            </Space>
        ),
        expedition: (
            <Space direction="vertical" id='date-picker-body'>
                <div className='modal-list'>
                    <Input
                        id='modal-username-style-input' value={values.name} onChange={handleInput} placeholder='expedition' name="name" style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }}
                    />
                </div>
            </Space>
        )
    };

    const rocketPost = async () => {
        setLoading(true);
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch("http://lambalog.com/api/space-vehicles", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(values)
        });
        setTimeout(() => {
            setLoading(false);
            onCancel();
        }, 2000);
        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            throw new Error(data.error || 'Kullanıcı adı veya şifre yanlış.');
        };
        return data;
    }

    return (
        <div className='modalCompContainer'>
            <div className='modal-style'>
                <Modal
                    visible={isModalVisible}
                    title="Yeni Kullanıcı Ekle"
                    onOk={handleOk}
                    onCancel={onCancel}
                    footer={[
                        <Button onClick={rocketPost} type='primary' text="Kaydet" key="submit" loading={loading}>
                            <AiOutlineSave style={{ color: "white" }} />
                            Kaydet
                        </Button>
                    ]}
                >
                    <div id='modal-container'>
                        {contentMap[modalContent]}
                    </div>
                </Modal>
            </div >
        </div >
    )
}
