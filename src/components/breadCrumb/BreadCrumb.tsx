import React, {FC} from 'react'
import {Breadcrumb as AntdBreadcrumb} from 'antd'
import { useLocation } from 'react-router-dom'
import {crumblabels} from './crumbLabels'

export const Breadcrumb: FC = () => {

    const location = useLocation()
    const currentLocationArray = location.pathname.split('/').filter(Boolean)
    return (
        <AntdBreadcrumb style={{margin: '16px 0'}}>
            {currentLocationArray.map(v => <AntdBreadcrumb.Item>{crumblabels[v] ?? v }</AntdBreadcrumb.Item>)}
            {/* <AntdBreadcrumb.Item>Home</AntdBreadcrumb.Item>
            <AntdBreadcrumb.Item>List</AntdBreadcrumb.Item>
            <AntdBreadcrumb.Item>App</AntdBreadcrumb.Item> */}
        </AntdBreadcrumb>
    )
}
