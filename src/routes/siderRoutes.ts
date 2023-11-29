import React from 'react'
import {JsonSearch, JsonCompare ,Base64Conversion, UUIDGenerator, CodeFormatter} from '../pages'
import {RouteObject} from 'react-router-dom'

const routes: RouteObject[] = [
    {
        path: 'jsontools/JsonSearch',
        element: React.createElement(JsonSearch)
    },
    {
        path: 'jsontools/JsonCompare',
        element: React.createElement(JsonCompare)
    },
    {
        path: 'data/base64',
        element: React.createElement(Base64Conversion)
    },{
        path: 'data/uuid',
        element: React.createElement(UUIDGenerator)
    },
    {
        path: 'code/formatter',
        element: React.createElement(CodeFormatter)
    }
]

export default routes
