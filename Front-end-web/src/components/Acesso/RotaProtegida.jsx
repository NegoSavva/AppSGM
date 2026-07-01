import { useUser } from '../../contexts/UserContext';
import AcessoNegado from "../../templates/Home/AcessoNegado";

const RotaProtegida = ({ children }) => {
  const { currentUser } = useUser();

  if (!currentUser) {
    return <AcessoNegado />;
  }

  return children;
};

export default RotaProtegida;
