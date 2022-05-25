import "./Home.css";
import React, {useCallback, useEffect, useState}                 from "react";
import {Row, Col, Card, Rate, Spin}                              from 'antd';
import {Popconfirm, Empty, Statistic}                            from "antd";
import {WomanOutlined, ManOutlined, EditOutlined, CloseOutlined, DownloadOutlined} from "@ant-design/icons";
import {useCookies}                                              from 'react-cookie';
import {Link}                                                    from 'react-router-dom';
import SearchControl                                             from '../componets/SearchControl';

const Home = () => {
    const [products, setProducts] = useState(null);
    const [cookies] = useCookies();
    const [searchSettings, setSearchSettings] = useState({});

    useEffect(() => {
        (async () => {
            setProducts(null)
            const dbData = await fetch("/api/product?" + new URLSearchParams(searchSettings), {
                method: "get",
                headers: {
                    'authentication': cookies.token,
                    'Content-Type': 'application/json',
                }
            })
            const result = await dbData.json();
            if (!result.error)
                setProducts(result.data)

        })()
    }, [cookies, searchSettings])

    const onFilterChange = useCallback(value => {
        setSearchSettings(Object.assign({}, searchSettings, value))
    }, [searchSettings])

    const resetSearchSettings = useCallback(() => {
        setSearchSettings({})
    }, [searchSettings])

    const genderSign = useCallback(gender => {
        if(gender === "Women")
            return <WomanOutlined />
        else if (gender === "Men")
            return <ManOutlined />
        return ""
    }, [])

    const onRemove = useCallback(async item => {
        const dbData = await fetch("/api/product?" + new URLSearchParams({id : item._id}), {
            method: "delete",
            headers: {
                'authentication': cookies.token,
                'Content-Type': 'application/json',
            }
        })

        const result = await dbData.json();
        if (result.success)
            setProducts(old => old.filter(product => product._id !== item._id))
    }, [])


    return <>
        <SearchControl searchSettings={searchSettings} onChange={onFilterChange} onClear={resetSearchSettings}/>
        {!products && <div className="loading">
            <Spin  size="large" tip="loading"/>
        </div>}
        {products && !products.length && <Empty />}
        {products && products.length > 0 && <Row gutter={16} style={{margin: 20}}>
            {products.map(item => {
                return <Col key={item._id} className="gutter-row" xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        {...item.image && {cover : <img alt="image" src={`http://localhost:3030/images/${item.image}`} />}}
                        actions={cookies.token ? [
                            <DownloadOutlined />,
                            <Link to={`/update/${item._id}`}>
                                <EditOutlined key="edit" />
                            </Link>,
                            <Popconfirm key="remove"  placement="topLeft" title={'Are you sure to delete this item?'} onConfirm={() => onRemove(item)} okText="Yes" cancelText="No">
                                <CloseOutlined style={{color: "red"}}/>
                            </Popconfirm>
                        ] : [<DownloadOutlined />]}
                    >
                        <Card.Meta title={item.name}/>
                        <Rate disabled defaultValue={item.rating} />
                        <Statistic value={item.price} precision={2} suffix={"лв."} prefix={genderSign(item.gender) }/>
                    </Card>
                </Col>
            })}

        </Row>}
    </>
};

export default Home
