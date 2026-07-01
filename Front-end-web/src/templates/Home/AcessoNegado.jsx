import { useUser } from "../../contexts/UserContext";
import Header from "../../components/Header/Header";
import logo from "../../assets/images/Logozinha.png";
import "./Home.css";

const AcessoNegado = () => {
  const { currentUser, isUserLoaded } = useUser();

  if (!isUserLoaded) {
    return null; // Ou um spinner, se quiser
  }

  return (
    <div className="container">
      <div className="p-3 w-100">
        <Header
          goto={"/"}
          title={"Acesso Negado!"}
          logo={logo}
        />
        <div className="textao">
          <h2 className="text-center text-danger mt-5 py-2 width-100">
            Acesso permitido apenas para pessoas autorizadas!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AcessoNegado;
