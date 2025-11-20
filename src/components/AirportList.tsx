import React from "react";
import { Card, List, Tag, Space, Typography } from "antd";
import { EnvironmentOutlined, FlagOutlined } from "@ant-design/icons";
import { Airport } from "../types";

const { Text, Title } = Typography;

interface AirportListProps {
  airports: Airport[];
}

const AirportList: React.FC<AirportListProps> = ({ airports }) => {
  return (
    <Card title={`Kết quả tìm kiếm (${airports.length} sân bay)`}>
      <List
        itemLayout="vertical"
        dataSource={airports}
        renderItem={(airport) => (
          <List.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Space direction="vertical">
                  <Title level={4} style={{ margin: 0 }}>
                    {airport.name}
                  </Title>
                  <Text type="secondary">{airport.shortName}</Text>
                </Space>

                <Space>
                  <Tag icon={<EnvironmentOutlined />} color="blue">
                    IATA: {airport.iata}
                  </Tag>
                  <Tag icon={<FlagOutlined />} color="green">
                    ICAO: {airport.icao}
                  </Tag>
                </Space>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Space>
                  <Text strong>Thành phố:</Text>
                  <Text>{airport.municipalityName}</Text>
                </Space>

                <Space>
                  <Text strong>Quốc gia:</Text>
                  <Text>{airport.countryCode}</Text>
                </Space>

                <Space>
                  <Text strong>Tọa độ:</Text>
                  <Text>
                    {airport.location.lat.toFixed(4)},{" "}
                    {airport.location.lon.toFixed(4)}
                  </Text>
                </Space>
              </div>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AirportList;
