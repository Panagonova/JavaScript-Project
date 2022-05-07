import "./NotFound.css"
import React, {useCallback} from "react"
import { Result, Button } from 'antd';
import {useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate])

    return (
        <div className="page notFound">
            <Result
                status="404"
                title={"Error 404"}
                subTitle={"Tha page was not found"}
                extra={<Button type="primary" onClick={goBack}>{"Go back"}</Button>}
            />
        </div>
    )
};

export default NotFound
