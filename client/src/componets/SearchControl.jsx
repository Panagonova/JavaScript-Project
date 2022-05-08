import "./SearchControl.css"
import React, {useCallback} from "react";
import {Select,Space, Button}       from "antd";
import {CloseCircleOutlined}                   from "@ant-design/icons";

const SearchControl = (props) => {
    const {searchSettings, onChange, onClear} = props;

    const onGenderChange = useCallback((data) => {
        onChange({gender: data})
    }, [searchSettings, onChange])

    const onMaterialChange = useCallback((data) => {
        onChange({material: data})
    }, [searchSettings, onChange])

    return <Space>
        <Select onSelect={onGenderChange} style={{width: 150}} placeholder={"Gender"} value={searchSettings.gender}>
            <Select.Option value={"Men"}>Men</Select.Option>
            <Select.Option value={"Women"}>Women</Select.Option>
            <Select.Option value={"Unisex"}>Unisex</Select.Option>
        </Select>
        <Select onSelect={onMaterialChange} style={{width: 150}} placeholder={"Material"} value={searchSettings.material}>
            <Select.Option value={"Cotton"}>Cotton</Select.Option>
            <Select.Option value={"Wool"}>Wool</Select.Option>
            <Select.Option value={"Silk"}>Silk</Select.Option>
            <Select.Option value={"Leather"}>Leather</Select.Option>
            <Select.Option value={"Velvet"}>Velvet</Select.Option>
        </Select>
        <Button shape="circle" icon={<CloseCircleOutlined />} onClick={onClear}/>
    </Space>
}


export default SearchControl
