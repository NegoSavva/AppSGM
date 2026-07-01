import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import perfil from '../../assets/images/Logozinha.png';
import './Sidebar.css';
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ThemeContext } from '../../contexts/ThemeContext';

const Sidebar = () => {

    const { currentUser, clearUser } = useContext(UserContext);
    console.log("Sidebar currentUser:", currentUser);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const logout = () => {
        clearUser();
        navigate("/");
    };

    const editar = (id) => {
        navigate(`/usuarioperfil/${id}`);
    };

    const buttonColor = theme === 'Claro' ? 'primary' : 'error';

    return currentUser ? (
        <div className="sidebar">
            <form onSubmit={(e) => { e.preventDefault(); logout(); }} className="d-flex flex-column justify-content-around align-items-center m-1 py-2 border-bottom rounded">
                <img src={currentUser.foto || perfil} alt="logo" className="mt-2 w-25 migs" />
                <div className="my-2">
                    <span className="fw-bold fst-italic">{currentUser.nome}</span>
                </div>
                <div>
                    <ButtonGroup variant="contained" color={buttonColor}>
                        <Button onClick={logout}>Sair</Button>
                        <Button onClick={() => editar(currentUser.id)}>Abrir</Button>
                    </ButtonGroup>
                </div>
            </form>
            <nav className="nav flex-column">
                <Link className="nav-link" to={'/home'}>Dashboard</Link>
                <Link className="nav-link" to={'/mensagem'}>Mensagem</Link>
                <Link className="nav-link" to={'/usuario'}>Usuário</Link>
                <Link className="nav-link" to={'/grafico'}>Gráfico</Link>
                <Link className="nav-link" to={'/cardapio'}>Cardápio</Link>
            </nav>
        </div>
    ) : null;
};

export default Sidebar;
