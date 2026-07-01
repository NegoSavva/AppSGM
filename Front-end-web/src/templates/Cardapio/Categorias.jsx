import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../../components/Menu/Sidebar';
import Header from '../../components/Header/Header';
import {
  Alert,
  Button,
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import logo from '../../assets/images/home.png';
import { ThemeContext } from '../../contexts/ThemeContext';
import CategoriaService from '../../services/CategoriaService';

const CategoriaLista = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const recordsPerPage = [3, 5, 10];
  const [categorias, setCategorias] = useState([]);
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
    CategoriaService.findAll()
      .then((response) => {
        const data = (response.data || []).filter(item => item && item.id != null);
        setCategorias(data);
        setPage(0);
        setAlerta({ show: false, message: '', type: '' });
      })
      .catch(() => {
        setCategorias([]);
        setAlerta({ show: true, message: 'Erro ao carregar categorias.', type: 'error' });
      });
  };

  const findByNome = () => {
    const trimmedNome = search.trim();

    if (!trimmedNome) {
      findAll();
      return;
    }

    CategoriaService.findByNome(trimmedNome)
      .then((response) => {
        let data = [];
        if (Array.isArray(response.data)) {
          data = response.data.filter(item => item && item.id != null);
        } else if (response.data && response.data.id != null) {
          data = [response.data];
        }

        if (data.length === 0) {
          setAlerta({ show: true, message: 'Nenhum categoria encontrada!', type: 'warning' });
        } else {
          setAlerta({ show: true, message: 'Categoria(s) encontrada(s) com sucesso.', type: 'success' });
        }

        setCategorias(data);
        setPage(0);
      })
      .catch(() => {
        setCategorias([]);
        setAlerta({ show: true, message: 'Erro ao buscar categorias.', type: 'error' });
      });
  };

  useEffect(() => {
    findAll();
  }, []);

  useEffect(() => {
    const filtrados = categorias
      .filter(c => c && c.id != null)
      .filter(c => mostrarInativas || c.statusCategoria !== 'INATIVO');

    const totalPages = Math.ceil(filtrados.length / rowsPerPage);
    setPages(totalPages);
    if (page > totalPages - 1) {
      setPage(0);
    }
  }, [rowsPerPage, categorias, page, mostrarInativas]);

  const lerCategoria = (id) => {
    navigate(`/alterarcategoria/${id}`);
  };

  const listItems = () => {
    let items = [];
    for (let i = 1; i <= pages; i++) {
      items.push(
        <li className="page-item" key={i}>
          <button
            className="page-link"
            type="button"
            value={i}
            onClick={(e) => setPage(Number(e.target.value) - 1)}
          >
            {i}
          </button>
        </li>
      );
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination pt-3">
          <li className="page-item">
            <button
              className="page-link"
              type="button"
              onClick={() => setPage(p => (p > 0 ? p - 1 : p))}
            >
              &laquo;
            </button>
          </li>
          {items}
          <li className="page-item">
            <button
              className="page-link"
              type="button"
              onClick={() => setPage(p => (p < pages - 1 ? p + 1 : p))}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  const renderCards = () => {
    const filtrados = categorias
      .filter(c => c && c.id != null)
      .filter(c => mostrarInativas || c.statusCategoria !== 'INATIVO');

    const paginados = rowsPerPage > 0
      ? filtrados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : filtrados;

    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'flex-start',
          mt: 3,
        }}
      >
        {paginados.map((categoria, index) => {
          const globalIndex = page * rowsPerPage + index + 1;
          const dataFormatada = categoria.diaServido
            ? new Date(categoria.diaServido).toLocaleDateString('pt-BR')
            : '';

          const imagemSrc = categoria.foto?.startsWith('data:image')
            ? categoria.foto
            : `data:image/jpeg;base64,${categoria.foto}`;

          return (
            <Card key={categoria.id ?? `fallback-${index}`} sx={{ width: 300 }}>
              <CardMedia
                component="img"
                height="140"
                image={imagemSrc || '/static/images/cards/contemplative-reptile.jpg'}
                alt={`Imagem do categorias ${categoria.nome}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {globalIndex}. {categoria.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prato ID: {categoria.pratoId} <br />
                  Dia Servido: {dataFormatada} <br />
                  Status: {categoria.statusCategoria}
                </Typography>
              </CardContent>
              <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={() => lerCategoria(categoria.id)}
                >
                  Abrir
                </Button>
              </Box>
            </Card>
          );
        })}
      </Box>
    );
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="p-3 w-100">
        <Header goto={'/categoria'} title={'Lista de categoriass'} logo={logo} />

        <section className="p-2 m-2 shadow-lg">
          <form className="m-2 row" onSubmit={onSearchSubmit}>
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
            <Button
              variant="contained"
              sx={{ position: 'relative', color: 'white', backgroundColor: 'black' }}
            >
              Total de Cardápios
              <Badge
                badgeContent={
                  categorias.filter(
                    c => mostrarInativas || c.statusCategoria !== 'INATIVO'
                  ).length
                }
                color="error"
                sx={{
                  position: 'absolute',
                  top: -1,
                  right: -1,
                  transform: 'translate(50%, -50%)',
                }}
              />
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setMostrarInativas(!mostrarInativas)}
              sx={{ ml: 2 }}
            >
              {mostrarInativas ? 'Ocultar Inativas' : 'Mostrar Inativas'}
            </Button>
          </Box>

          {renderCards()}

          <hr />
          <div className="d-flex justify-content-between align-items-center px-2 rounded-2">
            <div className="fw-bold">
              Quantidade de Registros:{' '}
              {categorias.filter(c => mostrarInativas || c.statusCategoria !== 'INATIVO').length}
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
        </section>
      </div>
    </div>
  );
};

export default CategoriaLista;

