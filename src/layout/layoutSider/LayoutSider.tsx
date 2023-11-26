import React, {FC} from 'react'

import {Menu, theme} from 'antd'
import Sider from 'antd/es/layout/Sider'
import {useNavigate} from 'react-router-dom'
import {getItems} from './siderConfig'

export const LayoutSider: FC = () => {
    const {
        token: {colorBgContainer}
    } = theme.useToken()

    const navigate = useNavigate()

    return (
        <Sider width={270} style={{background: colorBgContainer}}>
            <Menu
                mode='inline'
                style={{height: '100%', borderRight: 0}}
                items={getItems(navigate)}
            />
        </Sider>
    )
}
