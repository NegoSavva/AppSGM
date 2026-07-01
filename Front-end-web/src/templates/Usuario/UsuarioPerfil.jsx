import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/Logozinha.png';
import perfil from '../../assets/images/Logozinha.png';
import { useEffect, useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import './Usuario.css';
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal";
import ThemeToggleButton from '../../components/Botoes/TrocarCor';
import { Button, ButtonGroup } from '@mui/material';
import { useUser } from '../../contexts/UserContext';


const UsuarioPerfil = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, setCurrentUser } = useUser();

  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [dataFile, setDataFile] = useState(null);
  const [chosenImage, setChosenImage] = useState(null);
  const [message, setMessage] = useState(null);
  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
    UsuarioService.findById(id)
      .then(response => {
        setUsuario(response.data);
        setNome(response.data.nome || "");
        if (response.data.foto) {
          setChosenImage(response.data.foto);
        } else {
          setChosenImage(null);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const setFile = (file) => setDataFile(file);
  const setImage = (img) => setChosenImage(img);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("nome", nome);

    // Enviar nível de acesso atual (para não perder)
    if (usuario?.nivelAcesso) {
      form.append("nivelAcesso", usuario.nivelAcesso);
    }

    if (dataFile) {
      form.append("file", dataFile);
    }

    try {
      await UsuarioService.updateProfile(id, form);
      setSuccessful(true);
      setMessage("Alterações salvas com sucesso!");

      const response = await UsuarioService.findById(id);
      setUsuario(response.data);
      setNome(response.data.nome || "");
      if (response.data.foto) {
        setChosenImage(response.data.foto);
      } else {
        setChosenImage(null);
      }

      setCurrentUser(response.data);
      
    } catch (error) {
      setSuccessful(false);
      setMessage("Erro ao salvar alterações.");
      console.error(error);
    }
  };

  const goToAlterarSenha = () => navigate(`/usuarioalterarsenha/${id}`);

  if (!usuario) return <div>Carregando...</div>;

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="p-3 w-100">
        <Header goto={'/home'} title={'Perfil de Usuário'} logo={logo} />
        <section className="m-1 p-1 shadow-lg">
          <form className="form-perfil row g-2 rounded-2 shadow" onSubmit={handleSubmit}>
            <div className="col-md-12 text-center">
              <img
                src={chosenImage || perfil}
                alt="Foto do usuário"
                style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '50%' }}
              />
            </div>
            <div className="col-md-12 d-flex align-items-center justify-content-center">
              <ImageUploaderModal setFile={setFile} setImage={setImage} />
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="inputNome" className="form-label mb-1 fw-bold">Nome:</label>
              <input
                type="text"
                className="form-control"
                id="inputNome"
                value={nome || ""}
                onChange={e => setNome(e.target.value)}
              />
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label mb-1 fw-bold">Email:</label>
              <input
                type="email"
                className="form-control text-center"
                readOnly
                value={usuario.email || ""}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label mb-1 fw-bold">Nível de Acesso:</label>
              <input
                type="text"
                className="form-control text-center"
                readOnly
                value={usuario.nivelAcesso || ""}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label mb-1 fw-bold">Status:</label>
              <input
                type="text"
                className="form-control text-center"
                readOnly
                value={usuario.statusUsuario || ""}
              />
            </div>
            <div className="col-12 mb-2 d-flex justify-content-between">
              <ButtonGroup variant="contained" spacing={2}>
                <Button type="submit" color="primary" sx={{ boxShadow: 2 }}>
                  Gravar Alterações
                </Button>
                <Button type="button" onClick={goToAlterarSenha} color="error" sx={{ boxShadow: 2 }}>
                  Alterar a Senha
                </Button>
              </ButtonGroup>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <ThemeToggleButton />
            </div>
            {message && (
              <div className={`mt-2 ${successful ? 'text-success' : 'text-danger'}`}>
                {message}
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default UsuarioPerfil;
