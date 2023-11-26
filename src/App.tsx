import React from 'react'
import {Layout} from 'antd'
import {LayoutHeader, LayoutContent, LayoutSider} from './layout'
import {Breadcrumb} from './components'

const App: React.FC = () => {
    return (
        <Layout>
            <LayoutHeader></LayoutHeader>

            <Layout>
                <LayoutSider></LayoutSider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb></Breadcrumb>
                    <LayoutContent></LayoutContent>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default App
