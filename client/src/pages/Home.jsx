import "./Home.css";
import React, {useCallback, useEffect, useState}       from "react";
import {Row, Col, Card, Rate, Spin, Tag, Space}        from 'antd';
import {Popconfirm, Empty, Statistic, Pagination}      from "antd";
import {WomanOutlined, ManOutlined, EditOutlined}      from "@ant-design/icons";
import {CloseOutlined, DownloadOutlined, FireOutlined} from "@ant-design/icons";
import {useCookies}                                    from 'react-cookie';
import {Link}                                          from 'react-router-dom';
import SearchControl                                   from '../componets/SearchControl';
import {useEventEmitter}                               from '../tools/useEventEmitter';

const Home = () => {
    const [products, setProducts] = useState(null);
    const [count, setCount] = useState(0);
    const [cookies] = useCookies();
    const [searchSettings, setSearchSettings] = useState({page: 1, size: 12});
    const {emit} = useEventEmitter()

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
            if (!result.error) {
                setProducts(result.data)
                setCount(result.count)
            }

        })()
    }, [cookies, searchSettings])

    const onFilterChange = useCallback(value => {
        const newValue = Object.assign({}, searchSettings, value)
        Object.keys(newValue).forEach(key => {
            if (newValue[key] === false)
                delete newValue[key]
        })
        setSearchSettings(newValue)
    }, [searchSettings])

    const resetSearchSettings = useCallback(() => {
        setSearchSettings({page: 1, size: 12})
    }, [])

    const onPaginationChange = useCallback((page, size) => {
        setSearchSettings(Object.assign({}, searchSettings, {page, size}))
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

    const addToBasket = useCallback(item => {
        emit("addToBasket", item)
    }, [emit])


    return <>
        <SearchControl searchSettings={searchSettings} onChange={onFilterChange} onClear={resetSearchSettings}/>
        {!products && <div className="loading">
            <Spin  size="large" tip="loading"/>
        </div>}
        {products && !products.length && <Empty />}
        {products && products.length > 0 &&
        <>
            <div  style={{margin: "10px", textAlign: "center"}}>
                <Pagination
                    showSizeChanger
                    onChange={onPaginationChange}
                    current={searchSettings.page}
                    pageSize={searchSettings.size}
                    total={count}
                />
            </div>
            <Row gutter={16} style={{margin: 20}}>
                {products.map(item => {
                    return <Col key={item._id} className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={4}>
                        <Card
                            hoverable
                            style={{ width: "100%", marginBottom: 20 }}
                            {...item.image && {cover : <img alt="image" src={`http://localhost:3030/images/${item.image}`} />}}
                            actions={cookies.token ? [
                                <DownloadOutlined onClick={() => addToBasket(item)}/>,
                                <Link to={`/update/${item._id}`}>
                                    <EditOutlined key="edit" />
                                </Link>,
                                <Popconfirm key="remove"  placement="topLeft" title={'Are you sure to delete this item?'} onConfirm={() => onRemove(item)} okText="Yes" cancelText="No">
                                    <CloseOutlined style={{color: "red"}}/>
                                </Popconfirm>
                            ] : [<DownloadOutlined onClick={() => addToBasket(item)}/>]}
                        >
                            <Space>
                                {item.promotion && <Tag color="green">promotion</Tag>}
                                {item.hot && <Tag color="#f50" icon={<FireOutlined />}>hot</Tag>}
                                {item.trending && <Tag color="orange">trending</Tag>}
                            </Space>
                            <Card.Meta title={item.name}/>
                            <Rate disabled defaultValue={item.rating} />
                            <Statistic value={item.price} precision={2} suffix={"лв."} prefix={genderSign(item.gender) }/>
                        </Card>
                    </Col>
                })}
            </Row>
            <div  style={{margin: "10px", textAlign: "center"}}>
                <Pagination
                    showSizeChanger
                    onChange={onPaginationChange}
                    current={searchSettings.page}
                    pageSize={searchSettings.size}
                    total={count}
                />
            </div>
        </>}
    </>
};

export default Home
