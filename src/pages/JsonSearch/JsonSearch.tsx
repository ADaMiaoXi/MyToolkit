import React, {FC, useState} from 'react'
import {get} from 'lodash'
import './JsonSearch.less'

export const JsonSearch: FC = () => {
    let paths: string[] = []
    let [resultText, setResultText] = useState('')
    let [jsonText, setJsonText] = useState('')
    let [attrValue, setAttrValue] = useState('')
    let [resultCount, setResultCount] = useState('')

    const getPath = (object: any, previousPath?: string) => {
        for (let key in object) {
            let currentPath = previousPath ? `${previousPath}.${key}` : key

            if (Array.isArray(object[key])) {
                paths.push(currentPath)
                getPath(object[key], currentPath)
            } else if (typeof object[key] === 'object') {
                // if (!Array.isArray(object)) { // skipping logging array keys like children.0
                paths.push(currentPath)
                // }
                getPath(object[key], currentPath)
            } else {
                paths.push(currentPath)
                console.log(6666)
            }
        }
    }

    const search = () => {
        try {
            paths = []
            let count = 0
            let result = ''

            const jsonValue = JSON.parse(jsonText)
            const attr = attrValue.replace(/\\"/g, '"')
            getPath(jsonValue)

            if (Object.keys(jsonValue).includes(attr)) {
                result = result + 'Note: Input JSON contains key "' + attr + '"\r\n\r\n'

                count++
            }

            paths.forEach(path => {
                let searchValue = get(jsonValue, path)
                if (typeof searchValue === 'boolean') {
                    searchValue = searchValue.toString()
                }
                if (
                    searchValue == attr ||
                    (searchValue != undefined &&
                        typeof searchValue === 'object' &&
                        !Array.isArray(searchValue) &&
                        Object.keys(searchValue).includes(attr)) ||
                    (attr == 'null' && searchValue == null)
                ) {
                    result = result + '$.' + fromLodashPathToArrayPath(path) + '\r\n'
                    count++
                }
            })
            setResultCount(count + ' results found')
            setResultText(result)
        } catch (e) {
            console.log(e)
            setResultCount('Error! ' + e)
        }
    }

    const fromLodashPathToArrayPath = (path: string) => {
        const subPaths = path.split('.')
        let resultPath = ''
        for (let i = 0; i < subPaths.length; i++) {
            if (isNumeric(subPaths[i])) {
                resultPath = resultPath + '[' + subPaths[i] + ']'
            } else {
                resultPath = resultPath + '.' + subPaths[i]
            }
        }
        return resultPath.substring(1, resultPath.length)
    }

    const isNumeric = (str: string | any) => {
        if (typeof str != 'string') return false // we only process strings!
        return (
            !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str))
        ) // ...and ensure strings of whitespace fail
    }

    const updateAttrValue = (evt: any) => {
        setAttrValue(evt.target.value)
    }
    const handleChangeInputJson = (e: any) => {
        setJsonText(e.target.value)
    }

    return (
        <>
            <div className='container'>
                <div className='leftPanel'>
                    <p className='titleParagraph'>Input JSON</p>
                    <textarea rows={30} cols={100} value={jsonText} onChange={handleChangeInputJson}></textarea>
                    <p className='titleParagraph'>Input value for search</p>
                    <input className='attrValue' onChange={updateAttrValue} />
                    <button onClick={search}>Search</button>
                </div>
                <div>
                    <p className='titleParagraph'>Result Paths</p>
                    <textarea id='result' rows={30} cols={100} disabled value={resultText}></textarea>
                    <p id='count'>{resultCount}</p>
                </div>
            </div>
        </>
    )
}
