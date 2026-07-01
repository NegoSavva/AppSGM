import React, { useState, useEffect } from 'react';
import MensagemService from '../../services/MensagemService';
import Sidebar from '../../components/Menu/Sidebar';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

const MensagensLista = () => {
  const recordsPerPage = [6, 8, 10];
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(recordsPerPage[0]);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const lerMensagem = (id) => {
    navigate(`/mensagemler/${id}`);
  };
  // Estado do alerta
  const [alerta, setAlerta] = useState({ show: false, message: '', type: '' });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const findAll = () => {
    MensagemService.findAll()
      .then((response) => {
        const data = response.data || [];
        setRecords(data);
        setPage(0);
        setPages(Math.ceil(data.length / rowsPerPage));
        setAlerta({ show: false, message: '', type: '' });
      })
      .catch((error) => {
        console.error('Erro ao buscar todas as mensagens:', error);
        setRecords([]);
        setPages(0);
        setPage(0);
        setAlerta({ show: true, message: 'Erro ao carregar mensagens.', type: 'error' });
      });
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const findByEmail = () => {
    const trimmedEmail = search.trim();
  
    if (!trimmedEmail) {
      findAll();
      return;
    }
  
    MensagemService.findByEmail(trimmedEmail)
      .then((response) => {
        const data = response.data || [];
        if (data.length === 0) {
          setAlerta({ show: true, message: 'Nenhuma mensagem encontrada para esse email.', type: 'warning' });
        } else {
          setAlerta({ show: true, message: 'Mensagens encontradas com sucesso!', type: 'success' });
        }
        setRecords(data);
        setPage(0);
        setPages(Math.ceil(data.length / rowsPerPage));
      })
      .catch((error) => {
        console.error('Erro ao buscar mensagens:', error);
        setRecords([]);
        setPages(0);
        setPage(0);
        setAlerta({ show: true, message: 'Erro ao buscar mensagens. Tente novamente.', type: 'error' });
      });
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    findByEmail();
  };

  useEffect(() => {
    findAll();
  }, []);

  useEffect(() => {
    setPages(Math.ceil(records.length / rowsPerPage));
    if (page > Math.ceil(records.length / rowsPerPage) - 1) {
      setPage(0);
    }
  }, [rowsPerPage, records]);

  const listItems = () => {
    let items = [];
    for (let i = 1; i <= pages; i++) {
      items.push(
        <li className="page-item" key={i}>
          <button
            className="page-link"
            type="button"
            value={i}
            onClick={(e) => setPage(e.target.value - 1)}
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
              aria-label="Previous"
              onClick={() => setPage((p) => (p > 0 ? p - 1 : p))}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {items}
          <li className="page-item">
            <button
              className="page-link"
              type="button"
              aria-label="Next"
              onClick={() => setPage((p) => (p < pages - 1 ? p + 1 : p))}
            >
              <span aria-hidden="true">&raquo;</span>
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
        <Header goto={'/mensagem'} title={'Lista de Mensagens'} logo={logo} />

        <section>
          <form className="shadow m-2 row py-4 rounded-2" onSubmit={onSearchSubmit}>
            <label htmlFor="inputSearch" className="col-lg-3 col-form-label fs-5 mt-1">
              Pesquise por email:
            </label>
            <div className="col-lg-8">
              <input
                type="text"
                className="form-control fs-5 mt-1"
                id="inputSearch"
                placeholder="Pesquise aqui..."
                value={search}
                onChange={onChangeSearch}
                aria-label="Campo de busca por email"
              />
            </div>
            <div className="col-lg-1 d-flex flex-row-reverse mt-1">
              <button type="submit" className="btn btn-primary" aria-label="Buscar por email">
                <i className="bi bi-search fs-5"></i>
              </button>
            </div>
          </form>

          {/* Alerta condicional */}
          {alerta.show && (
            <Alert
              icon={alerta.type === 'success' ? <CheckIcon fontSize="inherit" /> : null}
              severity={alerta.type}
              className="alert-position mb-3"
              onClose={() => setAlerta({ show: false, message: '', type: '' })}
            >
              {alerta.message}
            </Alert>
          )}

          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered shadow">
              <thead className="table-warning text-center">
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Remetente</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Status</th>
                  <th>Abrir</th>
                </tr>
              </thead>
              <tbody>
                {(rowsPerPage > 0
                  ? records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : records
                ).map((mensagem) => (
                  <tr key={mensagem.id}>
                    <td scope="row" className="text-center">
                      {mensagem.id}
                    </td>
                    <td>{mensagem.dataMensagem}</td>
                    <td>{mensagem.emissor}</td>
                    <td>{mensagem.email}</td>
                    <td>{mensagem.telefone}</td>
                    <td className="text-center">{mensagem.statusMensagem}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-success"
                        aria-label={`Abrir mensagem ${mensagem.id}`}
                        title={`Abrir mensagem ${mensagem.id}`}
                        onClick={() => lerMensagem(mensagem.id)}
                      >
                        <i className="bi bi-folder2-open"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <div className=" bg-opacity-25 d-flex justify-content-between align-items-center px-2 rounded-2">
              <div className="me-1 fw-bold">
                <span>Quantidade de Registros: </span>
                <span>{records.length}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="itensPorPagina" className="me-2 fw-bold">
                  Registros por página:
                </label>
                <select
                  id="itensPorPagina"
                  className="form-select me-2"
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  aria-label="Selecionar quantidade de registros por página"
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

export default MensagensLista;
