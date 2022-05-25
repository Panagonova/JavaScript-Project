import "./Basket.css";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {List, Avatar, Statistic, Button, Popconfirm}              from "antd";
import {PlusSquareOutlined, MinusSquareOutlined, CloseSquareOutlined} from "@ant-design/icons";
import {useEventEmitter}                                              from "../tools/useEventEmitter";
import {getStorage, setStorage}                                       from "../tools/localStorage";


const Basket = () => {
    const [data, setData] = useState([]);
    const {useListener} = useEventEmitter();
    const firstLoad = useRef(true)

    useEffect(() => {
        const data = getStorage("basket")

        if (data)
            setData(data)
    }, [])

    useEffect(() => {
        if (firstLoad.current)
            firstLoad.current = false
        else
            setStorage("basket", data)
    }, [data, firstLoad])

    const onAddItem = useCallback((item) => {
        const alreadyExists = data.findIndex(it => it._id === item._id)

        setData(old => {
            if (alreadyExists === -1) {
                item.quantity = 1;
                return [...old, item]
            }
            return old.map(it => {
                if (it._id === item._id)
                    it.quantity += 1
                return it
            })
        })
    }, [data])

    useListener("addToBasket", onAddItem)

    const increaseQuantity = useCallback(item => {
        const newData = data.map(it => {
            if (it._id === item._id)
                it.quantity = (it.quantity || 0) + 1;
            return it;
        })
        setData(newData)
    },[data])

    const decreaseQuantity = useCallback(item => {
        const newData = data.map(it => {
            if (it._id === item._id)
                it.quantity--;
            return it;
        })
        setData(newData)
    },[data])

    const onRemoveItem = useCallback(item => {
        setData(old => old.filter(it => it._id !== item._id))
    },[])

    const onOrder = useCallback(() => {
        setData([])
    },[])

    const totalPrice = useMemo(() => {
        return data.reduce((res, item) => {
            res += (item.quantity || 1) * (item.price || 0)
            return res
        }, 0)
    },[data])

    return <>
        <List
            dataSource ={data}
            renderItem={item =>  <List.Item
                key={item._id}
                actions={[
                    <Button icon={<PlusSquareOutlined />} size={"small"} onClick={() => increaseQuantity(item)}/>,
                    item.quantity,
                    <Button disabled={item.quantity === 1} icon={<MinusSquareOutlined />} size={"small"} onClick={() => decreaseQuantity(item)}/>,
                    <Statistic value={item.price * item.quantity} precision={2} size={"small"} suffix={"lv."}/>,
                    <Popconfirm key="remove"  placement="topLeft" title={'Are you sure to delete this item?'} onConfirm={() => onRemoveItem(item)} okText="Yes" cancelText="No">
                        <Button danger  icon={<CloseSquareOutlined />} size={"small"}/>
                    </Popconfirm>
                ]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={`http://localhost:3030/images/${item.image}`} size="big" />}
                    title={item.name}
                />

            </List.Item>}
        />
        {data.length > 0 && <>
            <hr/>
            <div style={{display: "flex", justifyContent: "flex-end", margin: "0 10px 10px"}}>
                <Statistic value={totalPrice} precision={2} size={"small"} prefix="Total price:" suffix="lv."/>
            </div>
            </>}
        {data.length > 0 && <Button type={"primary"} block onClick={onOrder}>ORDER NOW</Button>}
    </>

}

export default Basket
