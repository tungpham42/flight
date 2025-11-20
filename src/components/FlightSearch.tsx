import React from "react";
import { Card, Form, Input, Button, Space, Alert } from "antd";
import { SearchOutlined, LineOutlined } from "@ant-design/icons";
import { flightAPI } from "../services/api";
import { Flight } from "../types";

interface FlightSearchProps {
  onFlightsFound: (flights: Flight[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({
  onFlightsFound,
  loading,
  setLoading,
}) => {
  const [form] = Form.useForm();

  const handleSearch = async (values: { flightNumber: string }) => {
    setLoading(true);
    try {
      const data = await flightAPI.searchByFlightNumber(values.flightNumber);
      onFlightsFound(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error searching flights:", error);
      <Alert message="Không tìm thấy chuyến bay" type="error" />;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Tìm chuyến bay" style={{ marginBottom: 24 }}>
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Form.Item
          name="flightNumber"
          label="Số hiệu chuyến bay"
          rules={[
            { required: true, message: "Vui lòng nhập số hiệu chuyến bay" },
          ]}
        >
          <Input
            placeholder="VD: VN123, BA245..."
            prefix={<LineOutlined />}
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SearchOutlined />}
            >
              Tìm kiếm
            </Button>
            <Button onClick={() => form.resetFields()}>Đặt lại</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FlightSearch;
