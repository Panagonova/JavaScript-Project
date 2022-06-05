import "./SearchControl.css"
import React, {useCallback, useState}  from "react";
import {Select, Space, Button, Switch} from "antd";
import {CloseCircleOutlined}           from "@ant-design/icons";
import fashionStyles from "../resources/fashionStyle.json";

const SearchControl = (props) => {
    const {searchSettings, onChange, onClear} = props;
    const [category, setCategory] = useState(null);

    const onGenderChange = useCallback((data) => {
        onChange({gender: data})
    }, [onChange])

    const onMaterialChange = useCallback((data) => {
        onChange({material: data})
    }, [onChange])

    const onStyleChange = useCallback((data) => {
        onChange({style: data})
    }, [onChange])

    const onColorChange = useCallback((data) => {
        onChange({color: data})
    }, [onChange])

    const onCategoryChange = useCallback((data) => {
        setCategory(data)
        onChange({category: data})
    }, [onChange])

    const onPromotionChange = useCallback((data) => {
        onChange({promotion: data})
    }, [onChange])

    const onHotChange = useCallback((data) => {
        onChange({hot: data})
    }, [onChange])

    const onTrendingChange = useCallback((data) => {
        onChange({trending: data})
    }, [onChange])

    return <Space style={{margin: 5}}>
        <Select onSelect={onGenderChange} style={{width: 120}} placeholder={"Gender"} value={searchSettings.gender}>
            <Select.Option value={"Men"}>Men</Select.Option>
            <Select.Option value={"Women"}>Women</Select.Option>
            <Select.Option value={"Unisex"}>Unisex</Select.Option>
        </Select>
        <Select onSelect={onMaterialChange} style={{width: 120}} placeholder={"Material"} value={searchSettings.material}>
            <Select.Option value={"Cotton"}>Cotton</Select.Option>
            <Select.Option value={"Wool"}>Wool</Select.Option>
            <Select.Option value={"Silk"}>Silk</Select.Option>
            <Select.Option value={"Leather"}>Leather</Select.Option>
            <Select.Option value={"Velvet"}>Velvet</Select.Option>
        </Select>

        <Select onSelect={onCategoryChange} style={{width: 120}} placeholder={"Category"} value={searchSettings.category}>
            {Object.keys(fashionStyles).map(categoryName => <Select.Option key={categoryName} value={categoryName}>{categoryName}</Select.Option>)}
        </Select>

        <Select disabled={!category} onSelect={onStyleChange} style={{width: 120}} placeholder={"Style"} value={searchSettings.style} >
            {category && fashionStyles[category].map(style => <Select.Option key={style} value={style}>{style}</Select.Option> )}
        </Select>

        <Select onSelect={onColorChange} style={{width: 120}} placeholder={"Color"} value={searchSettings.color} >
            <Select.Option value={"red"}>Red</Select.Option>
            <Select.Option value={"green"}>Green</Select.Option>
            <Select.Option value={"blue"}>Blue</Select.Option>
            <Select.Option value={"yellow"}>Yellow</Select.Option>
            <Select.Option value={"pink"}>Pink</Select.Option>
            <Select.Option value={"purple"}>Purple</Select.Option>
            <Select.Option value={"brown"}>Brown</Select.Option>
            <Select.Option value={"grey"}>Grey</Select.Option>
            <Select.Option value={"black"}>Black</Select.Option>
            <Select.Option value={"white"}>White</Select.Option>
            <Select.Option value={"mix"}>Mix</Select.Option>
        </Select>
        <Switch onChange={onPromotionChange} checked={!!searchSettings.promotion} checkedChildren="Promotion" unCheckedChildren="Promotion"/>
        <Switch onChange={onHotChange} checked={!!searchSettings.hot} checkedChildren="Hot" unCheckedChildren="Hot"/>
        <Switch onChange={onTrendingChange} checked={!!searchSettings.trending} checkedChildren="Trending" unCheckedChildren="Trending"/>

        <Button shape="circle" icon={<CloseCircleOutlined />} onClick={onClear}/>
    </Space>
}


export default SearchControl
