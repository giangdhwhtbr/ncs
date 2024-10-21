import React from "react";
import { Button, Checkbox, Form, Input, InputNumber, message } from "antd";
import { handleFetch } from "../helper/fetch";


export default function HealthFormDeclaration({ onSuccess }) {
  const [form] = Form.useForm();

  const initialValues = {
    name: "",
    cough: false,
    soreThroat: false,
    lossOfSmell: false,
    fever: false,
    breathingDifficulty: false,
    bodyAches: false,
    headache: false,
    fatigue: false,
    diarrhea: false,
    runnyNose: false,
    contactWithCovidPatient: false,
  };

  const handleSubmit = (values) => {
    handleFetch("/health-forms", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((data) => {
        form.resetFields();
        message.success("Health Declaration Form submitted successfully!");
        onSuccess?.();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <div className="flex flex-col gap-5">
      <Form
        form={form}
        initialValues={initialValues}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Temperature"
          name="temperature"
          rules={[
            { required: true, message: "Please input your temperature!" },
          ]}
        >
          <InputNumber min={36} max={42} />
        </Form.Item>
        <strong className="my-5">
          Do you have any of the following symptoms now or within the last 14
          days?
        </strong>
        <div className="grid grid-flow-row md:grid-cols-3 sm:grid-cols-2">
          <Form.Item
            label="Cough"
            name="cough"
            layout="horizontal"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Sore Throat"
            name="soreThroat"
            layout="horizontal"
            valuePropName="checked"
            defaultValue={false}
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Loss of Smell"
            name="lossOfSmell"
            layout="horizontal"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Fever"
            name="fever"
            layout="horizontal"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Breathing Difficulty"
            name="breathingDifficulty"
            layout="horizontal"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Body Aches"
            name="bodyAches"
            layout="horizontal"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Headache"
            name="headache"
            layout="horizontal"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Fatigue"
            name="fatigue"
            layout="horizontal"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Diarrhea"
            name="diarrhea"
            layout="horizontal"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Runny Nose"
            name="runnyNose"
            layout="horizontal"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Contact with Covid Patient"
            name="contactWithCovidPatient"
            layout="horizontal"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
