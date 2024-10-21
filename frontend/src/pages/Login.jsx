import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import { handleFetch } from "../helper/fetch";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
  const { handleSignIn } = useAuthContext()
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const initialValues = {
    email: "admin@localhost.dev",
    password: "Admin@123",
  };
  const handleSubmit = (values) => {
    handleFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((data) => {
        const { tokens: { access, refresh }, user } = data;
        handleSignIn(access.token, refresh.token, user);
        form.resetFields();
      })
      .catch((error) => {
        console.error(error); 
        setError(error.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="lg:text-2xl md:text-lg sm:text-base font-semibold text-gray-800">
        Health Declaration Form
      </h2>

      <Form
        form={form}
        initialValues={initialValues}
        layout="vertical"
        onFinish={handleSubmit}
        className="md:w-[500px] sm:w-[300px] flex flex-col gap-5"
      >
        {error && <Alert message={error} type="error" closable showIcon onClose={() => setError(null)} />}

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!", type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
