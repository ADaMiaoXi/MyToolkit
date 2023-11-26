import React, {useState} from 'react'
import {FC} from 'react'
import {Button, Col, InputNumber, Row, Input, Space} from 'antd'
import {v4 as uuidv4} from 'uuid'

export const UUIDGenerator: FC = () => {
    const [count, setCount] = useState<string | number | null>(5)
    const [text, setText] = useState<string>()
    const [rowSize, setRowSizet] = useState<number>(5)

    const generateUUID = () => {
        if (count) {
            let text = ''
            for (let i = 0; i < Number(count); i++) {
                text = text + uuidv4() + '\n'
            }
            if (Number(count) > 5) {
                setRowSizet(Number(count))
            } else {
                setCount(5)
            }

            setText(text)
        }
    }
    return (
        <>
            <Space direction='vertical' size='middle' style={{display: 'flex'}}>
                <Row>
                    <Col span={8}>
                        <InputNumber
                            style={{width: '65%'}}
                            min={1}
                            max={99}
                            placeholder={'How many UUI do you want to generate?'}
                            value={count}
                            onChange={e => {
                                setCount(e)
                            }}
                        />
                        <Button type='primary' style={{marginLeft: '5px', width: '20%'}} onClick={generateUUID}>
                            Generate
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={7}>
                        <Input.TextArea rows={rowSize} value={text} />
                    </Col>
                </Row>
            </Space>
        </>
    )
}
