import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { checkToken } from "../../services/authService";
import { TfiStatsUp } from "react-icons/tfi";
import { LiaUserSolid } from "react-icons/lia";
import { BiCube } from "react-icons/bi";
import { BiRefresh } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Popover, Progress, Space } from "antd";
import Config from "../../config-file.json";
import { displayMoney } from "../../helpers/utils";
import { getData } from "../../services/BaseApiOperations";

export default function MainPage() {
  const [usersMostTicketsData, setUsersMostTicketsData] = useState([]);
  const [planetsMostPopulerData, setPlanetsMostPopulerData] = useState([]);
  const [expeditionsTotalCompleted, setExpeditionsTotalCompleted] = useState([]);
  const [totalAmountsCompleted, setTotalAmountsCompleted] = useState([]);

  const conicColors = {
    "0%": "#87d068",
    "50%": "#ffe58f",
    "100%": "#ffccc7",
  };

  useEffect(() => {
    checkToken();
    fetchTotalMostTicketsData();
    fetchUsersMostTicketsData();
    fetcTotalExpeditionsData();
    fetchUsersMostPlanetsData();
  }, []);

  /* Total */
  const fetchTotalMostTicketsData = async () => {
    const url = `${Config.SERVICE_URL}/statistics/total-amounts`;
    const data = await getData(url).catch((error) => {
      console.error("API request failed:", error);
      return [];
    });
    setTotalAmountsCompleted(data);
  }
  /* Total */
  /* Ticket */
  const fetchUsersMostTicketsData = async () => {
    const url = `${Config.SERVICE_URL}/statistics/users-who-purchased-most-tickets`;
    const data = await getData(url).catch((error) => {
      console.error("API request failed:", error);
      return [];
    });
    setUsersMostTicketsData(data);
  }

  const handleRefreshUsersMostTickets = async () => {
    const url = `${Config.SERVICE_URL}/statistics/users-who-purchased-most-tickets`;
    const data = await getData(url).catch((error) => {
      console.error("API request failed:", error);
      return [];
    });
    setUsersMostTicketsData(data);
  };
  /* Ticket */
  /* Expedetion */
  const fetcTotalExpeditionsData = async () => {
    const url = `${Config.SERVICE_URL}/statistics/completed-expeditions`;
    const data = await getData(url).catch((error) => {
      console.error("API request failed:", error);
      return [];
    });
    setExpeditionsTotalCompleted(data);
  }

  const handleRefreshExpeditions = async () => {
    const url = `${Config.SERVICE_URL}/statistics/completed-expeditions`;
    const data = await getData(url).catch((error) => {
      console.error("API request failed:", error);
      return [];
    });
    setExpeditionsTotalCompleted(data);
  };
  /* Expedetion */
  /* Planet */
  const fetchUsersMostPlanetsData = async () => {
    const url = `${Config.SERVICE_URL}/statistics/most-traveled-planet`;
    const data = await getData(url).catch((error) => {
      console.error("API request failed:", error);
      return [];
    });
    setPlanetsMostPopulerData(data);
  }

  const handleRefreshPlanetsMostPopular = async () => {
    const url = `${Config.SERVICE_URL}/statistics/most-traveled-planet`;
    const data = await getData(url).catch((error) => {
      console.error("API request failed:", error);
      return [];
    });
    setPlanetsMostPopulerData(data);
  };
  /* Planet */

  return (
    <container className="mainPageContainer">
      <div className="mainPageBody">
        <div className="mainPageTitle">
          <h3>Anasayfa</h3>
        </div>
        <div className="mainPageBodyContent">
          <div className="mainPageBodyContentBox">
            <div className="mainPageBodyContentSvg bg-1 svgColor-1">
              <TfiStatsUp />
            </div>
            <div className="mainPageBodyContentTitle">
              <h1>{totalAmountsCompleted.numberOfSpaceVehicles}</h1>
              <p>Uzay Aracı Sayısı</p>
            </div>
          </div>
          <div className="mainPageBodyContentBox">
            <div className="mainPageBodyContentSvg bg-2 svgColor-2">
              <LiaUserSolid />
            </div>
            <div className="mainPageBodyContentTitle">
              <h1>{totalAmountsCompleted.numberOfUsers}</h1>
              <p>Kullanıcı Sayısı</p>
            </div>
          </div>
          <div className="mainPageBodyContentBox">
            <div className="mainPageBodyContentSvg bg-3 svgColor-3">
              <BiCube />
            </div>
            <div className="mainPageBodyContentTitle">
              <h1>{totalAmountsCompleted.numberOfTickets}</h1>
              <p>Satılan Bilet</p>
            </div>
          </div>
          <div className="mainPageBodyContentBox">
            <div className="mainPageBodyContentSvg bg-4 svgColor-4">
              <span className="tryIcon">₺</span>
            </div>
            <div className="mainPageBodyContentTitle">
              <h1>{displayMoney(totalAmountsCompleted.totalRevenueAmount)}</h1>
              <p>Kazanç</p>
            </div>
          </div>
          <div className="mainPageBodyContentBox">
            <div className="mainPageBodyContentSvg bg-1 svgColor-1">
              <TfiStatsUp />
            </div>
            <div className="mainPageBodyContentTitle">
              <h1>{totalAmountsCompleted.numberOfPlanets}</h1>
              <p>Gezegen Sayısı</p>
            </div>
          </div>
          <div className="mainPageBodyContentBox">
            <div className="mainPageBodyContentSvg bg-1 svgColor-1">
              <TfiStatsUp />
            </div>
            <div className="mainPageBodyContentTitle">
              <h1>{totalAmountsCompleted.numberOfExpenditions}</h1>
              <p>Sefer Sayısı</p>
            </div>
          </div>
          <div className="mainPageBodyContentBox">
            <div className="mainPageBodyContentSvg bg-4 svgColor-4">
              <span className="tryIcon">₺</span>
            </div>
            <div className="mainPageBodyContentTitle">
              <h1>
                {displayMoney(totalAmountsCompleted.montlyTotalRevenueAmount)}
              </h1>
              <p>Aylık Kazanç</p>
            </div>
          </div>
          <div className="mainPageBodyContentBox">
            <div className="mainPageBodyContentSvg bg-4 svgColor-4">
              <span className="tryIcon">₺</span>
            </div>
            <div className="mainPageBodyContentTitle">
              <h1>
                {displayMoney(totalAmountsCompleted.dailyTotalRevenueAmount)}
              </h1>
              <p>Günlük Kazanç</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mainPageBoxContainer">
        <div className="mainPageBox1">
          <div className="mainPageBoxTitle">
            <h5>En Çok Seyahat Eden 5 Kullanıcı</h5>
            <div className="mainPageBoxInfoContainer">
              <Popover content="Bu liste en çok seyahat eden 5 kullanıcı listlenir.">
                <div>
                  <AiOutlineQuestionCircle />
                </div>
              </Popover>
              <i onClick={handleRefreshUsersMostTickets}>
                <BiRefresh className="mainPageSvg" />
              </i>
            </div>
          </div>
          <div className="mainPageBoxUsersInfoContainer">
            {usersMostTicketsData.map((ticketData) => (
              <div className="mainPageBoxUsersInfo" key={ticketData.id}>
                <h5>{ticketData.name}</h5>
                <div className="mainPageBoxUsersInfoSpinner">
                  <p>{ticketData.value} - </p>
                  <Space size={100}>
                    <Progress
                      type="circle"
                      percent={ticketData.rate.toFixed()}
                      size={45}
                      strokeColor="#7465F2"
                    />
                  </Space>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mainPageBox2">
          <div className="mainPageBoxTitle">
            <h5>Tamamlanan Seferler</h5>
            <div className="mainPageBoxInfoContainer">
              <Popover content="Bu liste, firmamızın şu ana kadar yaptığı ve tamamladığı bütün seyahatlerin listesidir.">
                <div>
                  <AiOutlineQuestionCircle />
                </div>
              </Popover>
              <i href="#" onClick={handleRefreshExpeditions}>
                <BiRefresh className="mainPageSvg" />
              </i>
            </div>
          </div>
          <div className="mainPageBoxUsersInfoContainer">
            <div className="mainPageExpeditionsBody">
              <Space wrap>
                {expeditionsTotalCompleted &&
                expeditionsTotalCompleted.rate !== undefined ? (
                  <Progress
                    type="dashboard"
                    size={180}
                    percent={expeditionsTotalCompleted.rate.toFixed()}
                    strokeColor={conicColors}
                  />
                ) : (
                  <Progress
                    type="dashboard"
                    percent={0}
                    strokeColor={conicColors}
                  />
                )}
              </Space>
            </div>
          </div>
          <div className="mainPageExpeditionsFooter">
            <div className="mainPageExpeditionsCompleted">
              <p>Tamamlanan</p>
              <h1>{expeditionsTotalCompleted.completedExpeditionCount}</h1>
            </div>
            <div className="mainPageExpeditionsProgress">
              <p>Devam eden</p>
              <h1>{expeditionsTotalCompleted.activeExpeditionCount}</h1>
            </div>
          </div>
        </div>
        <div className="mainPageBox3">
          <div className="mainPageBoxTitle">
            <h5>En Çok Ziyaret Edilen 5 Gezegen</h5>
            <div className="mainPageBoxInfoContainer">
              <Popover content="Bu liste en çok seyahat edilen 5 Gezegenin listesidir.">
                <div>
                  <AiOutlineQuestionCircle />
                </div>
              </Popover>
              <i href="#" onClick={handleRefreshPlanetsMostPopular}>
                <BiRefresh className="mainPageSvg" />
              </i>
            </div>
          </div>
          <div className="mainPageBoxUsersInfoContainer">
            {planetsMostPopulerData.map((planetData) => (
              <div className="mainPageBoxUsersInfo" key={planetData.id}>
                <h5>{planetData.name}</h5>
                <div className="mainPageBoxUsersInfoSpinner">
                  <p>{planetData.value} - </p>
                  <Space size={30}>
                    <Progress
                      type="circle"
                      percent={planetData.rate.toFixed()}
                      size={45}
                      strokeColor="#7465F2"
                    />
                  </Space>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </container>
  );
}