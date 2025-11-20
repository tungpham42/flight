import React, { useState } from "react";
import { Layout, Tabs, Spin, Alert } from "antd";
import { LineOutlined, EnvironmentOutlined } from "@ant-design/icons";
import FlightSearch from "./components/FlightSearch";
import AirportSearch from "./components/AirportSearch";
import FlightList from "./components/FlightList";
import AirportList from "./components/AirportList";
import { Flight, Airport } from "./types";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFlightsFound = (foundFlights: Flight[]) => {
    setFlights(foundFlights);
  };

  const handleAirportsFound = (foundAirports: Airport[]) => {
    setAirports(foundAirports);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", padding: "0 24px" }}>
        <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
          ✈️ Tra cứu Máy bay & Sân bay
        </div>
      </Header>

      <Content style={{ padding: "24px", background: "#f0f2f5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
            <TabPane
              tab={
                <span>
                  <LineOutlined />
                  Tra cứu chuyến bay
                </span>
              }
              key="1"
            >
              <FlightSearch
                onFlightsFound={handleFlightsFound}
                loading={loading}
                setLoading={setLoading}
              />

              {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                  <Spin size="large" />
                </div>
              ) : flights.length > 0 ? (
                <FlightList flights={flights} />
              ) : (
                <Alert
                  message="Nhập số hiệu chuyến bay để tìm kiếm"
                  type="info"
                  showIcon
                />
              )}
            </TabPane>

            <TabPane
              tab={
                <span>
                  <EnvironmentOutlined />
                  Tra cứu sân bay
                </span>
              }
              key="2"
            >
              <AirportSearch
                onAirportsFound={handleAirportsFound}
                loading={loading}
                setLoading={setLoading}
              />

              {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                  <Spin size="large" />
                </div>
              ) : airports.length > 0 ? (
                <AirportList airports={airports} />
              ) : (
                <Alert
                  message="Nhập tên sân bay, mã IATA/ICAO hoặc thành phố để tìm kiếm"
                  type="info"
                  showIcon
                />
              )}
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
