import React, { useEffect, useState } from 'react';
import '../ModalComponent/ModalComponent.css';
import { Space, Input, Button, Modal, Select } from 'antd';
import { AiOutlineSave } from 'react-icons/ai';
import { fetchRocketsGet, fetchRocketsPost } from '../../services/RocketService';
import { fetchPlanetsGet, fetchPlanetsPost } from '../../services/PlanetService';
import { fetchExpeditionPost } from '../../services/ExpeditionService';
import { fetchUsersPost } from '../../services/UserService';

const UserRole = {
    ADMIN: 1,
    USER: 0,
};

export function ModelComponent({ isModalVisible, onCancel, modalContent, addTitle }) {

    const [loading, setLoading] = useState(false);
    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);
    const [selectedSpaceVehicle, setSelectedSpaceVehicle] = useState("Space Vehicle");
    const [selectedDeparturePlanet, setSelectedDeparturePlanet] = useState("Departure Planet");
    const [selectedArrivalPlanet, setSelectedArrivalPlanet] = useState("Arrival Planet");

    const handleUserRoleChange = (value) => {
        SetValuesUsers((prev) => ({ ...prev, userRole: value }));
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
        userRole: UserRole.USER
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
            // Handle select inputs differently
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

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onCancel();
        });
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
    };

/* ROCKET */

    const rocketPost = async () => {
        setLoading(true);
        const url = "http://lambalog.com/api/space-vehicles";
        try {
            const data = await fetchRocketsPost(valuesRockets, url);
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
            onCancel();
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

    const usersPost = async () => {
        setLoading(true);
        const url = "http://lambalog.com/api/users";
        try {
            const data = await fetchUsersPost(valuesUsers, url);
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
            onCancel();
        }
    };

/* PLANET */
    const planetsPost = async () => {
        setLoading(true);
        const url = "http://lambalog.com/api/planets";
        try {
            const data = await fetchPlanetsPost(valuesPlanets, url);
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
            onCancel();
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

    const expeditionsPost = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
            onCancel();
        }
    };

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
                    <Input
                        id='modal-username-style-input' onChange={handleInput} value={valuesUsers.password} placeholder='Password' name="password"
                    />
                    <Select
                        defaultValue={valuesUsers.userRole}
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
        )
    };

    return (
        <div className='modalCompContainer'>
            <div className='modal-style'>
                <Modal
                    visible={isModalVisible}
                    title={addTitle}
                    onOk={handleOk}
                    onCancel={onCancel}
                    footer={[
                        <Button style={{ backgroundColor: "#7465F2" }} onClick={handleOk} type='primary' text="Kaydet" key="submit" loading={loading}>
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
