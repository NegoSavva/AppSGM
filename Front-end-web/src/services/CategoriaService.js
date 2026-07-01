import http from '../common/http-common';

const API_URL = "categoria/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};


const create = (data) => {
    const formData = new FormData();

    const categoriaDTO = {
        nome: data.nome,
        statusCategoria: data.statusCategoria,
        statusCategoria: data.statusCategoria
    };

    formData.append("categoria", new Blob([JSON.stringify(categoriaDTO)], {
        type: "application/json"
    }));

    // Adiciona o arquivo, se existir
    if (data.fotoFile) {
        formData.append("file", data.fotoFile);
    }

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

const CategoriaService = {
    findAll,
    findById,
    create,
    editar,
    inativar,
    reativar,
    findByNome
};

export default CategoriaService;
