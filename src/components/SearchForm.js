import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Form, Input, Button, Select, Row, Col } from "antd";

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

export const SearchForm = ({ initialData }) => {
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
    //add function to filter array
    console.log("formValues", e);
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
            <Form.Item name="job-title">
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
            <Form.Item name="city-selected">
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
            <Form.Item name="company-selected">
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
                <Button block htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
              <Form.Item>
                <Button block htmlType="submit">
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
