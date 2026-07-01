import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../../components/Menu/Sidebar';
import Header from '../../components/Header/Header';
import UsuarioService from '../../services/UsuarioService';
import { Alert, Button, Badge, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import logo from '../../assets/images/home.png';
import { ThemeContext } from "../../contexts/ThemeContext";

const UsuariosLista = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const recordsPerPage = [6, 8, 10];
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarInativas, setMostrarInativas] = useState(false);
  const [search, setSearch] = useState('');
  const [alerta, setAlerta] = useState({ show: false, message: '', type: '' });

  // Paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(recordsPerPage[0]);
  const [pages, setPages] = useState(0);

  const buttonColor = theme === 'Claro' ? 'primary' : 'error';

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    findByNome();
  };

  const findAll = () => {
    UsuarioService.findAll()
      .then((response) => {
        const data = response.data || [];
        setUsuarios(data);
        setPage(0);
        setPages(Math.ceil(data.length / rowsPerPage));
        setAlerta({ show: false, message: '', type: '' });
      })
      .catch(() => {
        setUsuarios([]);
        setAlerta({ show: true, message: 'Erro ao carregar usuários.', type: 'error' });
      });
  };

  const findByNome = () => {
    const trimmedNome = search.trim();

    if (!trimmedNome) {
      findAll();
      return;
    }

    UsuarioService.findByNome(trimmedNome)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [response.data];
        if (data.length === 0) {
          setAlerta({ show: true, message: 'Nenhum usuário encontrado!', type: 'warning' });
        } else {
          setAlerta({ show: true, message: 'Usuário(s) encontrado(s) com sucesso.', type: 'success' });
        }
        setUsuarios(data);
        setPage(0);
        setPages(Math.ceil(data.length / rowsPerPage));
      })
      .catch(() => {
        setUsuarios([]);
        setAlerta({ show: true, message: 'Erro ao buscar usuários.', type: 'error' });
      });
  };

  useEffect(() => {
    findAll();
  }, []);

  useEffect(() => {
    setPages(Math.ceil(usuarios.length / rowsPerPage));
    if (page > pages - 1) {
      setPage(0);
    }
  }, [rowsPerPage, usuarios]);

  const lerUsuario = (id) => {
    navigate(`/usuarioeditar/${id}`);
  };

  const listItems = () => {
    let items = [];
    for (let i = 1; i <= pages; i++) {
      items.push(
        <li className="page-item" key={i}>
          <button className="page-link" type="button" value={i} onClick={(e) => setPage(e.target.value - 1)}>
            {i}
          </button>
        </li>
      );
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination pt-3">
          <li className="page-item">
            <button className="page-link" type="button" onClick={() => setPage(p => (p > 0 ? p - 1 : p))}>
              &laquo;
            </button>
          </li>
          {items}
          <li className="page-item">
            <button className="page-link" type="button" onClick={() => setPage(p => (p < pages - 1 ? p + 1 : p))}>
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="p-3 w-100">
        <Header goto={'/usuario'} title={'Lista de usuários'} logo={logo} />

        <section className="p-2 m-2 shadow-lg">
          <form className=" m-2 row" onSubmit={onSearchSubmit}>
            <label htmlFor="inputSearch" className="col-lg-3 col-form-label fs-9 ">
              Pesquise por nome:
            </label>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control fs-9"
                id="inputSearch"
                placeholder="Pesquise aqui..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-lg-1 d-flex flex-row-reverse">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-search fs-6"></i>
              </button>
            </div>
          </form>

          {alerta.show && (
            <Alert
              icon={alerta.type === 'success' ? <CheckIcon fontSize="inherit" /> : null}
              severity={alerta.type}
              onClose={() => setAlerta({ show: false, message: '', type: '' })}
              className="mb-3"
            >
              {alerta.message}
            </Alert>
          )}

          <Box m={2} display="flex" alignItems="center">
            <Button variant="contained" sx={{ position: 'relative', color: 'white', backgroundColor: 'black' }}>
              Total de Usuarios
              <Badge
                badgeContent={usuarios.length}
                color="error"
                sx={{ position: 'absolute', top: -1, right: -1, transform: 'translate(50%, -50%)' }}
              />
            </Button>

            <Link style={{ textDecoration: 'none' }}>
              <Button variant="contained" color={buttonColor} sx={{ ml: 2 }}>
                Lista
              </Button>
            </Link>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setMostrarInativas(!mostrarInativas)}
              sx={{ ml: 2 }}
            >
              {mostrarInativas ? 'Ocultar Inativas' : 'Mostrar Inativas'}
            </Button>
          </Box>

          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered shadow">
              <thead className="table text-center">
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Acesso</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Abrir</th>
                </tr>
              </thead>
              <tbody>
                {(rowsPerPage > 0
                  ? usuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : usuarios
                )
                  .filter((u) => mostrarInativas || u.statusUsuario !== 'INATIVO')
                  .map((usuario) => {
                    const dataFormatada = new Date(usuario.dataCadastro).toLocaleDateString('pt-BR');
                    return (
                      <tr key={usuario.id}>
                        <td className="text-center">{usuario.id}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.nivelAcesso}</td>
                        <td>{dataFormatada}</td>
                        <td className="text-center">{usuario.statusUsuario}</td>
                        <td className="text-center">
                          <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            onClick={() => lerUsuario(usuario.id)}
                          >
                            <i className="bi bi-person-fill-gear me-2"></i>Abrir
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <hr />
            <div className="d-flex justify-content-between align-items-center px-2 rounded-2">
              <div className="fw-bold">
                Quantidade de Registros: {usuarios.length}
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="itensPorPagina" className="me-2 fw-bold">
                  Registros por página:
                </label>
                <select
                  id="itensPorPagina"
                  className="form-select me-2"
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  style={{ width: '70px' }}
                >
                  {recordsPerPage.map((r) => (
                    <option value={r} key={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <div>{listItems()}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UsuariosLista;
