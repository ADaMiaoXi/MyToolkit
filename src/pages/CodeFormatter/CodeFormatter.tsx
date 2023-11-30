import React, {useCallback, useEffect, useState} from 'react'
import {FC} from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import parserHTML from 'prettier/parser-html'
import parserTypescript from 'prettier/parser-typescript'
import {Radio} from 'antd'

import './codeFormatter.less'

const pasers: {[key: string]: any} = {
    'JSON': {
        parser: 'json',
        plugins: [parserBabel],
        extensions: [json()]
    },
    'JavaScript': {
        parser: 'babel',
        plugins: [parserBabel],
        extensions: [javascript({ jsx: true })]
    },
    'html': {
        parser: 'html',
        plugins: [parserHTML],
        extensions: [html()]
    },
    'TypeScript': {
        parser: 'typescript',
        plugins: [parserTypescript],
        extensions: [javascript({ jsx: true })]
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
                height={'300px'}
                theme={"dark"}
                extensions={pasers[language].extensions}
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

            <CodeMirror value={outPutCode} minHeight='300px' theme={"dark"} editable={false} extensions={pasers[language].extensions}/>
        </>
    )
}
