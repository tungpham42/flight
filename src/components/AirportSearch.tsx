import React, { useState } from "react";
import { Card, Form, Input, Button, Space, Alert } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { airportAPI } from "../services/api";
import { Airport } from "../types";

interface AirportSearchProps {
  onAirportsFound: (airports: Airport[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AirportSearch: React.FC<AirportSearchProps> = ({
  onAirportsFound,
  loading,
  setLoading,
}) => {
  const [form] = Form.useForm();

  const handleSearch = async (values: { searchTerm: string }) => {
    setLoading(true);
    try {
      const data = await airportAPI.searchAirports(values.searchTerm);
      onAirportsFound(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error searching airports:", error);
      <Alert message="Không tìm thấy sân bay" type="error" />;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Tìm sân bay" style={{ marginBottom: 24 }}>
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Form.Item
          name="searchTerm"
          label="Tên sân bay, mã IATA/ICAO hoặc thành phố"
          rules={[
            { required: true, message: "Vui lòng nhập thông tin tìm kiếm" },
          ]}
        >
          <Input
            placeholder="VD: Noi Bai, HAN, VVNB, Hanoi..."
            prefix={<EnvironmentOutlined />}
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

export default AirportSearch;
