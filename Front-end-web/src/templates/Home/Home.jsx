import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import Caarousel from '../../components/Carousel/Nsei'
import ContentHome from "../../components/Secoes/ContentHome"
import './Home.css'
import '../../components/Carousel/Style.css'

const Home = () => {
    const OPTIONS = {}
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    return (
        <div className="d-flex opa">
           <Sidebar />
           <div className="p-3 w-100">
                <Header 
                    goto={'/'}
                    title={'Inicial'}
                    logo={logo}
                    />
                    <div className="caixota mt-3">
                    <h2 className="text-center fw-bold m-4">Bem-vindo!</h2>
                <section className='uepa'>
                  <Caarousel slides={SLIDES} options={OPTIONS} />
                </section>
                 <main className="container"> 
                  <ContentHome />
                 </main>
            </div>
        </div>
      </div>
    )
}

export default Home