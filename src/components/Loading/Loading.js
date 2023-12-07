import './LoadingComponent.css'
import { TailSpin } from 'react-loading-icons'

function Loading() {

    return (
        <div className='loading-container'>
            <TailSpin />
            <h1 className='loading-text'>Loading...</h1>
        </div>
    )
}

export default Loading