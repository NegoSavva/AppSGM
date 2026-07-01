import http from '../common/http-common';
const API_URL = "mensagem/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

const findByEmail = (email) => {
    return http.mainInstance.get(API_URL + `findByEmail/${encodeURIComponent(email)}`);
};

const create = data => {
    return http.mainInstance.post(API_URL + "create", data); // ENVIA COMO JSON
};

const inativar = (id) => {
    return http.mainInstance.put(API_URL + `inativar/${id}`);
};

const marcarComoLida = (id) => {
    return http.mainInstance.put(API_URL + `marcarComoLida/${id}`);
};

const MensagemService = {
    findAll,
    findById,
    findByEmail,
    create,
    inativar,
    marcarComoLida,
}

export default MensagemService;