import React from 'react'
import {LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined} from '@ant-design/icons'
import {NavigateFunction} from 'react-router-dom'

export const getItems = (navigate: NavigateFunction) => {
    return [
        {
            key: `JSON`,
            icon: React.createElement(UserOutlined),
            label: `JSON Tools`,
            children: [
                {
                    label: 'JSON Search',
                    key: 'JsonSearch',
                    icon: React.createElement(MailOutlined),
                    onClick: () => {
                        navigate('jsontools/JsonSearch', {
                            replace: false
                        })
                    }
                },
                {
                    label: 'JSON Compare',
                    key: 'JsonCompare',
                    icon: React.createElement(MailOutlined),
                    onClick: () => {
                        navigate('jsontools/JsonCompare', {
                            replace: false
                        })
                    }
                }
            ]
        },
        {
            key: `Data_Conversion`,
            icon: React.createElement(LaptopOutlined),
            label: `Data Conversion`,
            children: [
                {
                    label: 'Baser64 encode & decode',
                    key: 'Base64',
                    icon: React.createElement(LaptopOutlined),
                    onClick: () => {
                        navigate('data/base64', {
                            replace: false
                        })
                    }
                },
                {
                    label: 'UUID generator',
                    key: 'UUID',
                    icon: React.createElement(NotificationOutlined),
                    onClick: () => {
                        navigate('data/uuid', {
                            replace: false
                        })
                    }
                },
            ]
        }
    ]
}
