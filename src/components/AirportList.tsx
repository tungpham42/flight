import React from "react";
import { Card, List, Tag, Space, Typography } from "antd";
import {
  EnvironmentOutlined,
  FlagOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Airport } from "../types";

const { Text, Title } = Typography;

interface AirportListProps {
  airports: Airport[];
}

const AirportList: React.FC<AirportListProps> = ({ airports }) => {
  const formatCoordinates = (airport: Airport): string => {
    if (!airport.location) {
      return "Không có dữ liệu";
    }
    return `${airport.location.lat?.toFixed(4) || "N/A"}, ${
      airport.location.lon?.toFixed(4) || "N/A"
    }`;
  };

  const getAirportName = (airport: Airport): string => {
    return airport.name || airport.shortName || "Tên không xác định";
  };

  const getMunicipalityName = (airport: Airport): string => {
    return airport.municipalityName || "Không xác định";
  };

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
                    {getAirportName(airport)}
                  </Title>
                  <Text type="secondary">
                    {airport.shortName || "Không có tên ngắn"}
                  </Text>
                </Space>

                <Space>
                  {airport.iata && (
                    <Tag icon={<EnvironmentOutlined />} color="blue">
                      IATA: {airport.iata}
                    </Tag>
                  )}
                  {airport.icao && (
                    <Tag icon={<FlagOutlined />} color="green">
                      ICAO: {airport.icao}
                    </Tag>
                  )}
                  {!airport.iata && !airport.icao && (
                    <Tag icon={<QuestionOutlined />} color="orange">
                      Không có mã
                    </Tag>
                  )}
                </Space>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <Space>
                  <Text strong>Thành phố:</Text>
                  <Text>{getMunicipalityName(airport)}</Text>
                </Space>

                {airport.countryCode && (
                  <Space>
                    <Text strong>Quốc gia:</Text>
                    <Text>{airport.countryCode}</Text>
                  </Space>
                )}

                <Space>
                  <Text strong>Tọa độ:</Text>
                  <Text>{formatCoordinates(airport)}</Text>
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
