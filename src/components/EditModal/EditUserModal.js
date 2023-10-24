import React, { useEffect, useState } from 'react';
import { Modal, Input, Space, Select } from 'antd';
import "./EditUserModal.css";
import { putUsers } from '../../services/UserService';
import { fetchRocketsGet, putRocket } from '../../services/RocketService';
import { fetchPlanetsGet, putPlanet } from '../../services/PlanetService';
import { putExpedition } from '../../services/ExpeditionService';

export default function EditUserModal({ user, rocket, planet, expendition, onSave, onCancel, visible, pageType, addEditTitle }) {
    const [editedData, setEditedData] = useState(user);
    const [editRocket, setEditRocket] = useState(rocket);
    const [editPlanet, setEditPlanet] = useState(planet);
    const [editExpedition, setEditExpedition] = useState(expendition);

    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);

    const [selectedSpaceVehicle, setSelectedSpaceVehicle] = useState("");
    const [selectedDeparturePlanet, setSelectedDeparturePlanet] = useState("");
    const [selectedArrivalPlanet, setSelectedArrivalPlanet] = useState("");

    const UserRole = {
        ADMIN: 1,
        CUSTOMER: 2,
    };

    const priceOptions = [];
    for (let price = 100000; price <= 500000; price += 10000) {
        priceOptions.push({
            value: price.toLocaleString(),
            label: `$${price.toLocaleString()}`
        });
    }

    const handleUserRoleChange = (value) => {
        setEditedData((prev) => ({ ...prev, userRole: value }));
    };

    const handleSelectSpaceVehicle = (value) => {
        setSelectedSpaceVehicle(value);
    };

    const handleSelectDeparturePlanet = (value) => {
        setSelectedDeparturePlanet(value);
    };

    const handleSelectArrivalPlanet = (value) => {
        setSelectedArrivalPlanet(value);
    };

    const handleSave = async () => {
        try {
            if (pageType === 'users') {
                await putUsers(editedData);
                onSave(user.id, editedData);
            }

            if (pageType === 'spaceShips') {
                await putRocket(editRocket);
                onSave(rocket.id, editRocket)
            }

            if (pageType === 'planets') {
                await putPlanet(editPlanet);
                onSave(planet.id, editPlanet);
            }

            if (pageType === 'expedition') {
                await putExpedition(editExpedition);
                onSave(expendition.id, editExpedition);
            }

            onCancel();
        } catch (error) {
            console.error("Güncelleme işlemi başarısız oldu.", error);
        }
    };

    useEffect(() => {
        async function fetchPlanetData() {
            try {
                const url = "http://lambalog.com/api/lookups/planets";
                const data = await fetchPlanetsGet(url);
                setPlanetData(data);
            } catch (error) {
                console.error('API talebi başarısız oldu: ', error);
            }
        }
        fetchPlanetData();
    }, []);

    useEffect(() => {
        async function fetchRocketData() {
            try {
                const url = "http://lambalog.com/api/lookups/space-vehicles";
                const data = await fetchRocketsGet(url);
                setSpaceVehicleData(data);
            } catch (error) {
                console.error('API talebi başarısız oldu: ', error);
            }
        }
        fetchRocketData();
    }, []);

    const getPageContent = () => {
        switch (pageType) {
            case 'spaceShips':
                return (
                    <Space direction="vertical" id='date-picker-body'>
                        <div className='modal-list'>
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.name}
                                onChange={(e) => setEditRocket({ ...editRocket, name: e.target.value })}
                                placeholder='Name'
                                name="name"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.modelName}
                                onChange={(e) => setEditRocket({ ...editRocket, modelName: e.target.value })}
                                placeholder='Model Year'
                                name="modelName"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.modelYear}
                                onChange={(e) => setEditRocket({ ...editRocket, modelYear: e.target.value })}
                                placeholder='Model Name'
                                name="modelYear"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.serialNumber}
                                onChange={(e) => setEditRocket({ ...editRocket, serialNumber: e.target.value })}
                                placeholder='Seri No'
                                name="serialNumber"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.description}
                                onChange={(e) => setEditRocket({ ...editRocket, description: e.target.value })} placeholder='Description'
                                name="description"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.maxNumberOfPassengers}
                                onChange={(e) => setEditRocket({ ...editRocket, maxNumberOfPassengers: e.target.value })} placeholder='Seat Number'
                                name="maxNumberOfPassengers"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.ageLimit}
                                onChange={(e) => setEditRocket({ ...editRocket, ageLimit: e.target.value })}
                                placeholder='Age Limit'
                                name="ageLimit"
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
                                value={editedData.EmailAddress}
                                onChange={(e) => setEditedData({ ...editedData, EmailAddress: e.target.value })}
                            />
                            <Input
                                id='modal-username-style-input'
                                placeholder='Phone Number'
                                name="phoneNumber"
                                value={editedData.PhoneNumber}
                                onChange={(e) => setEditedData({ ...editedData, PhoneNumber: e.target.value })}
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
                                        {role === UserRole.ADMIN ? "Admin" : role === UserRole.CUSTOMER ? "Customer" : " "}
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
                        <Space direction="vertical" id='date-picker-body'>
                            <div className='modal-list'>
                                <Input
                                    id='modal-username-style-input'
                                    onChange={(e) => setEditExpedition({ ...editExpedition, name: e.target.value })}
                                    value={editExpedition.name}
                                    placeholder='Name'
                                    name="name"
                                />
                                <Input
                                    id='modal-username-style-input'
                                    onChange={(e) => setEditExpedition({ ...editExpedition, expeditionDate: e.target.value })}
                                    value={editExpedition.expeditionDate}
                                    placeholder='Expedition Date'
                                    name="expeditionDate"
                                />
                                <Input
                                    id='modal-username-style-input'
                                    onChange={(e) => setEditExpedition({ ...editExpedition, arrivalDate: e.target.value })}
                                    value={editExpedition.arrivalDate}
                                    placeholder='Arrival Date'
                                    name="arrivalDate"
                                />
                                <Select
                                    value={editExpedition.ticketPrice}
                                    onChange={(value) => setEditExpedition({ ...editExpedition, ticketPrice: value })}
                                    placeholder="Ticket Price"
                                    options={priceOptions}
                                />
                                <Select
                                    id='modal-username-style-input'
                                    onChange={handleSelectSpaceVehicle}
                                    value={selectedSpaceVehicle}
                                    placeholder='Space Vehicle Id'
                                    name="spaceVehicleId"
                                >
                                    {spaceVehicleData.map(vehicle => (
                                        <Select.Option key={vehicle.id} value={vehicle.id}>
                                            {vehicle.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <Select
                                    id='modal-username-style-input'
                                    onChange={handleSelectDeparturePlanet}
                                    value={selectedDeparturePlanet}
                                    placeholder='Departure Planet Id'
                                    name="departurePlanetId"
                                >
                                    {planetData.map(planet => (
                                        <Select.Option key={planet.id} value={planet.id}>
                                            {planet.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <Select
                                    placeholder={"Arrival Planet"}
                                    id='modal-username-style-input'
                                    onChange={handleSelectArrivalPlanet}
                                    value={selectedArrivalPlanet}
                                    name="arrivalPlanetId"
                                >
                                    {planetData.map(planet => (
                                        <Select.Option key={planet.id} value={planet.id}>
                                            {planet.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                        </Space>
                    </Space>
                );
            default:
                return null;
        }
    };

    return (
        <div className='editUserModelContainer'>
            <Modal
                title={addEditTitle}
                visible={visible}
                onOk={handleSave}
                onCancel={onCancel}
            >
                {getPageContent()}
            </Modal>
        </div>
    );
}
