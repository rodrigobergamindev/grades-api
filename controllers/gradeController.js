import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import { Grade }  from  '../models/Grade.model.js'

const create = async (req, res) => {
  try {
    const { name, subject, type, value } = req.body
    const grade = await Grade.create({name, subject, type, value})
    res.send('Grade Created!');
    logger.info(`POST /grade - ${JSON.stringify(grade)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
}; //OK

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const grades = await Grade.find(condition)
    res.json(grades)
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
}; //OK

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const grade = await Grade.findById(id)
    res.status(200).json(grade)
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
}; //OK

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualização vazio',
    });
  }

  const id = req.params.id;

  try {
    console.log(id)
    const {name, subject, type, value} = req.body
    const grade = await Grade.findByIdAndUpdate(id, {$set:{name,subject, type, value}}, {runValidators: true, new: true})
    console.log(grade)
    res.send({ message: 'Grade atualizado com sucesso' });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
}; //OK

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    console.log(id)
     const grade = await Grade.findByIdAndDelete(id)
     console.log(grade)
    res.send({ message: 'Grade excluido com sucesso' });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
}; //OK

const removeAll = async (req, res) => {

  try {
    await Grade.deleteMany()
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
}; //OK

export default { create, findAll, findOne, update, remove, removeAll };
