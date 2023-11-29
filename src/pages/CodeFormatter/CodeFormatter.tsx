import React, {useCallback, useEffect, useState} from 'react'
import {FC} from 'react'
import CodeMirror from '@uiw/react-codemirror'
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import parserHTML from 'prettier/parser-html'
import parserTypescript from 'prettier/parser-typescript'
import {Radio} from 'antd'

import './codeFormatter.less'

const pasers: {[key: string]: any} = {
    'JSON': {
        parser: 'json5',
        plugins: [parserBabel]
    },
    'JavaScript': {
        parser: 'babel',
        plugins: [parserBabel]
    },
    'html': {
        parser: 'html',
        plugins: [parserHTML]
    },
    'TypeScript': {
        parser: 'typescript',
        plugins: [parserTypescript]
    }
}

export const CodeFormatter: FC = () => {
    const [inPutCode, setInPutCode] = useState<string>('')

    const [outPutCode, setOutPutCode] = useState<string>('')
    const [language, setLanguage] = useState<string>('JSON')
    const [errMsg, setErrMsg] = useState<string>('')

    const formatCode = useCallback(
        (originCode: string) => {
            setInPutCode(originCode)
            debugger
            console.log(language)
            if (originCode) {
                try {
                    const code = prettier.format(originCode, {
                        semi: false,
                        parser: pasers[language].parser,
                        plugins: pasers[language].plugins
                    })
                    setOutPutCode(code)
                    setErrMsg('')
                } catch (e) {
                    setErrMsg(String(e))
                }
            } else {
                setErrMsg('')
                setOutPutCode('')
            }
        },
        [language]
    )

    useEffect(() => {
        formatCode(inPutCode)
    }, [language])

    return (
        <>
            <CodeMirror
                onChange={v => {
                    formatCode(v)
                }}
                defaultChecked={true}
                minHeight={'200px'}
                theme={"dark"}
            />
            <div style={{color: 'red'}}>{errMsg}</div>
            <Radio.Group
                onChange={e => {
                    setLanguage(e.target.value)
                }}
                defaultValue={'JSON'}
                style={{marginTop: '10px', marginBottom: '10px'}}
            >
                <Radio value={'JSON'}>JSON</Radio>
                <Radio value={'JavaScript'}>JavaScript</Radio>
                <Radio value={'TypeScript'}>TypeScript</Radio>
                <Radio value={'html'}>HTML</Radio>
            </Radio.Group>

            <CodeMirror value={outPutCode} editable={false} />
        </>
    )
}
