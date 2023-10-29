import React, { useEffect, useState } from 'react';
import '../ModalComponent/ModalComponent.css';
import { Space, Input, Button, Modal, Select } from 'antd';
import { AiOutlineSave } from 'react-icons/ai';
import { fetchRocketsGet, fetchRocketsPost } from '../../services/RocketService';
import { fetchPlanetsGet, fetchPlanetsPost } from '../../services/PlanetService';
import { fetchExpeditionPost } from '../../services/ExpeditionService';
import { fetchUsersPost } from '../../services/UserService';

export function ModelComponent({ isModalVisible, onCancel, modalContent, addTitle }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);

    const [selectedSpaceVehicle, setSelectedSpaceVehicle] = useState("Space Vehicle");
    const [selectedDeparturePlanet, setSelectedDeparturePlanet] = useState("Departure Planet");
    const [selectedArrivalPlanet, setSelectedArrivalPlanet] = useState("Arrival Planet");

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
            const url = "http://lambalog.com/api/space-vehicles";
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
                const url = "http://lambalog.com/api/lookups/space-vehicles";
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

        const url = "http://lambalog.com/api/users";
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
            const url = "http://lambalog.com/api/planets";
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
                const url = "http://lambalog.com/api/lookups/planets";
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
        const url = "http://lambalog.com/api/expenditions";
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
            <Space direction="vertical" id='date-picker-body'>
                <div className='modal-list'>
                    <Input
                        id='modal-username-style-input' value={valuesRockets.name} onChange={handleInput} placeholder='Name' name="name"
                    />
                    <Input
                        id='modal-username-style-input' value={valuesRockets.modelName} onChange={handleInput} placeholder='Model Name' name="modelName"
                    />
                    <Input
                        id='modal-username-style-input' value={valuesRockets.modelYear} onChange={handleInput} placeholder='Model Year' name="modelYear"
                    />
                    <Input
                        id='modal-username-style-input' value={valuesRockets.serialNumber} onChange={handleInput} placeholder='Seri No' name="serialNumber"
                    />
                    <Input
                        id='modal-username-style-input' value={valuesRockets.description} onChange={handleInput} placeholder='Description' name="description"
                    />
                    <Input
                        id='modal-username-style-input' value={valuesRockets.maxNumberOfPassengers} onChange={handleInput} placeholder='Seat Number' name="maxNumberOfPassengers"
                    />
                    <Input
                        id='modal-username-style-input' value={valuesRockets.ageLimit} onChange={handleInput} placeholder='Age Limit' name="ageLimit"
                    />
                </div>
            </Space>
        ),
        users: (
            <Space direction="vertical" id='date-picker-body'>
                <div className='modal-list'>
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesUsers.name} placeholder='Name' name="name"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesUsers.surname} placeholder='Surname' name="surname"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesUsers.emailAddress} placeholder='E-mail Address' name="emailAddress"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesUsers.phoneNumber} placeholder='Phone Number' name="phoneNumber"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesUsers.username} placeholder='Username' name="username"
                    />
                    <Input.Password
                        id='modal-username-style-input' onChange={handleInput} value={valuesUsers.password} placeholder='Password' name="password"
                    />
                    <Select
                        defaultValue={valuesUsers.userRole}
                        onChange={handleUserRoleChange}
                        placeholder="Role"
                    >
                        {Object.values(UserRole).map(role => (
                            <Select.Option key={role} value={role}>
                                {role === UserRole.ADMIN ? "Admin" : role === UserRole.CUSTOMER ? "Customer" : ""}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </Space>
        ),
        planets: (
            <Space direction="vertical" id='date-picker-body'>
                <div className='modal-list'>
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesPlanets.name} placeholder='Name' name="name"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesPlanets.sequence} placeholder='Sequence' name="sequence"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesPlanets.difficultyLevel} placeholder='Difficulty Level' name="difficultyLevel"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesPlanets.imageUrl} placeholder='Image Url' name="imageUrl"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesPlanets.detailsImageUrl} placeholder='Details Image Url' name="detailsImageUrl"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesPlanets.description} placeholder='Description' name="description"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesPlanets.summaryDescription} placeholder='Summary Description' name="summaryDescription"
                    />
                </div>
            </Space>
        ),
        expedition: (
            <Space direction="vertical" id='date-picker-body'>
                <div className='modal-list'>
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesExpeditions.name} placeholder='Name' name="name"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesExpeditions.expeditionDate} placeholder='Expedition Date' name="expeditionDate"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesExpeditions.arrivalDate} placeholder='Arrival Date' name="arrivalDate"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesExpeditions.ticketPrice} placeholder='Ticket Price' name="ticketPrice"
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
        ),
        ticketAdmin: (
            <Space direction="vertical" id='date-picker-body'>
                <div className='modal-list'>
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesExpeditions.name} placeholder='Name' name="name"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesExpeditions.expeditionDate} placeholder='Expedition Date' name="expeditionDate"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesExpeditions.arrivalDate} placeholder='Arrival Date' name="arrivalDate"
                    />
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesExpeditions.ticketPrice} placeholder='Ticket Price' name="ticketPrice"
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
        ),
    };

    return (
        <div className='modalCompContainer'>
            <div className='modal-style'>
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
                    <div id='modal-container'>
                        {contentMap[modalContent]}
                        {errorMessage && (
                            <div className='addModalErrorContainer'>
                                {errorMessage}
                            </div>
                        )}
                    </div>
                </Modal>
            </div >
        </div >
    )
}