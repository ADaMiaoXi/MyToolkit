import React, { useState } from 'react'
import {FC} from 'react'
import {Button, Input} from 'antd'

export const Base64Conversion: FC = () => {
    const {TextArea} = Input

    const [inputData , setInputData] = useState<string>()
    const [outputData , setOutputData] = useState<string>()

    const encodeData = () => {
        if(inputData){
            setOutputData(btoa(inputData))
        } 
    }

    const decodeData = () => {
        if(inputData){
            setOutputData(atob(inputData))
        } 
    }

    return (
        <>
            <TextArea rows={4} placeholder='Please enter your data!' onChange={e => {setInputData(e.target.value)}}/>
            <Button style={{margin: '5px'}} onClick={encodeData}>Encode</Button>
            <Button style={{margin: '5px'}} onClick={decodeData}>Decode</Button>
            <TextArea rows={4} placeholder='Output would be here!' value={outputData}/>
        </>
    )
}
