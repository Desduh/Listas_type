import Navbar_ from '../../component/barraNavegacao';
import './styles.css'

function Home() {
    return (
       <section>
           <header>
               <Navbar_/>
           </header>
           <main>
           <div className="text">
                    <h1><strong>Salão WB</strong></h1>
               </div>
               <div className="text-box">
                    <strong>
                    <p>Seja bem-vindo(a) ao mais novo sistema de cadastro e controle do Grupo WB.</p>
                    <p>O sistema que foi implatado em todas nossas franquias e vêm facilitando o cotidiano de todas elas.</p>
                    <p>Aqui você pode cadastrar novos clientes, produtos e/ou serviço, visualizar os que já foram cadastrados e ainda visualizar as listagens dos produtos mais consumidos, dos clientes que mais consumiram entre outras.</p>
                    </strong>
                </div>
           </main>
       </section>
    );
}
export default Home;