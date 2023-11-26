import React, {FC} from 'react'
import {Header} from 'antd/es/layout/layout'

export const LayoutHeader: FC = () => {
    return (
        <Header style={{display: 'flex', alignItems: 'left'}}>
            <div className='demo-logo' />
        </Header>
    )
}
