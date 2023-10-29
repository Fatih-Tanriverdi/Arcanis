import React, { useEffect, useState } from 'react';
import { Modal, Input, Space, Select, Button } from 'antd';
import "./EditUserModal.css";
import { putUsers } from '../../services/UserService';
import { fetchRocketsGet, putRocket } from '../../services/RocketService';
import { fetchPlanetsGet, putPlanet } from '../../services/PlanetService';
import { putExpedition } from '../../services/ExpeditionService';

export default function EditUserModal({ user, rocket, planet, ticket, expendition, onSave, onCancel, visible, pageType, addEditTitle, userDelete, rocketDelete, planetDelete, expeditionDelete, handleDeleteTicket }) {
    const [editedData, setEditedData] = useState(user);
    const [editRocket, setEditRocket] = useState(rocket);
    const [editPlanet, setEditPlanet] = useState(planet);
    const [editExpedition, setEditExpedition] = useState(expendition);
    const [editTicket, setEditTicket] = useState(ticket);

    const [errorText, setErrorText] = useState("");
    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);

    const [selectedSpaceVehicle, setSelectedSpaceVehicle] = useState("Space Vehicle");
    const [selectedDeparturePlanet, setSelectedDeparturePlanet] = useState("Departure Planet");
    const [selectedArrivalPlanet, setSelectedArrivalPlanet] = useState("Arrival Planet");

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
    };

    const ageLimitOptions = [];
    for (let age = 1; age <= 100; age++) {
        ageLimitOptions.push({
            value: age.toString(),
            label: age.toString()
        })
    };

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

    useEffect(() => {
        if (errorText) {
            const timer = setTimeout(() => {
                setErrorText("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorText]);

    const handleSave = async () => {
        try {
            if (pageType === 'users') {
                const requiredFields = ['name', 'surname', 'EmailAddress', 'PhoneNumber', 'username', 'password'];
                for (const field of requiredFields) {
                    if (!editedData[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                await putUsers(editedData);
                onSave(user.id, editedData);
            }
            if (pageType === 'spaceShips') {
                const requiredFields = ['name', 'modelName', 'modelYear', 'serialNumber', 'description', 'maxNumberOfPassengers', 'ageLimit'];
                for (const field of requiredFields) {
                    if (!editRocket[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                await putRocket(editRocket);
                onSave(rocket.id, editRocket)
            }
            if (pageType === 'planets') {
                const requiredFields = ['name', 'sequence', 'difficultyLevel', 'imageUrl', 'detailsImageUrl', 'description', 'summaryDescription'];
                for (const field of requiredFields) {
                    if (!editPlanet[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                await putPlanet(editPlanet);
                onSave(planet.id, editPlanet);
            }
            if (pageType === 'expedition') {
                const requiredFields = ['name', 'expeditionDate', 'arrivalDate', 'ticketPrice', 'selectedSpaceVehicle', 'selectedDeparturePlanet', 'selectedArrivalPlanet'];
                for (const field of requiredFields) {
                    if (!editExpedition[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                await putExpedition(editExpedition);
                onSave(expendition.id, editExpedition);
            }
            if (pageType === 'ticketAdmin') {
                const requiredFields = ['CreatedDate', 'ExpeditionId', 'SeatNumber'];
                for (const field of requiredFields) {
                    if (!editTicket[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                await putExpedition(editTicket);
                onSave(ticket.id, editTicket);
            }
            onCancel();
        } catch (error) {
            console.error("Güncelleme işlemi başarısız oldu.", error);
            setErrorText("Güncelleme işlemi başarısız oldu.");
        }
    };

    const handleDeleteUser = () => {
        userDelete(user.id);
    };

    const handleDeleteRocket = () => {
        rocketDelete(rocket.id);
    };

    const handleDeletePlanet = () => {
        planetDelete(planet.id);
    };

    const handleDeleteExpedition = () => {
        expeditionDelete(expendition.id);
    };

    const handleDeleteTickets = () => {
        handleDeleteTicket(ticket.id);
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
                                value={editRocket.Name}
                                onChange={(e) => setEditRocket({ ...editRocket, Name: e.target.value })}
                                placeholder='Name'
                                name="Name"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.ModelName}
                                onChange={(e) => setEditRocket({ ...editRocket, ModelName: e.target.value })}
                                placeholder='Model Year'
                                name="ModelName"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.ModelYear}
                                onChange={(e) => setEditRocket({ ...editRocket, ModelYear: e.target.value })}
                                placeholder='Model Name'
                                name="ModelYear"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.SerialNumber}
                                onChange={(e) => setEditRocket({ ...editRocket, SerialNumber: e.target.value })}
                                placeholder='Seri No'
                                name="SerialNumber"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.Description}
                                onChange={(e) => setEditRocket({ ...editRocket, Description: e.target.value })} placeholder='Description'
                                name="Description"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.MaxNumberOfPassengers}
                                onChange={(e) => setEditRocket({ ...editRocket, MaxNumberOfPassengers: e.target.value })} placeholder='Seat Number'
                                name="MaxNumberOfPassengers"
                            />
                            <Input
                                id='modal-username-style-input'
                                value={editRocket.AgeLimit}
                                onChange={(e) => setEditRocket({ ...editRocket, AgeLimit: e.target.value })}
                                placeholder='Age Limit'
                                name="AgeLimit"
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
                                value={editedData.userRole || undefined}
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
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, Name: e.target.value })} value={editPlanet.Name} placeholder='Name' name="Name"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, Sequence: e.target.value })} value={editPlanet.Sequence} placeholder='Sequence' name="Sequence"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, DifficultyLevel: e.target.value })} value={editPlanet.DifficultyLevel} placeholder='Difficulty Level' name="DifficultyLevel"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, ImageUrl: e.target.value })} value={editPlanet.ImageUrl} placeholder='Image Url' name="ImageUrl"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, DetailsImageUrl: e.target.value })} value={editPlanet.DetailsImageUrl} placeholder='Details Image Url' name="DetailsImageUrl"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, Description: e.target.value })} value={editPlanet.Description} placeholder='Description' name="Description"
                            />
                            <Input
                                id='modal-username-style-input' onChange={(e) => setEditPlanet({ ...editPlanet, summaryDescription: e.target.value })} value={editPlanet.summaryDescription} placeholder='Summary Description' name="summaryDescription"
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
            case 'ticketAdmin':
                return (
                    <Space direction="vertical" id='date-picker-body'>
                        <Space direction="vertical" id='date-picker-body'>
                            <div className='modal-list'>
                                <Input
                                    id='modal-username-style-input'
                                    onChange={(e) => setEditTicket({ ...editTicket, CreatedDate: e.target.value })}
                                    value={editTicket.CreatedDate}
                                    placeholder='CreatedDate'
                                    name="CreatedDate"
                                />
                                <Input
                                    id='modal-username-style-input'
                                    onChange={(e) => setEditTicket({ ...editTicket, ExpeditionId: e.target.value })}
                                    value={editTicket.ExpeditionId}
                                    placeholder='ExpeditionId'
                                    name="ExpeditionId"
                                />
                                <Select
                                    value={editTicket.SeatNumber}
                                    onChange={(value) => setEditTicket({ ...editTicket, SeatNumber: value })}
                                    placeholder="SeatNumber"
                                    name="SeatNumber"
                                    options={ageLimitOptions}
                                />
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
                className='modalComponent'
                title={addEditTitle}
                visible={visible}
                onOk={handleSave}
                onCancel={onCancel}
                footer={[
                    <div className='editButtonContainer'>
                        <Button className='editDeleteButton' key="delete" type="danger" onClick={
                            pageType === 'users' ? handleDeleteUser :
                                pageType === 'spaceShips' ? handleDeleteRocket :
                                    pageType === 'planets' ? handleDeletePlanet :
                                        pageType === 'expedition' ? handleDeleteExpedition : 
                                            pageType === 'ticketAdmin' ? handleDeleteTickets : null
                        }>
                            Delete
                        </Button>
                        <div>
                            <Button className='editSaveButton' key="save" type="primary" onClick={handleSave}>
                                Save
                            </Button>
                            <Button className='editCancelButton' key="cancel" onClick={onCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                ]}
            >
                {getPageContent()}
                {errorText && <div className='addModalErrorContainer'>{errorText}</div>}
            </Modal>
        </div>
    );
}