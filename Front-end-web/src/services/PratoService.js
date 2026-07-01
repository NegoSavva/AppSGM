import http from '../common/http-common';

const API_URL = "prato/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};


const create = (data) => {
    const formData = new FormData();

    const pratoDTO = {
        nome: data.nome,
        descricao: data.descricao,
        principal: data.principal,
        secundario: data.secundario,
        acompanhamento: data.acompanhamento,
        statusPrato: data.statusPrato,
    };

    formData.append("prato", new Blob([JSON.stringify(pratoDTO)], {
        type: "application/json"
    }));

    return http.mainInstance.post(API_URL + "create", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

const editar = (id, data) => {
    return http.mainInstance.put(API_URL + `editar/${id}`, data);
};

const inativar = (id) => {
    return http.mainInstance.put(API_URL + `inativar/${id}`);
};

const reativar = (id) => {
    return http.mainInstance.put(API_URL + `reativar/${id}`);
};

const findByNome = (nome) => {
    return http.mainInstance.get(API_URL + `findByNome?nome=${nome}`);
};

const PratoService = {
    findAll,
    findById,
    findByNome,
    create,
    editar,
    inativar,
    reativar,
};

export default PratoService;
