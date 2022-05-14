import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Option } = Select;
const FormStyled = styled(Form)`
  margin: 0 auto;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: rgba(191, 189, 189, 1);
`;

export const SearchForm = ({ initialData, dataFiltered }) => {
  const [form] = Form.useForm();

  const [selectValues, setSelectValues] = useState({
    cityNames: [],
    companyNames: [],
  });

  useEffect(() => {
    const selectValuesInfo = getSelectValues(initialData);
    setSelectValues(selectValuesInfo);
  }, [initialData]);

  const getSelectValues = (data) => {
    const cityNames = data.reduce((acc, item) => {
      if (!acc.includes(item.city)) {
        acc.push(item.city);
      }
      return acc;
    }, []);

    const companyNames = data.reduce((acc, item) => {
      if (!acc.includes(item.company.name)) {
        acc.push(item.company.name);
      }
      return acc;
    }, []);

    return { cityNames, companyNames };
  };

  const handleSubmit = () => {
    let inputForm = form.getFieldsValue();
    let dataFilter = initialData;

    dataFilter = initialData.filter((job) => {
      let flag = true;

      for (const key of Object.keys(inputForm)) {
        if (!inputForm[key]) {
          continue;
        }

        const jobProperyData = JSON.stringify(job[key])?.toLowerCase().trim();
        const inputProperyData = inputForm[key]?.toLowerCase().trim();

        if (jobProperyData.includes(inputProperyData)) {
          if (flag) {
            flag = true;
          } else {
            flag = false;
          }
        } else {
          flag = false;
        }
      }
      if (flag) {
        return job;
      }
      return null;
    });

    dataFiltered(dataFilter);
  };

  const resetForm = () => {
    form.resetFields();
    handleSubmit();
  };

  return (
    <Row justify="center" align="center">
      <FormStyled
        onFinish={handleSubmit}
        size="large"
        layout="inline"
        name="search-careers-form"
        form={form}
      >
        <Row justify="center" align="center">
          <Col>
            <Form.Item name="title">
              <Input
                style={{ width: 300, marginBottom: "10px" }}
                type="search"
                placeholder="Job description"
                autoFocus
                autoCapitalize="off"
                autoCorrect="off"
                maxLength="60"
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="city">
              <Select
                showSearch
                style={{ width: 300, marginBottom: "10px" }}
                placeholder="Search city"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {selectValues.cityNames.map((option, i) => (
                  <Option key={i} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" align="center">
          <Col>
            <Form.Item name="company">
              <Select
                showSearch
                style={{ width: 300, marginBottom: "10px" }}
                placeholder="Search Company"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {selectValues.companyNames.map((option, i) => (
                  <Option key={i} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Row justify="center" align="center">
              <Form.Item>
                <Button
                  block
                  htmlType="button"
                  type="primary"
                  danger
                  onClick={resetForm}
                >
                  Reset
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  htmlType="submit"
                  type="primary"
                  icon={<SearchOutlined />}
                >
                  Search
                </Button>
              </Form.Item>
            </Row>
          </Col>
        </Row>
      </FormStyled>
    </Row>
  );
};

export default SearchForm;
