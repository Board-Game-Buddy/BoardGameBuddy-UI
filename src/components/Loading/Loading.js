import './Loading.css'
import { Circles } from 'react-loading-icons'

function LoadingComponent() {

    return (
        <div className='loading-container'>
            <Circles fill='#6D9CF3' />
            <h1 className='loading-text'>Loading...</h1>
        </div>
    )
}

export default LoadingComponent