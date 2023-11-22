import './ModalComponent.css';
import React, { useEffect, useState } from 'react';
import { Space, Input, Button, Modal, Select } from 'antd';
import { AiOutlineSave } from 'react-icons/ai';
import { fetchRocketsGet, fetchRocketsPost } from '../../services/RocketService';
import { fetchPlanetsGet, fetchPlanetsPost } from '../../services/PlanetService';
import { fetchExpeditionPost } from '../../services/ExpeditionService';
import { fetchUsersPost } from '../../services/userService';
import Config from "../../config-file.json"
import FloatLabel from '../float-label/float-label';

export function ModelComponent({ isModalVisible, onCancel, modalContent, addTitle }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);

    const [selectedSpaceVehicle, setSelectedSpaceVehicle] = useState("");
    const [selectedDeparturePlanet, setSelectedDeparturePlanet] = useState("");
    const [selectedArrivalPlanet, setSelectedArrivalPlanet] = useState("");

    const handleUserRoleChange = (value) => {
        SetValuesUsers((prev) => ({ ...prev, userRole: value }));
    };

    const UserRole = {
        ADMIN: 1,
        CUSTOMER: 2,
    };

    const [valuesRockets, setValuesRockets] = useState({
        name: "",
        modelYear: "",
        modelName: "",
        serialNumber: "",
        description: "",
        maxNumberOfPassengers: "",
        ageLimit: ""
    });

    const [valuesUsers, SetValuesUsers] = useState({
        name: "",
        surname: "",
        emailAddress: "",
        phoneNumber: "",
        username: "",
        isActive: true,
        password: "",
        userRole: ""
    });

    const [valuesPlanets, SetValuesPlanets] = useState({
        name: "",
        sequence: "",
        difficultyLevel: "",
        imageUrl: "",
        detailsImageUrl: "",
        description: "",
        summaryDescription: ""
    });

    const [valuesExpeditions, SetValuesExpeditions] = useState({
        name: "",
        expeditionDate: "",
        arrivalDate: "",
        ticketPrice: "",
        spaceVehicleId: "",
        departurePlanetId: "",
        arrivalPlanetId: ""
    });

    const handleSelectSpaceVehicle = (value) => {
        setSelectedSpaceVehicle(value);
    };

    const handleSelectDeparturePlanet = (value) => {
        setSelectedDeparturePlanet(value);
    };

    const handleSelectArrivalPlanet = (value) => {
        setSelectedArrivalPlanet(value);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name) {
            setValuesRockets((prev) => ({ ...prev, [name]: value }));
            SetValuesUsers((prev) => ({ ...prev, [name]: value }));
            SetValuesPlanets((prev) => ({ ...prev, [name]: value }));
            SetValuesExpeditions((prev) => ({ ...prev, [name]: value }));
        } else {
            if (modalContent === 'expedition') {
                if (e.target.name === 'spaceVehicleId') {
                    SetValuesExpeditions((prev) => ({ ...prev, spaceVehicleId: e }));
                } else if (e.target.name === 'departurePlanetId') {
                    SetValuesExpeditions((prev) => ({ ...prev, departurePlanetId: e }));
                } else if (e.target.name === 'arrivalPlanetId') {
                    SetValuesExpeditions((prev) => ({ ...prev, arrivalPlanetId: e }));
                }
            }
        }
    };

    const handleOk = async () => {
        if (modalContent === 'spaceShips') {
            rocketPost();
        }
        if (modalContent === 'users') {
            usersPost();
        }
        if (modalContent === 'planets') {
            planetsPost();
        }
        if (modalContent === 'expedition') {
            expeditionsPost();
        }
        setTimeout(() => {
            setErrorMessage(null);
        }, 3000);
    };

    /* ROCKET */
    const rocketPost = async () => {
        const requiredFields = [
            "name",
            "modelName",
            "modelYear",
            "serialNumber",
            "description",
            "maxNumberOfPassengers",
            "ageLimit"
        ];
        const errors = {};
        requiredFields.forEach(field => {
            if (!valuesRockets[field]) {
                errors[field] = `Lütfen ${field} alanını doldurun.`;
            }
        });
        if (Object.keys(errors).length > 0) {
            for (const field in errors) {
                setErrorMessage(errors[field]);
            }
        } else {
            const url = `${Config.SERVICE_URL}/space-vehicles`;
            try {
                const data = await fetchRocketsPost(valuesRockets, url);
                console.log(data);
            } catch (error) {
                console.error("Hata:", error);
            }
        }
    };

    useEffect(() => {
        async function fetchRocketData() {
            try {
                const url = `${Config.SERVICE_URL}/lookups/space-vehicles`;
                const data = await fetchRocketsGet(url);
                setSpaceVehicleData(data);
            } catch (error) {
                console.error('API talebi başarısız oldu: ', error);
            }
        }
        fetchRocketData();
    }, []);
    /* ROCKET */

    /* USERS */
    const usersPost = async () => {
        let hasError = false;

        if (!valuesUsers.name) {
            setErrorMessage("Lütfen isim alanını doldurun.");
            hasError = true;
        }

        if (!valuesUsers.surname) {
            setErrorMessage("Lütfen soyisim alanını doldurun.");
            hasError = true;
        }

        if (!valuesUsers.emailAddress) {
            setErrorMessage("Lütfen e-posta adresi alanını doldurun.");
            hasError = true;
        }

        if (!valuesUsers.phoneNumber) {
            setErrorMessage("Lütfen telefon numarası alanını doldurun.");
            hasError = true;
        }

        if (valuesUsers.phoneNumber.length < 11) {
            setErrorMessage("Telefon numarası 11 karakterden az olamaz.");
            hasError = true;
        }

        if (!valuesUsers.username) {
            setErrorMessage("Lütfen kullanıcı adı alanını doldurun.");
            hasError = true;
        }

        if (!valuesUsers.password) {
            setErrorMessage("Lütfen şifre alanını doldurun.");
            hasError = true;
        }

        if (!valuesUsers.userRole) {
            setErrorMessage("Lütfen role alanını doldurun.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const url = `${Config.SERVICE_URL}/users`;
        try {
            const data = await fetchUsersPost(valuesUsers, url);
            console.log(data);
        } catch (error) {
            console.error("Hata:", error);
        }
    };
    /* USERS */

    /* PLANET */
    const planetsPost = async () => {
        const requiredFields = [
            "name",
            "sequence",
            "difficultyLevel",
            "imageUrl",
            "detailsImageUrl",
            "description",
            "summaryDescription"
        ];
        const errors = {};
        requiredFields.forEach(field => {
            if (!valuesPlanets[field]) {
                errors[field] = `Lütfen ${field} alanını doldurun.`;
            }
        });
        if (Object.keys(errors).length > 0) {
            for (const field in errors) {
                setErrorMessage(errors[field]);
            }
        } else {
            const url = `${Config.SERVICE_URL}/planets`;
            try {
                const data = await fetchPlanetsPost(valuesPlanets, url);
                console.log(data);
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    useEffect(() => {
        async function fetchPlanetData() {
            try {
                const url = `${Config.SERVICE_URL}/lookups/planets`;
                const data = await fetchPlanetsGet(url);
                setPlanetData(data);
            } catch (error) {
                console.error('API talebi başarısız oldu: ', error);
            }
        }
        fetchPlanetData();
    }, []);
    /* PLANET */

    /* EXPEDITION */
    const expeditionsPost = async () => {
        const url = `${Config.SERVICE_URL}/expenditions`;
        const formattedExpeditionDate = new Date(valuesExpeditions.expeditionDate).toISOString();
        const formattedArrivalDate = new Date(valuesExpeditions.arrivalDate).toISOString();

        valuesExpeditions.spaceVehicleId = selectedSpaceVehicle;
        valuesExpeditions.departurePlanetId = selectedDeparturePlanet;
        valuesExpeditions.arrivalPlanetId = selectedArrivalPlanet;

        valuesExpeditions.expeditionDate = formattedExpeditionDate;
        valuesExpeditions.arrivalDate = formattedArrivalDate;

        try {
            const data = await fetchExpeditionPost(valuesExpeditions, url);
            console.log(data);
        } catch (error) {
            console.error("Hata:", error);
        }
    };
    /* EXPEDITION */

    const contentMap = {
        spaceShips: (
            <Space direction="vertical">
                <div className='modalistBody'>
                    <FloatLabel label="Araç Adı" name="name" value={valuesRockets.name}>
                        <Input
                            value={valuesRockets.name}
                            onChange={handleInput}
                            name="name"
                        />
                    </FloatLabel>
                    <FloatLabel label="Model Adı" name="modelName" value={valuesRockets.modelName}>
                        <Input
                            value={valuesRockets.modelName}
                            onChange={handleInput}
                            name="modelName"
                        />
                    </FloatLabel>
                    <FloatLabel label="Model Yılı" name="modelYear" value={valuesRockets.modelYear}>
                        <Input
                            value={valuesRockets.modelYear}
                            onChange={handleInput}
                            name="modelYear"
                        />
                    </FloatLabel>
                    <FloatLabel label="Seri Numarası" name="serialNumber" value={valuesRockets.serialNumber}>
                        <Input
                            value={valuesRockets.serialNumber}
                            onChange={handleInput}
                            name="serialNumber"
                        />
                    </FloatLabel>
                    <FloatLabel label="Açıklama" name="description" value={valuesRockets.description}>
                        <Input
                            value={valuesRockets.description}
                            onChange={handleInput}
                            name="description"
                        />
                    </FloatLabel>
                    <FloatLabel label="Koltuk Numarası" name="maxNumberOfPassengers" value={valuesRockets.maxNumberOfPassengers}>
                        <Input
                            value={valuesRockets.maxNumberOfPassengers}
                            onChange={handleInput}
                            name="maxNumberOfPassengers"
                        />
                    </FloatLabel>
                    <FloatLabel label="Yaş Sınırı" name="ageLimit" value={valuesRockets.ageLimit}>
                        <Input
                            value={valuesRockets.ageLimit}
                            onChange={handleInput}
                            name="ageLimit"
                        />
                    </FloatLabel>
                </div>
            </Space>
        ),
        users: (
            <Space direction="vertical">
                <div className='modalistBody'>
                    <FloatLabel label="İsim" name="name" value={valuesUsers.name}>
                        <Input
                            onChange={handleInput}
                            value={valuesUsers.name}
                            name="name"
                        />
                    </FloatLabel>
                    <FloatLabel label="Soyisim" name="surname" value={valuesUsers.surname}>
                        <Input
                            onChange={handleInput}
                            value={valuesUsers.surname}
                            name="surname"
                        />
                    </FloatLabel>
                    <FloatLabel label="E-Posta Address" name="emailAddress" value={valuesUsers.emailAddress}>
                        <Input
                            onChange={handleInput}
                            value={valuesUsers.emailAddress}
                            name="emailAddress"
                        />
                    </FloatLabel>
                    <FloatLabel label="Telefon Numarası" name="phoneNumber" value={valuesUsers.phoneNumber}>
                        <Input
                            onChange={handleInput}
                            value={valuesUsers.phoneNumber}
                            name="phoneNumber"
                        />
                    </FloatLabel>
                    <FloatLabel label="Kullanıcı Adı" name="username" value={valuesUsers.username}>
                        <Input
                            onChange={handleInput}
                            value={valuesUsers.username}
                            name="username"
                        />
                    </FloatLabel>
                    <FloatLabel label="Şifre" name="password" value={valuesUsers.password}>
                        <Input.Password
                            onChange={handleInput}
                            value={valuesUsers.password}
                            name="password"
                        />
                    </FloatLabel>
                    <FloatLabel label="Rol" name="userRole" value={valuesUsers.userRole}>
                        <Select
                            defaultValue={valuesUsers.userRole}
                            onChange={handleUserRoleChange}
                        >
                            {Object.values(UserRole).map(role => (
                                <Select.Option key={role} value={role}>
                                    {role === UserRole.ADMIN ? "Admin" : role === UserRole.CUSTOMER ? "Customer" : ""}
                                </Select.Option>
                            ))}
                        </Select>
                    </FloatLabel>
                </div>
            </Space>
        ),
        planets: (
            <Space direction="vertical">
                <div className='modalistBody'>
                    <FloatLabel label="Gezegen Adı" name="name" value={valuesPlanets.name}>
                        <Input
                            onChange={handleInput}
                            value={valuesPlanets.name}
                            name="name"
                        />
                    </FloatLabel>
                    <FloatLabel label="Sıra" name="sequence" value={valuesPlanets.sequence}>
                        <Input
                            onChange={handleInput}
                            value={valuesPlanets.sequence}
                            name="sequence"
                        />
                    </FloatLabel>
                    <FloatLabel label="Zorluk Seviyesi" name="difficultyLevel" value={valuesPlanets.difficultyLevel}>
                        <Input
                            onChange={handleInput}
                            value={valuesPlanets.difficultyLevel}
                            name="difficultyLevel"
                        />
                    </FloatLabel>
                    <FloatLabel label="Resim URL" name="imageUrl" value={valuesPlanets.imageUrl}>
                        <Input
                            onChange={handleInput}
                            value={valuesPlanets.imageUrl}
                            name="imageUrl"
                        />
                    </FloatLabel>
                    <FloatLabel label="Detaylı Resim Url" name="detailsImageUrl" value={valuesPlanets.detailsImageUrl}>
                        <Input
                            onChange={handleInput}
                            value={valuesPlanets.detailsImageUrl}
                            name="detailsImageUrl"
                        />
                    </FloatLabel>
                    <FloatLabel label="Açıklama" name="description" value={valuesPlanets.description}>
                        <Input
                            onChange={handleInput}
                            value={valuesPlanets.description}
                            name="description"
                        />
                    </FloatLabel>
                    <FloatLabel label="Detaylı Açıklama" name="summaryDescription" value={valuesPlanets.summaryDescription}>
                        <Input
                            onChange={handleInput}
                            value={valuesPlanets.summaryDescription}
                            name="summaryDescription"
                        />
                    </FloatLabel>
                </div>
            </Space>
        ),
        expedition: (
            <Space direction="vertical">
                <div className='modalistBody'>
                    <FloatLabel label="Sefer Adıı" name="name" value={valuesPlanets.name}>
                        <Input
                            onChange={handleInput}
                            value={valuesExpeditions.name}
                            name="name"
                        />
                    </FloatLabel>
                    <FloatLabel label="Kalkış Tarihi" name="expeditionDate" value={valuesPlanets.expeditionDate}>
                        <Input
                            onChange={handleInput}
                            value={valuesExpeditions.expeditionDate}
                            name="expeditionDate"
                        />
                    </FloatLabel>
                    <FloatLabel label="Varış Tarihi" name="arrivalDate" value={valuesPlanets.arrivalDate}>
                        <Input
                            onChange={handleInput}
                            value={valuesExpeditions.arrivalDate}
                            name="arrivalDate"
                        />
                    </FloatLabel>
                    <FloatLabel label="Bilet Fiyatı" name="ticketPrice" value={valuesPlanets.ticketPrice}>
                        <Input
                            onChange={handleInput}
                            value={valuesExpeditions.ticketPrice}
                            name="ticketPrice"
                        />
                    </FloatLabel>
                    <FloatLabel label="Uzay Aracı" name="spaceVehicleId" value={selectedSpaceVehicle}>
                        <Select
                            onChange={handleSelectSpaceVehicle}
                            value={selectedSpaceVehicle}
                            placeholder='Uzay Aracı'
                            name="spaceVehicleId"
                        >
                            {spaceVehicleData.map(vehicle => (
                                <Select.Option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.displayName}
                                </Select.Option>
                            ))}
                        </Select>
                    </FloatLabel>
                    <FloatLabel label="Kalkış Gezegeni" name="departurePlanetId" value={selectedDeparturePlanet}>
                        <Select
                            onChange={handleSelectDeparturePlanet}
                            value={selectedDeparturePlanet}
                            name="departurePlanetId"
                        >
                            {planetData.map(planet => (
                                <Select.Option key={planet.id} value={planet.id}>
                                    {planet.displayName}
                                </Select.Option>
                            ))}
                        </Select>
                    </FloatLabel>
                    <FloatLabel label="Varış Gezegeni" name="arrivalPlanetId" value={selectedArrivalPlanet}>
                        <Select
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
                    </FloatLabel>
                </div>
            </Space>
        )
    };

    return (
        <div className='modalCompContainer'>
            <Modal
                className='modalComponent'
                visible={isModalVisible}
                title={addTitle}
                onOk={handleOk}
                onCancel={onCancel}
                footer={[
                    <Button style={{ backgroundColor: "#7465F2" }} onClick={handleOk} type='primary' text="Kaydet" key="submit">
                        <AiOutlineSave style={{ color: "white" }} />
                        Kaydet
                    </Button>
                ]}
            >
                <div id='modalBody'>
                    {contentMap[modalContent]}
                    {errorMessage && (
                        <div className='addModalErrorContainer'>
                            {errorMessage}
                        </div>
                    )}
                </div>
            </Modal>
        </div >
    )
}