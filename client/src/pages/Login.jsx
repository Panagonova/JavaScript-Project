import "./Login.css"
import React, {useCallback, useState}          from "react"
import { Card, Form , Checkbox, Input, Button, Alert} from 'antd';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import form_validators from "../tools/form_validators.js"

const Login = () => {
    const [error, setError] = useState("");
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();

    const onFinish = useCallback(async values => {
        setError("")
        const response = await fetch("/api/login", {
            method: "post",
            headers: {
                'authentication': cookies.token,
                 'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
        const result = await response.json();
        if(result.error)
            setError(result.error)
        else {
            setCookies("token", result.token, { path: '/' })
            navigate("/");
        }
    }, [navigate]);

    return (
        <Card title="Login" style={{margin: "100px auto", width: 400}}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, validator: form_validators.email_validation }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, validator: form_validators.validate_pass }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {error &&<Alert message={error} type="error"/>}

        </Card>
    )
};

export default Login
