import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/Logozinha.png';
import perfil from '../../assets/images/Logozinha.png';
import { useEffect, useRef, useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Usuario.css';

const UsuarioAlterarSenha = () => {
  const navigate = useNavigate();

  const objectValues = {
    id: null,
    nome: "",
    email: "",
    nivelAcesso: ""
  };

  const [usuario, setUsuario] = useState(objectValues);
  const { id } = useParams();
  const _dbRecords = useRef(true);
  const [formData, setFormData] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState();
  const [msgConfirm, setMsgConfirm] = useState();

  // Controla se o modal Dialog está aberto
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(formData => ({ ...formData, [name]: value }));
  }

  useEffect(() => {
    UsuarioService.findById(id).then(
      (response) => {
        const usuario = response.data;
        setUsuario(usuario);
      }
    ).catch((error) => {
      console.log(error);
    })
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    UsuarioService.alterarSenha(id, formData).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        setOpenDialog(true);  // Abre o modal
      },
      (error) => {
        const respMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(respMessage);
        setSuccessful(false);
        setOpenDialog(true);  // Abre modal com erro
      }
    );
  };

  const confirmPass = (e) => {
    const value = e.target.value;
    if (formData.senha === value) {
      setMsgConfirm();
    } else {
      setMsgConfirm('As senhas não conferem!');
    }
  }

  const goBack = (id) => {
    navigate(`/usuarioperfil/` + id)
  }

  // Fecha o dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Se foi sucesso, faz logout e redireciona
    if (successful) {
      UsuarioService.logout();
      navigate('/login');
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="p-3 w-100">
        <Header
          goto={'/home'}
          title={'Alterar a Senha'}
          logo={logo}
        />
        <section className="m-1 p-1 shadow-lg">
          <form className="form-perfil row g-2 rounded-2 shadow" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <img src={usuario.foto ? usuario.foto : perfil} alt="..." />
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="inputNome" className="form-label mb-1 fw-bold">Nome:</label>
              <input type="text" className="form-control text-center" id="inputNome" readOnly
                defaultValue={usuario.nome} />
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="inputEmail4" className="form-label mb-1 fw-bold">Email:</label>
              <input type="email" className="form-control text-center" id="inputEmail4" readOnly
                defaultValue={usuario.email} />
            </div>

            <div className="mb-2">
              <label htmlFor="senha" className="form-label mb-0 fw-bold">Nova Senha:</label>
              <input type="password" id="senha" className="form-control text-center fw-medium shadow"
                name="senha" required
                value={formData.senha || ""}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="newpass" className="form-label mb-0 fw-bold">Confirme a Senha:</label>
              <input type="password" id="newpass" className="form-control text-center fw-medium shadow"
                name="newpass" required
                onChange={confirmPass} />
            </div>
            <div className="text-center p-2 rounded-2">
              {msgConfirm && (
                <div className="fw-bold fs-5 text-danger">
                  <span>{msgConfirm}</span>
                </div>
              )}
            </div>

            <div className="col-12 mb-2 d-flex justify-content-between">
              <button type="button" onClick={() => goBack(usuario.id)}
                className="btn btn-warning shadow">
                Cancelar
              </button>

              <button type="submit" className="btn btn-primary shadow">
                Gravar Alterações
              </button>
            </div>
          </form>
        </section>

        {/* Modal dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">{successful ? "Sucesso" : "Erro"}</DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {message || (successful ? 'Senha alterada com sucesso!' : 'Erro ao alterar senha')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" autoFocus>
              {successful ? "Acessar o sistema" : "Fechar"}
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>
  );
}

export default UsuarioAlterarSenha;
