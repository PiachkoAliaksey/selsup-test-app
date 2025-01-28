import './App.css';
import ParamEditor from './components/ParamEditor';


const dataParams = [{ id: 1, name: 'Назначение' }, { id: 2, name: 'Длина' }];
const dataModel = {
    paramValues: [
        { paramId: 1, value: 'повседневное' },
        { paramId: 2, value: 'макси' }
    ]
}

function App() {
  return (
    <div className='App'>
      <ParamEditor params={dataParams} model={dataModel} />
    </div>
  )
}

export default App
