import "./Login.css"
import React, {useCallback, useEffect, useState}      from "react"
import { Card, Form , Checkbox, Input, Button, Alert} from 'antd';
import form_validators from "../tools/form_validators.js"
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [promotions, setPromotions] = useState(null);
    const [hot, setHot] = useState(null);
    const [trending, setTrending] = useState(null);
    const [cookies, setCookies] = useCookies();

    useEffect(() => {
        (async () => {
            const promRes = await fetch("/api/product?" + new URLSearchParams({promotion: true}), {
                method: "get",
                headers: {
                    'authentication': cookies.token,
                    'Content-Type': 'application/json',
                }
            })
            const promotions = await promRes.json()
            if (!promotions.errors)
                setPromotions(promotions.data)


            const hotRes = await fetch("/api/product?" + new URLSearchParams({hot: true}), {
                method: "get",
                headers: {
                    'authentication': cookies.token,
                    'Content-Type': 'application/json',
                }
            })
            const hotProducts = await hotRes.json()
            if (!hotProducts.errors)
                setHot(hotProducts.data)

            const trendingRes = await fetch("/api/product?" + new URLSearchParams({trending: true}), {
                method: "get",
                headers: {
                    'authentication': cookies.token,
                    'Content-Type': 'application/json',
                }
            })
            const trending = await trendingRes.json()
            if (!trending.errors)
                setTrending(trending.data)
        })()
    }, [cookies])


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
