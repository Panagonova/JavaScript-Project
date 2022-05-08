import "./Create.css"
import React, {useCallback, useEffect, useState}    from "react"
import { Card, Form , Result, Input, Button, Alert} from 'antd';
import { InputNumber, Switch, Select, Upload, Rate} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams, } from 'react-router-dom';
import form_validators from "../tools/form_validators.js"

const Create = () => {
    const [error, setError] = useState("");
    const [cookies] = useCookies();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            (async () => {
                const dbData = await fetch(`/api/product?_id=${id}`, {
                    method: "get",
                    headers: {
                        'authentication': cookies.token,
                        'Content-Type': 'application/json',
                    }
                })
                const result = await dbData.json();
                const product = result.data?.[0]
                if (product) {
                    product.image = [{
                        uid: '1',
                        status: 'done',
                        url: `http://localhost:3030/images/${product.image}`,
                        name: product.image
                    }]
                    form.setFieldsValue(product)
                }
            })()
        }
    }, [id,form])

    const onFinish = useCallback(async values => {
        setError("")
        values.image = values.image[0]?.response?.filename ||  values.image[0].url?.split("/").pop();
        values.hot = !!values.hot
        values.trending = !!values.trending
        values.promotion = !!values.promotion
        const response = await fetch("/api/product", {
            method: id ? "put" : "post",
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
            navigate("/");
        }
    }, [navigate, cookies, id]);

    return <>
        {!cookies.token && <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
        />}
        {cookies.token && <Card title={id ? "UpdateProduct" : "Create new product"} style={{margin: "100px auto", width: 800}}>
            <Form
                name="product"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    name="_id"
                    style={{display: "none"}}
                >
                    <Input type="hidden" />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true}]}
                    style={{display: "inline-block", width : "calc(66.66% - 8px)", marginRight: 8}}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true}]}
                    valuePropName="fileList"
                    getValueFromEvent={(data) => {
                        if (data instanceof Array)
                            return data
                        if(data.fileList)
                            return data.fileList
                        return data
                    }}
                    style={{display: "inline-block", width : "calc(33.33%)"}}
                >
                    <Upload name="file" action="/api/upload/image" listType="picture-card">
                        <Button type="text" block icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true}]}
                    style={{display: "inline-block", width : "calc(25% - 8px)", marginRight: 8}}
                >
                    <Select >
                        <Select.Option value={"dress"}>Dress</Select.Option>
                        <Select.Option value={"shoes"}>Shoes</Select.Option>
                        <Select.Option value={"jacket"}>Jacket</Select.Option>
                        <Select.Option value={"hat"}>Hat</Select.Option>
                        <Select.Option value={"accessories"}>Accessories</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Color"
                    name="color"
                    rules={[{ required: true}]}
                    style={{display: "inline-block", width : "calc(25% - 8px)", marginRight: 8}}
                >
                    <Select >
                        <Select.Option value={"red"}>Red</Select.Option>
                        <Select.Option value={"green"}>Green</Select.Option>
                        <Select.Option value={"blue"}>Blue</Select.Option>
                        <Select.Option value={"yellow"}>Yellow</Select.Option>
                        <Select.Option value={"pink"}>Pink</Select.Option>
                        <Select.Option value={"brown"}>Brown</Select.Option>
                        <Select.Option value={"grey"}>Grey</Select.Option>
                        <Select.Option value={"black"}>Black</Select.Option>
                        <Select.Option value={"white"}>White</Select.Option>
                        <Select.Option value={"mix"}>Mix</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Style"
                    name="style"
                    rules={[{ required: true}]}
                    style={{display: "inline-block", width : "calc(25% - 8px)", marginRight: 8}}
                >
                    <Select >
                        <Select.Option value={"dress"}>A</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true}]}
                    style={{display: "inline-block", width : "calc(25% - 8px)", marginRight: 8}}
                >
                    <Select >
                        <Select.Option value={"Men"}>Men</Select.Option>
                        <Select.Option value={"Women"}>Women</Select.Option>
                        <Select.Option value={"Unisex"}>Unisex</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Material"
                    name="material"
                    rules={[{ required: true}]}
                    style={{display: "inline-block", width : "calc(25% - 8px)", marginRight: 8}}
                >
                    <Select >
                        <Select.Option value={"Cotton"}>Cotton</Select.Option>
                        <Select.Option value={"Wool"}>Wool</Select.Option>
                        <Select.Option value={"Silk"}>Silk</Select.Option>
                        <Select.Option value={"Leather"}>Leather</Select.Option>
                        <Select.Option value={"Velvet"}>Velvet</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Size"
                    name="size"
                    style={{display: "inline-block", width : "calc(25% - 8px)", marginRight: 8}}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, validator: form_validators.float_validation}]}
                    style={{display: "inline-block", width : "calc(25% - 8px)", marginRight: 8}}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Count"
                    name="count"
                    rules={[{ required: true, validator: form_validators.number_validation}]}
                    style={{display: "inline-block", width : "calc(25%)"}}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Rating"
                    name="rating"
                >
                    <Rate />
                </Form.Item>
                <Form.Item
                    label="Trending"
                    name="trending"
                    valuePropName="checked"
                    style={{display: "inline-block", width : "calc(33.33% - 8px)", marginRight: 8}}
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="Hot"
                    name="hot"
                    valuePropName="checked"
                    style={{display: "inline-block", width : "calc(33.33% - 8px)", marginRight: 8}}
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="Promotion"
                    name="promotion"
                    valuePropName="checked"
                    style={{display: "inline-block", width : "calc(33.33%)"}}
                >
                    <Switch />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
            {error &&<Alert message={error} type="error"/>}

        </Card>}
    </>
};

export default Create
