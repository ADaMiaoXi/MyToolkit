import React, {FC} from 'react'
import {theme} from 'antd'
import {Content} from 'antd/es/layout/layout'
import {useRoutes} from 'react-router-dom'
import silderRoutes from '../../routes/siderRoutes'

export const LayoutContent: FC = () => {
    const {
        token: {colorBgContainer}
    } = theme.useToken()

    const element = useRoutes(silderRoutes)

    return (
        <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer
            }}
        >
            {element}
        </Content>
    )
}
