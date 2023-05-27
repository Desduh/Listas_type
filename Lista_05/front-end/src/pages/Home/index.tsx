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
                    <h1><strong>Bem-vindos!, Atlants</strong></h1>
               </div>
               <div className="text-box">
                    <strong>
                    É com imensa alegria que recebemos vocês em nosso maravilhoso parque aquático. Preparem-se para uma jornada cheia de diversão, adrenalina e momentos refrescantes que ficarão gravados em suas memórias para sempre.

                    Nossas piscinas cristalinas, escorregadores emocionantes e uma variedade de atrações aquáticas aguardam por vocês. A equipe do Atlants está empenhada em proporcionar uma experiência inesquecível, onde a segurança e o entretenimento são as nossas principais prioridades.
                    </strong>
                </div>
           </main>
       </section>
    );
}
export default Home;