import "./LayoutStyle.css"
import React, {useCallback, useMemo, useState} from "react";
import {Layout, Menu}                   from "antd";
import {useNavigate, Link}                  from "react-router-dom";
import {useCookies}                   from "react-cookie";

const { Header, Footer, Sider, Content } = Layout;

const DefaultLayout = (props) => {
    const [cookies, setCookies] = useCookies();
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()

    const onCollapse = useCallback(collapsed => {
        setCollapsed(collapsed);
    }, []);

    const onMenuSelect = useCallback(async data => {
        if (data.key === "logout") {
            const response = await fetch("/api/logout", {
                method: "post",
                headers: {
                    'authentication': cookies.token,
                    'Content-Type': 'application/json',
                }
            })
            const result = await response.json();
            if (!result.error) {
                setCookies("token", "", { path: '/' })
                navigate("/");
            }
        }
        else
            navigate(`/${data.key}`)
    }, [navigate])

    const menuItems = useMemo(() => {
        const items = [
            {key: "home", "label": "Home"},
            {key: "shop", "label": "Shop"}
        ]
        if (!cookies.token) {
            items.push(
                {key: "login", "label": "Login"},
                {key: "register", "label": "Register"}
            )
        }
        else {
            items.push(
                {key: "logout", "label": "Logout"}
            )
        }
        return items;
    }, [cookies.token])

    return <Layout style={{minHeight: "100vh"}}>
        <Header>
            <Link to={"/"}>
                <img alt="logo" className="logo" src="/logo.svg" />
            </Link>
            <Menu
                mode="horizontal"
                onSelect={onMenuSelect}
                items={menuItems}
            />
        </Header>
        <Layout>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                theme={"light"}
            >
                Sider
            </Sider>
            <Content>
                {props.children}
            </Content>
        </Layout>
        <Footer>Footer</Footer>
    </Layout>
}

export default DefaultLayout
