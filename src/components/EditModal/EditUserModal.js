import React, { useState } from 'react';
import { Modal, Input, Space, Select } from 'antd';
import "./EditUserModal.css";

export default function EditUserModal({ user, rocket, planet, onSave, onCancel, visible, pageType}) {
    const [editedData, setEditedData] = useState(user);
    const [editRocket, setEditRocket] = useState(rocket);
    const [editPlanet, setEditPlanet] = useState(planet);

    const handleSave = () => {
        onSave(user.id, editedData);
        onCancel();
    };

    const UserRole = {
        ADMIN: 'Admin',
        USER: 'User',
        MODERATOR: 'Moderator'
    };

    const handleUserRoleChange = (value) => {
        setEditedData((prev) => ({ ...prev, userRole: value }));
    };

    const getPageContent = () => {
        switch (pageType) {
            case 'spaceShips':
                return (
                    <Space direction="vertical" id='date-picker-body'>
                        <div className='modal-list'>
                            <Input
                                id='modal-username-style-input' value={editRocket.name} onChange={(e) => setEditRocket({ ...editRocket, name: e.target.value })} placeholder='Name' name="name"
                            />
                            <Input
                                id='modal-username-style-input' value={editRocket.modelName} onChange={(e) => setEditRocket({ ...editRocket, modelName: e.target.value })} placeholder='Model Year' name="modelName"
                            />
                            <Input
                                id='modal-username-style-input' value={editRocket.modelYear} onChange={(e) => setEditRocket({ ...editRocket, modelYear: e.target.value })} placeholder='Model Name' name="modelYear"
                            />
                            <Input
                                id='modal-username-style-input' value={editRocket.serialNumber} onChange={(e) => setEditRocket({ ...editRocket, serialNumber: e.target.value })} placeholder='Seri No' name="serialNumber"
                            />

                            <Input
                                id='modal-username-style-input' value={editRocket.description} onChange={(e) => setEditRocket({ ...editRocket, description: e.target.value })} placeholder='Description' name="description"
                            />
                            <Input
                                id='modal-username-style-input' value={editRocket.maxNumberOfPassengers} onChange={(e) => setEditRocket({ ...editRocket, maxNumberOfPassengers: e.target.value })} placeholder='Seat Number' name="maxNumberOfPassengers"
                            />
                            <Input
                                id='modal-username-style-input' value={editRocket.ageLimit} onChange={(e) => setEditRocket({ ...editRocket, ageLimit: e.target.value })} placeholder='Age Limit' name="ageLimit"
                            />
                        </div>
                    </Space>
                );
            case 'users':
                return (
                    <Space direction="vertical" id='date-picker-body'>
                        <div className='modal-list'>
                            <Input
                                id='modal-username-style-input'
                                placeholder='Name'
                                name="name"
                                value={editedData.name}
                                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                            />
                            <Input
                                id='modal-username-style-input'
                                placeholder='Surname'
                                name="surname"
                                value={editedData.surname}
                                onChange={(e) => setEditedData({ ...editedData, surname: e.target.value })}
                            />
                            <Input
                                id='modal-username-style-input'
                                placeholder='E-mail Address'
                                name="emailAddress"
                                value={editedData.email}
                                onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                            />
                            <Input
                                id='modal-username-style-input'
                                placeholder='Phone Number'
                                name="phoneNumber"
                                value={editedData.phone}
                                onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                            />
                            <Input
                                id='modal-username-style-input'
                                placeholder='Username'
                                name="username"
                                value={editedData.username}
                                onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
                            />
                            <Input
                                id='modal-username-style-input'
                                placeholder='Password'
                                name="password"
                                value={editedData.password}
                                onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
                            />
                            <Select
                                defaultValue={editedData.userRole}
                                onChange={handleUserRoleChange}
                                placeholder="Role"
                            >
                                {Object.values(UserRole).map((role) => (
                                    <Select.Option key={role} value={role}>
                                        {role}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    </Space>
                );
            case 'planets':
                return (
                    <Space direction="vertical" id='date-picker-body'>
                        <div className='modal-list'>
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, name: e.target.value })} value={editPlanet.name} placeholder='Name' name="name"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, name: e.target.value })} value={editPlanet.sequence} placeholder='Sequence' name="sequence"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, name: e.target.value })} value={editPlanet.difficultyLevel} placeholder='Difficulty Level' name="difficultyLevel"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, name: e.target.value })} value={editPlanet.imageUrl} placeholder='Image Url' name="imageUrl"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, name: e.target.value })} value={editPlanet.detailsImageUrl} placeholder='Details Image Url' name="detailsImageUrl"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, name: e.target.value })} value={editPlanet.description} placeholder='Description' name="description"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, name: e.target.value })} value={editPlanet.summaryDescription} placeholder='Summary Description' name="summaryDescription"
                            />
                        </div>
                    </Space>
                );
            case 'expedition':
                return (
                    <Space direction="vertical" id='date-picker-body'>
                        
                    </Space>
                );
            default:
                return null;
        }
    };

    return (
        <div className='editUserModelContainer'>
            <Modal
                title={"Edit"}
                visible={visible}
                onOk={handleSave}
                onCancel={onCancel}
            >
                {getPageContent()}
            </Modal>
        </div>
    );
}
