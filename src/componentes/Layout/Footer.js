import {FaFacebook, FaInstagram, FaWhatsapp} from 'react-icons/fa'


import styles from './Footer.module.css'
function Footer() {
    return (
        <footer className = {styles.footer}>
            <ul className ={styles.social_list}>
                <li>
                    <FaFacebook/>
                </li>
                <li>
                    <FaInstagram/>
                </li>
                <li>
                    <FaWhatsapp/>
                </li>
            </ul>
            <p className={styles.copy_right}><span>Gerenciador de Projetos</span> &copy; <span>2024</span> </p>
        </footer>
    )
}
export default Footer