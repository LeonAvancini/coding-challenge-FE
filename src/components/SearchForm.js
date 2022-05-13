import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Option } = Select;
const FormStyled = styled(Form)`
  margin: 0 auto;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: rgb(71, 71, 71);
  background: linear-gradient(
    90deg,
    rgba(71, 71, 71, 1) 0%,
    rgba(166, 161, 161, 1) 35%,
    rgba(191, 189, 189, 1) 100%
  );
`;

export const SearchForm = ({ initialData, dataFiltered }) => {
  const formRef = useRef();

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

  const handleSubmit = (e) => {
    const fitlerByJobTitle = initialData.filter((job) =>
      e?.jobTitle ? job.title.toLowerCase().includes(e.jobTitle) : job
    );

    const fitlerByCity = fitlerByJobTitle.filter((job) =>
      e?.citySelected ? job.city.includes(e.citySelected) : job
    );

    const fitlerByCompanyName = fitlerByCity.filter((job) =>
      e?.companySelected ? job.company.name.includes(e.companySelected) : job
    );

    dataFiltered(fitlerByCompanyName);
  };

  const onReset = () => {
    formRef.current.resetFields();
    handleSubmit();
  };

  return (
    <Row justify="center" align="center">
      <FormStyled
        onFinish={(event) => handleSubmit(event)}
        size="large"
        layout="inline"
        name="search-careers-form"
        ref={formRef}
      >
        <Row justify="center" align="center">
          <Col>
            <Form.Item name="jobTitle">
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
            <Form.Item name="citySelected">
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
            <Form.Item name="companySelected">
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
                  onClick={onReset}
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
