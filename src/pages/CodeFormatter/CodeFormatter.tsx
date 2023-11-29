import React, { useState } from 'react'
import {FC} from 'react'
import CodeMirror from '@uiw/react-codemirror'
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import TextArea from 'antd/es/input/TextArea'

export const CodeFormatter: FC = () => {

    const [originCode, setOriginCode] = useState<string>('')
    const code = prettier.format(originCode, {semi: false, parser: 'babel', plugins: [parserBabel]})

    return (
        <>
            <TextArea
                rows={11}
                onChange={e => {
                    setOriginCode(e.target.value)
                }}
            />
            <CodeMirror value={code} />
        </>
    )
}
