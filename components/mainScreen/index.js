import React, {useContext} from 'react'
import { ViewContext } from '../../contexts/viewContext'

export default function MainScreen() {
    const {view,setView} = useContext(ViewContext);
    return (
        <div className='min-h-full flex-1 bg-blue-100'>
            {view}
        </div>
    )
}
