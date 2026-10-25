import { Link } from "react-router-dom";
import "./styles.css";

const Header = () => {

    return (

        <header>

            <span className="header">Catálogo de Filmes</span>

            <ul className="nav">

                <li>
                    <Link to="/">Início</Link>
                </li>

                <li>
                    <Link to="/criar">Criar</Link>
                </li>

                <li>
                    <Link to="/alterar">Alterar</Link>
                </li>

                <li>
                    <Link to="/apagar">Apagar</Link>
                </li>

            </ul>

        </header>
    );
}

export default Header;
