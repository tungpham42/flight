import React from "react";
import { Card, List, Tag, Space, Typography } from "antd";
import {
  LineOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Flight } from "../types";
import {
  formatTime,
  getFlightStatusColor,
  calculateDuration,
} from "../utils/helpers";

const { Text, Title } = Typography;

interface FlightListProps {
  flights: Flight[];
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => {
  return (
    <Card title={`Kết quả tìm kiếm (${flights.length} chuyến bay)`}>
      <List
        itemLayout="vertical"
        dataSource={flights}
        renderItem={(flight) => (
          <List.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              {/* Header với thông tin chuyến bay */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Space>
                  <Title level={4} style={{ margin: 0 }}>
                    {flight.airline.iata} {flight.number}
                  </Title>
                  <Tag color={getFlightStatusColor(flight.status)}>
                    {flight.status}
                  </Tag>
                </Space>
                <Text type="secondary">
                  {flight.aircraft?.model || "Chưa xác định"}
                </Text>
              </div>

              {/* Thông tin hành trình */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Điểm đi */}
                <Space direction="vertical" align="center">
                  <Text strong>{flight.departure.airport.iata}</Text>
                  <Text type="secondary">
                    {flight.departure.airport.shortName}
                  </Text>
                  <Space>
                    <ClockCircleOutlined />
                    <Text>{formatTime(flight.departure.scheduledTime)}</Text>
                  </Space>
                  {flight.departure.terminal && (
                    <Text type="secondary">
                      Terminal {flight.departure.terminal}
                    </Text>
                  )}
                </Space>

                {/* Thời gian bay */}
                <Space direction="vertical" align="center">
                  <LineOutlined />
                  <Text type="secondary">
                    {calculateDuration(
                      flight.departure.scheduledTime,
                      flight.arrival.scheduledTime
                    )}
                  </Text>
                </Space>

                {/* Điểm đến */}
                <Space direction="vertical" align="center">
                  <Text strong>{flight.arrival.airport.iata}</Text>
                  <Text type="secondary">
                    {flight.arrival.airport.shortName}
                  </Text>
                  <Space>
                    <ClockCircleOutlined />
                    <Text>{formatTime(flight.arrival.scheduledTime)}</Text>
                  </Space>
                  {flight.arrival.terminal && (
                    <Text type="secondary">
                      Terminal {flight.arrival.terminal}
                    </Text>
                  )}
                </Space>
              </div>

              {/* Thông tin bổ sung */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text type="secondary">Hãng: {flight.airline.name}</Text>
                {flight.aircraft?.reg && (
                  <Text type="secondary">Đăng ký: {flight.aircraft.reg}</Text>
                )}
              </div>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default FlightList;
