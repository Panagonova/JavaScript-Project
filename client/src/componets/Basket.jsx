import "./Basket.css";
import React, {useCallback, useState}                                 from "react";
import {List, Avatar, Statistic, Button, Popconfirm}                  from "antd";
import {PlusSquareOutlined, MinusSquareOutlined, CloseSquareOutlined} from "@ant-design/icons";

const props = [{
    "_id": "1dV_IPGFCAh8YNISf5BNi",
    "name": "test",
    "gender": "Unisex",
    "image": "mtdfJqoh41wsksut.webp",
    "category": "Dresses",
    "price": 43,
    "color": "pink",
    "style": "Bubble dress",
    "size": "L",
    "material": "Cotton",
    "count": 2000,
    "rating": 4,
    "hot": false,
    "promotion": false,
    "trending": true,
    "date": "2022-05-25T16:29:08.184Z",
    "quantity": 1
}]

const Basket = () => {

    const [data, setData] = useState([]);

    const increaseQuantity = useCallback(item => {
        setData(old => old.map(it => {
            if(it._id === item._id)
                it.quantity++
            return it
        }))
    },[])

    const decreaseQuantity = useCallback(item => {
        setData(old => old.map(it => {
            if(it._id === item._id)
                it.quantity++
            return it
        }))
    },[])

    const onRemoveItem = useCallback(item => {
        setData(old => old.filter(it => it._id !== item._id))
    },[])


    return <List
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
    >

    </List>

}

export default Basket
