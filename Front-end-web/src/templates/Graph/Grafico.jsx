import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import Comp from '../../components/Grafico/Graficos'


const Grafico = () => {
   
    return (
        <div className="d-flex">
           <Sidebar />
           <div className="p-3 w-100">
                <Header 
                    goto={'/home'}
                    title={'Gráfico'}
                    logo={logo}
                    />
            <section className=" caixota mt-2 mb-2">
                <h2>Análise de Dados Semanais</h2>
                <p>Nesta seção, você pode visualizar as tendências de uso/consumo em diferentes turnos ao longo da semana. 
                    Este gráfico ajuda a identificar padrões que podem ser usados para otimizar recursos, ajustar 
                    planejamentos e garantir que a gestão escolar esteja alinhada com as necessidades reais
                     dos alunos e da instituição.</p>
            </section>
                <div id="ContainerGraph" className="caixota">
                    <Comp/>
                </div>
             
           </div>
        </div>
    )
}

export default Grafico