import {Button, Col, Row} from 'antd'
import React, {FC, useState} from 'react'
//@ts-ignore
import ReactJsonViewCompare from 'react-json-view-compare'
import TextArea from 'antd/es/input/TextArea'

export const JsonCompare: FC = () => {
    const oldData = {
        'name': 'super',
        'age': 18
    }
    const newData = {
        name: 'coolapt',
        age: 20,
        task: [
            {name: 'eat', time: '09:00'},
            {name: 'work', time: '11:00'},
            {name: 'sleep', time: '23:00'},
            {name: 'running', time: '08:00'}
        ]
    }

    const [dataA, setDataA] = useState<any>()
    const [dataB, setDataB] = useState<any>()

    const [isDataAValid, setIsDataAValid] = useState<Boolean>(true)
    const [isDataBValid, setIsDataBValid] = useState<Boolean>(true)

    const textToString = (text: string) => text.split(' ').join('').split('\n').join('')
    return (
        <>
            <Row>
                <Col span={11}>Old Data</Col>
                <Col span={2}></Col>
                <Col span={11}>New Data</Col>
            </Row>
            <Row>
                <Col span={11}>
                    <TextArea
                        rows={11}
                        onChange={e => {
                            const str = textToString(e.target.value)
                            try {
                                if (str) {
                                    const obj = eval('(' + str + ')')
                                    setDataA(obj)
                                }
                                setIsDataAValid(true)
                            } catch (e) {
                                setIsDataAValid(false)
                                setDataA('')
                            }
                        }}
                    />
                </Col>
                <Col span={2}></Col>
                <Col span={11}>
                    <TextArea
                        rows={11}
                        onChange={e => {
                            const str = textToString(e.target.value)
                            try {
                                if (str) {
                                    const obj = eval('(' + str + ')')
                                    setDataB(obj)
                                }
                                setIsDataBValid(true)
                            } catch (e) {
                                setIsDataBValid(false)
                                setDataB('')
                            }
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={11}>
                    <span style={{display: isDataAValid ? 'none' : 'block', color: 'red'}}>Old Data inValid!</span>
                </Col>
                <Col span={2}></Col>
                <Col span={11}>
                    <span style={{display: isDataBValid ? 'none' : 'block', color: 'red'}}>New Data inValid!</span>
                </Col>
            </Row>
            <Row>{dataA && dataB && <ReactJsonViewCompare oldData={dataA} newData={dataB} />}</Row>
        </>
    )
}
