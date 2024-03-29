const pool = require('../conexao')

const listarAdministradorPorIdQuery = async (id_administrador) => {
    return pool('administrador')
    .where({ id_administrador })
    .first()
}

const listarAdministradorPorEmailQuery = async (email) => {
    return pool('administrador')
    .where({ email })
    .first()
}

const listarEleicoesPorAdministradorQuery = async (id_administrador) => {
    return pool('eleicao')
    .where({ id_administrador })
}

const listarEleicaoPorIdQuery = async (id_eleicao, id_administrador) => {
    return pool('eleicao')
    .where({ id_eleicao })
    .andWhere({ id_administrador })
    .first()
}

const listarEleicaoPorIdQueryAlternativa = async (id_eleicao) => {
    return pool('eleicao')
    .where({ id_eleicao })
    .first()
}

const listarPartidoPorEmailQuery = async (email) => {
    return pool('partido')
    .where({ email })
    .first()
}

const listarPartidoPorIdQuery = async (id_partido) => {
    return pool('partido')
    .where({ id_partido })
    .first()
}

const listarDeputadoPorIdQuery = async (id_deputado, id_partido) => {
    return pool('deputado')
    .where({ id_deputado })
    .andWhere({ id_partido })
    .first()
}

const encontrarDeputadoLiderQuery = async (id_partido) => {
    return pool('deputado')
    .where({ id_partido })
    .andWhere('lider', true)
}

const listarDeputadosPorPartidoQuery = async (id_partido) => {
    return pool('deputado')
    .where({ id_partido })
}

const listarEleitorPorEmailQuery = async (email) => {
    return pool('eleitor')
    .where({ email })
    .first()
}

const listarEleitorPorIdQuery = async (id_eleitor) => {
    return pool('eleitor')
    .where({ id_eleitor })
    .first()
}

const listarEleitoresPorEleicaoQuery = async (id_eleicao) => {
    return pool.select('id_eleitor', 'id_eleicao', 'nome', 'email', 'votou')
    .from('eleitor')
    .where({ id_eleicao })
}

const listarPartidosPorEleicaoQuery = async (id_eleicao) => {
    return pool.select('id_partido', 'id_eleicao', 'nome', 'posicao_economica', 'posicao_social')
    .from('partido')
    .where({ id_eleicao })
}

const listarPartidoPorIdEEleicaoQuery = async (id_partido, id_eleicao) => {
    return pool('partido')
    .where({ id_partido })
    .andWhere({ id_eleicao })
    .first()
}

const listarResultadoPorPartidoQuery = async (id_partido) => {
    return pool('resultado')
    .where({ id_partido })
    .first()
}

const listarResultadoPorEleicaoQuery = async (id_eleicao) => {
    return pool('resultado')
    .where({ id_eleicao })
}

module.exports = {
    listarAdministradorPorIdQuery,
    listarAdministradorPorEmailQuery,
    listarEleicoesPorAdministradorQuery,
    listarEleicaoPorIdQuery,
    listarEleicaoPorIdQueryAlternativa,
    listarPartidoPorEmailQuery,
    listarPartidoPorIdQuery,
    listarDeputadoPorIdQuery,
    encontrarDeputadoLiderQuery,
    listarDeputadosPorPartidoQuery,
    listarEleitorPorEmailQuery,
    listarEleitorPorIdQuery,
    listarEleitoresPorEleicaoQuery,
    listarPartidosPorEleicaoQuery,
    listarPartidoPorIdEEleicaoQuery,
    listarResultadoPorPartidoQuery,
    listarResultadoPorEleicaoQuery
}