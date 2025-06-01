import './App.css'
import { DragBody } from '../component/DragBody/DragBody'
import { Header } from '../component/Header/Header'
import { Footer } from '../component/Footer/Footer'

export const App = () => {
    return (<>
        <Header/>
        <DragBody />
        <Footer/>
    </>
    )
}
