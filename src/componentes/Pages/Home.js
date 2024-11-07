import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../Layout/LinkButton'

function Home() {
    return (
        <section className ={styles.home_container}>
            <h1>Bem-Vindo ao <span>Gerenciador de Projetos</span></h1>
            <p>Uma nova maneira de gerenciar seus projetos !</p>
            <LinkButton to ='/newproject' text = 'Criar Projeto'/>
            <img src={savings} alt="cofre"></img>
        </section>
        
    )
}
export default Home