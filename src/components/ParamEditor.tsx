import React, { useState } from 'react';
import './styles.css';

interface Param {
    id: number;
    name: string;
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;
}


interface FieldEditor {
    label: string,
    value: string,
    setDataModel: React.Dispatch<React.SetStateAction<ParamValue[]>>
    idItem: number
}


const FieldEditor = ({ label, value, setDataModel, idItem }: FieldEditor) => {
    const [currentValue, setCurrentValue] = useState(value);

    const handlerChangeCurrentValue = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
        if (e.key === 'Enter') {
            setDataModel(prev => [...prev.map((item) => item.paramId === id ? { ...item, value: currentValue } : item)])
        }
    }

    return (
        <div className='item-list-editor'>
            <label className='label-field'>{label}</label>
            <input onKeyDown={(e) => handlerChangeCurrentValue(e, idItem)} type="text" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} />
        </div>
    )
}

const FieldEdited = ({ label, text }: { label: string, text: string | undefined }) => {
    return (
        <div className='item-list-edited'>
            <span className='label-field'>{label}</span>
            <p>{text}</p>
        </div>
    )
}



const ParamEditor: React.FC<Props> = ({ params, model }) => {
    const [dataModel, setDataModel] = useState<ParamValue[]>(model.paramValues);

    const searchValue = (id: number) => dataModel.find((item) => item.paramId === id)?.value ?? '';


    return (
        <>
            <div className='block-list-editor'>

                {params.map((data) => <FieldEditor idItem={data.id} setDataModel={setDataModel} key={data.id} label={data.name} value={searchValue(data.id)} />
                )}

            </div>
            <div className='block-list-edited'>
                {params.map((data) => <FieldEdited key={data.name} label={data.name} text={searchValue(data.id)} />)}
            </div>
        </>
    )
}

export default ParamEditor