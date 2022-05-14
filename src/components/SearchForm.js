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
    investorsName: [],
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

    const investorsName = data.reduce((acc, item) => {
      let investors = item.company.company_investors.map(
        (investor) => investor.investor.name
      );

      investors.map((item) => {
        if (!acc.includes(item)) {
          acc.push(item);
          return item;
        }
        return item;
      });

      return acc;
    }, []);

    return { cityNames, companyNames, investorsName };
  };

  const handleSubmit = () => {
    let { title, city, company, investor } = form.getFieldsValue();

    const filterByTitle = title
      ? initialData.filter((job) => {
          return job.title
            .toLowerCase()
            .trim()
            .includes(title.toLowerCase().trim())
            ? job
            : null;
        })
      : initialData;

    const filterByCity = city
      ? filterByTitle.filter((job) => (job.city === city ? job : null))
      : filterByTitle;

    const filterByCompany = company
      ? filterByCity.filter((job) =>
          job.company.name === company ? job : null
        )
      : filterByCity;

    const filterByInvestor = investor
      ? filterByCompany.filter((job) => {
          let investorsPerJob = job.company.company_investors.map(
            (item) => item?.investor.name
          );
          return investorsPerJob.includes(investor) ? job : null;
        })
      : filterByCompany;

    dataFiltered(filterByInvestor);
  };

  const resetForm = () => {
    form.resetFields();
    handleSubmit();
  };

  return (
    <Row justify="flex-start">
      <FormStyled
        onFinish={handleSubmit}
        size="large"
        layout="inline"
        name="search-careers-form"
        form={form}
      >
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
              placeholder="Search by city"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
        <Col>
          <Form.Item name="company">
            <Select
              showSearch
              style={{ width: 300, marginBottom: "10px" }}
              placeholder="Search by Company"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
          <Form.Item name="investor">
            <Select
              showSearch
              style={{ width: 300, marginBottom: "10px" }}
              placeholder="Search by Inversor"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {selectValues.investorsName.map((option, i) => (
                <Option key={i} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Row justify="flex-start" align="center">
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
      </FormStyled>
    </Row>
  );
};

export default SearchForm;
