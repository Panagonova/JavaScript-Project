import "./Login.css"
import React, {useCallback, useState}          from "react"
import { Card, Form , Checkbox, Input, Button, Alert} from 'antd';
import form_validators from "../tools/form_validators.js"
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [promotions, getPromotions] = useState(null);


    return <>
        <Card title="New arrival" style={{margin: "100px auto", width: 400}}>

        </Card>
        <Card title="Hot products" style={{margin: "100px auto", width: 400}}>

        </Card>
        <Card title="Trending" style={{margin: "100px auto", width: 400}}>

        </Card>
    </>
};

export default Home
