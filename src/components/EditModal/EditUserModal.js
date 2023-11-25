import "./EditUserModal.css";
import React, { useEffect, useState } from 'react';
import { Modal, Input, Space, Select, Button } from 'antd';
import Config from "../../config-file.json"
import FloatLabel from "../float-label/float-label";
import { getData, putData } from "../../services/BaseApiOperations";

export default function EditUserModal({ user, rocket, planet, ticket, expendition, onCancel, visible, pageType, addEditTitle, userDelete, rocketDelete, planetDelete, expeditionDelete, ticketDelete }) {
    const [editedData, setEditedData] = useState(user);
    const [editRocket, setEditRocket] = useState(rocket);
    const [editPlanet, setEditPlanet] = useState(planet);
    const [editExpedition, setEditExpedition] = useState(expendition);
    const [editTicket, setEditTicket] = useState(ticket);
    const [errorText, setErrorText] = useState("");
    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);
    const [spaceVehicleId, setSelectedSpaceVehicle] = useState();
    const [departurePlanetId, setSelectedDeparturePlanet] = useState();
    const [arrivalPlanetId, setSelectedArrivalPlanet] = useState();

    const UserRole = {
        ADMIN: 1,
        CUSTOMER: 2,
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
            console.log("pageType",pageType)
            if (pageType === 'users') {
                const requiredFields = ['Name', 'Surname', 'EmailAdress', 'PhoneNumber', 'Username', 'Password'];
                for (const field of requiredFields) {
                    if (!editedData[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                const url = `${Config.SERVICE_URL}/users`;
                const data = editedData;
                await putData(url, data);
                onCancel();
            }
            if (pageType === 'spaceShips') {
                const requiredFields = ['Name', 'ModelName', 'ModelYear', 'SerialNumber', 'Description', 'MaxNumberOfPassengers', 'AgeLimit'];
                for (const field of requiredFields) {
                    if (!editRocket[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                const url = `${Config.SERVICE_URL}/space-vehicles`;
                const data = editRocket;
                await putData(url, data);
                await onCancel();
            }
            if (pageType === 'planets') {
                const requiredFields = ['Name', 'Sequence', 'DifficultyLevel', 'ImageUrl', 'DetailsImageUrl', 'Description'];
                for (const field of requiredFields) {
                    if (!editPlanet[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                const url = `${Config.SERVICE_URL}/planets`;
                const data = editPlanet;
                await putData(url, data);
                onCancel();
            }
            if (pageType === 'expedition') {
                const requiredFields = ['Name', 'ExpeditionDate', 'ArrivalDate', 'TicketPrice', 'SpaceVehicleId', 'DeparturePlanetId', 'ArrivalPlanetId'];
                for (const field of requiredFields) {
                    if (!editExpedition[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                const url = `${Config.SERVICE_URL}/expenditions`;
                const data = editExpedition;
                await putData(url, data);
                onCancel();
            }
            if (pageType === 'ticketAdmin') {
                const requiredFields = ['CreatedDate', 'ExpeditionId', 'SeatNumber'];
                for (const field of requiredFields) {
                    if (!editTicket[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                const url = `${Config.SERVICE_URL}/ticket-sales`;
                const data = editTicket;
                await putData(url, data);
                onCancel();

            }
        } catch (error) {
            setErrorText(error.Messages);
        }
    };

    const handleDeleteUser = () => {
        userDelete(user.Id);
    };

    const handleDeleteRocket = () => {
        rocketDelete(rocket.Id);
    };

    const handleDeletePlanet = () => {
        planetDelete(planet.Id);
    };

    const handleDeleteExpedition = () => {
        expeditionDelete(expendition.Id);
    };

    const handleDeleteTickets = () => {
        ticketDelete(ticket.Id);
    };

    useEffect(() => {
        fetchPlanetData();
        fetchRocketData();
    }, []);

    async function fetchPlanetData() {
        try {
            const url = `${Config.SERVICE_URL}/lookups/planets`;
            const data = await getData(url);
            setPlanetData(data);
        } catch (error) {
            console.error('API talebi başarısız oldu: ', error);
        }
    }

    async function fetchRocketData() {
        try {
            const url = `${Config.SERVICE_URL}/lookups/space-vehicles`;
            const data = await getData(url);
            setSpaceVehicleData(data);
        } catch (error) {
            console.error('API talebi başarısız oldu: ', error);
        }
    }

    const getPageContent = () => {
        switch (pageType) {
            case 'spaceShips':
                return (
                    <Space direction="vertical">
                        <div className='modalistBody'>
                            <FloatLabel label="Araç Adı" name="name" value={editRocket.Name}>
                                <Input
                                    value={editRocket.Name}
                                    onChange={(e) => setEditRocket({ ...editRocket, Name: e.target.value })}
                                    name="Name"
                                />
                            </FloatLabel>
                            <FloatLabel label="Model Yılı" name="ModelName" value={editRocket.ModelName}>
                                <Input
                                    value={editRocket.ModelName}
                                    onChange={(e) => setEditRocket({ ...editRocket, ModelName: e.target.value })}
                                    placeholder='Model Yılı'
                                    name="ModelName"
                                />
                            </FloatLabel>
                            <FloatLabel label="Model Adı" name="ModelYear" value={editRocket.ModelYear}>
                                <Input
                                    value={editRocket.ModelYear}
                                    onChange={(e) => setEditRocket({ ...editRocket, ModelYear: e.target.value })}
                                    placeholder='Model Adı'
                                    name="ModelYear"
                                />
                            </FloatLabel>
                            <FloatLabel label="Seri Numarası" name="SerialNumber" value={editRocket.SerialNumber}>
                                <Input
                                    value={editRocket.SerialNumber}
                                    onChange={(e) => setEditRocket({ ...editRocket, SerialNumber: e.target.value })}
                                    placeholder='Seri Numarası'
                                    name="SerialNumber"
                                />
                            </FloatLabel>
                            <FloatLabel label="Açıklama" name="Description" value={editRocket.Description}>
                                <Input
                                    value={editRocket.Description}
                                    onChange={(e) => setEditRocket({ ...editRocket, Description: e.target.value })}
                                    placeholder='Açıklama'
                                    name="Description"
                                />
                            </FloatLabel>
                            <FloatLabel label="Koltuk Numarası" name="MaxNumberOfPassengers" value={editRocket.MaxNumberOfPassengers}>
                                <Input
                                    value={editRocket.MaxNumberOfPassengers}
                                    onChange={(e) => setEditRocket({ ...editRocket, MaxNumberOfPassengers: e.target.value })}
                                    placeholder='Koltuk Numarası'
                                    name="MaxNumberOfPassengers"
                                />
                            </FloatLabel>
                            <FloatLabel label="Yaş Sınırı" name="AgeLimit" value={editRocket.AgeLimit}>
                                <Input
                                    value={editRocket.AgeLimit}
                                    onChange={(e) => setEditRocket({ ...editRocket, AgeLimit: e.target.value })}
                                    placeholder='Yaş Sınırı'
                                    name="AgeLimit"
                                />
                            </FloatLabel>
                        </div>
                    </Space>
                );
            case 'users':
                return (
                    <Space direction="vertical">
                        <div className='modalistBody'>
                            <FloatLabel label="İsim" name="Name" value={editedData.Name}>
                                <Input
                                    name="Name"
                                    value={editedData.Name}
                                    onChange={(e) => setEditedData({ ...editedData, Name: e.target.value })}
                                />
                            </FloatLabel>
                            <FloatLabel label="Soyisim" name="Surname" value={editedData.Surname}>
                                <Input
                                    name="Surname"
                                    value={editedData.Surname}
                                    onChange={(e) => setEditedData({ ...editedData, Surname: e.target.value })}
                                />
                            </FloatLabel>
                            <FloatLabel label="E-Posta Adresi" name="Email" value={editedData.Email}>
                                <Input
                                    name="Email"
                                    value={editedData.Email}
                                    onChange={(e) => setEditedData({ ...editedData, Email: e.target.value })}
                                />
                            </FloatLabel>
                            <FloatLabel label="Telefon Numarası" name="Phone" value={editedData.Phone}>
                                <Input
                                    name="Phone"
                                    value={editedData.Phone}
                                    onChange={(e) => setEditedData({ ...editedData, Phone: e.target.value })}
                                />
                            </FloatLabel>
                            <FloatLabel label="Kullanıcı Adı" name="Username" value={editedData.Username}>
                                <Input
                                    name="Username"
                                    value={editedData.Username}
                                    onChange={(e) => setEditedData({ ...editedData, Username: e.target.value })}
                                />
                            </FloatLabel>
                            <FloatLabel label="Şifre" name="password" value={editedData.Password}>
                                <Input
                                    name="password"
                                    value={editedData.Password}
                                    onChange={(e) => setEditedData({ ...editedData, Password: e.target.value })}
                                />
                            </FloatLabel>
                            <FloatLabel label="Rol" name="UserRoleType" value={editedData.UserRoleType}>
                                <Select
                                    value={editedData.UserRoleType || undefined}
                                    onChange={handleUserRoleChange}
                                    placeholder="Rol"
                                >
                                    {Object.values(UserRole).map((role) => (
                                        <Select.Option key={role} value={role}>
                                            {role === UserRole.ADMIN ? "Admin" : role === UserRole.CUSTOMER ? "Customer" : " "}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </FloatLabel>
                        </div>
                    </Space>
                );
            case 'planets':
                return (
                    <Space direction="vertical">
                        <div className='modalistBody'>
                            <FloatLabel label="Gezegen Adı" name="Name" value={editPlanet.Name}>
                                <Input
                                    onChange={(e) => setEditPlanet({ ...editPlanet, Name: e.target.value })}
                                    value={editPlanet.Name}
                                    name="Name"
                                />
                            </FloatLabel>
                            <FloatLabel label="Sıra" name="Sequence" value={editPlanet.Sequence}>
                                <Input
                                    onChange={(e) => setEditPlanet({ ...editPlanet, Sequence: e.target.value })}
                                    value={editPlanet.Sequence}
                                    name="Sequence"
                                />
                            </FloatLabel>
                            <FloatLabel label="Zorluk Seviyesi" name="DifficultyLevel" value={editPlanet.DifficultyLevel}>
                                <Input
                                    onChange={(e) => setEditPlanet({ ...editPlanet, DifficultyLevel: e.target.value })}
                                    value={editPlanet.DifficultyLevel}
                                    name="DifficultyLevel"
                                />
                            </FloatLabel>
                            <FloatLabel label="Resim Url" name="ImageUrl" value={editPlanet.ImageUrl}>
                                <Input
                                    onChange={(e) => setEditPlanet({ ...editPlanet, ImageUrl: e.target.value })}
                                    value={editPlanet.ImageUrl}
                                    name="ImageUrl"
                                />
                            </FloatLabel>
                            <FloatLabel label="Detaylı Resim Url" name="DetailsImageUrl" value={editPlanet.DetailsImageUrl}>
                                <Input
                                    onChange={(e) => setEditPlanet({ ...editPlanet, DetailsImageUrl: e.target.value })}
                                    value={editPlanet.DetailsImageUrl}
                                    name="DetailsImageUrl"
                                />
                            </FloatLabel>
                            <FloatLabel label="Açıklama" name="Description" value={editPlanet.Description}>
                                <Input
                                    onChange={(e) => setEditPlanet({ ...editPlanet, Description: e.target.value })}
                                    value={editPlanet.Description}
                                    name="Description"
                                />
                            </FloatLabel>
                        </div>
                    </Space>
                );
            case 'expedition':
                return (
                    <Space direction="vertical">
                        <div className='modalistBody'>
                            <FloatLabel label="Sefer Adı" name="Name" value={editExpedition.Name}>
                                <Input
                                    onChange={(e) => setEditExpedition({ ...editExpedition, Name: e.target.value })}
                                    value={editExpedition.Name}
                                    placeholder='Sefer Adı'
                                    name="Name"
                                />
                            </FloatLabel>
                            <FloatLabel label="Sefer Tarihi" name="ExpeditionDate" value={editExpedition.ExpeditionDate}>
                                <Input
                                    onChange={(e) => setEditExpedition({ ...editExpedition, ExpeditionDate: e.target.value })}
                                    value={editExpedition.ExpeditionDate}
                                    placeholder='Sefer Tarihi'
                                    name="ExpeditionDate"
                                />
                            </FloatLabel>
                            <FloatLabel label="Varış Adı" name="ArrivalDate" value={editExpedition.ArrivalDate}>
                                <Input
                                    onChange={(e) => setEditExpedition({ ...editExpedition, ArrivalDate: e.target.value })}
                                    value={editExpedition.ArrivalDate}
                                    placeholder='Varış Tarihi'
                                    name="ArrivalDate"
                                />
                            </FloatLabel>
                            <FloatLabel label="Bilet Fiyatı" name="TicketPrice" value={editExpedition.TicketPrice}>
                                <Input
                                    value={editExpedition.TicketPrice}
                                    onChange={(value) => setEditExpedition({ ...editExpedition, TicketPrice: value })}
                                    placeholder="Bilet Fiyatı"
                                    name="TicketPrice"
                                />
                            </FloatLabel>
                            <FloatLabel label="Uzay Aracı" name="SpaceVehicleId" value={editExpedition.SpaceVehicleId}>
                                <Select
                                    onChange={handleSelectSpaceVehicle}
                                    value={editExpedition.SpaceVehicleId}
                                    placeholder='Uzay Aracı'
                                    name="SpaceVehicleId"
                                >
                                    {spaceVehicleData.map(vehicle => (
                                        <Select.Option key={vehicle.id} value={vehicle.id}>
                                            {vehicle.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </FloatLabel>
                            <FloatLabel label="Kalkış Gezegeni" name="DeparturePlanetId" value={editExpedition.DeparturePlanetId}>
                                <Select
                                    onChange={handleSelectDeparturePlanet}
                                    value={editExpedition.DeparturePlanetId}
                                    placeholder='Kalkış Gezegeni'
                                    name="DeparturePlanetId"
                                >
                                    {planetData.map(planet => (
                                        <Select.Option key={planet.id} value={planet.id}>
                                            {planet.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </FloatLabel>
                            <FloatLabel label="Varış Gezegeni" name="ArrivalPlanetId" value={editExpedition.ArrivalPlanetId}>
                                <Select
                                    placeholder="Varış Gezegeni"
                                    onChange={handleSelectArrivalPlanet}
                                    value={editExpedition.ArrivalPlanetId}
                                    name="ArrivalPlanetId"
                                >
                                    {planetData.map(planet => (
                                        <Select.Option key={planet.id} value={planet.id}>
                                            {planet.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </FloatLabel>
                        </div>
                    </Space>
                );
            case 'ticketAdmin':
                return (
                    <Space direction="vertical">
                        <div className='modalistBody'>
                            <FloatLabel label="Oluşturma Tarihi" name="CreatedDate" value={editTicket.CreatedDate}>
                                <Input
                                    onChange={(e) => setEditTicket({ ...editTicket, CreatedDate: e.target.value })}
                                    value={editTicket.CreatedDate}
                                    name="CreatedDate"
                                />
                            </FloatLabel>
                            <FloatLabel label="Sefer Id" name="ExpeditionId" value={editTicket.ExpeditionId}>
                                <Input
                                    onChange={(e) => setEditTicket({ ...editTicket, ExpeditionId: e.target.value })}
                                    value={editTicket.ExpeditionId}
                                    name="ExpeditionId"
                                />
                            </FloatLabel>
                            <FloatLabel label="Koltuk Numarası" name="SeatNumber" value={editTicket.SeatNumber}>
                                <Input
                                    value={editTicket.SeatNumber}
                                    onChange={(e) => setEditTicket({ ...editTicket, SeatNumber: e.target.value })}
                                    name="SeatNumber"
                                />
                            </FloatLabel>
                        </div>
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
                            Sil
                        </Button>
                        <div>
                            <Button className='editSaveButton' key="save" type="primary" onClick={handleSave}>
                                Güncelle
                            </Button>
                            <Button className='editCancelButton' key="cancel" onClick={onCancel}>
                                İptal
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