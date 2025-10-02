const http = require('http');
const request = require('supertest');
const app = require('../app'); 

let server;
let idCriado;

beforeAll(done => {
  server = http.createServer(app);
  server.listen(done);
});

afterAll(done => {
  server.close(done);
});

describe('API de Tarefas', () => {
  
  it('GET /tarefas deve retornar status 200 e um array JSON', async () => {
    const res = await request(server).get('/tarefas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /tarefas deve criar uma tarefa e retornar status 201 com JSON', async () => {
    const novaTarefa = { nome: "Estudar Node", concluida: false };
    const res = await request(server).post('/tarefas').send(novaTarefa);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    idCriado = res.body.id;  
  });

  it('GET /tarefas/:id deve retornar 200 e a tarefa em JSON', async () => {
    const res = await request(server).get(`/tarefas/${idCriado}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', idCriado);
  });

  it('GET /tarefas/1 deve retornar 404 e mensagem de erro', async () => {
    const res = await request(server).get('/tarefas/1');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ msg: "Tarefa não encontrada" });
  });

  it('PUT /tarefas/:id deve atualizar a tarefa e retornar 200', async () => {
    const tarefaAtualizada = { id: idCriado, nome: "Estudar Node e Express", concluida: true };
    const res = await request(server).put(`/tarefas/${idCriado}`).send(tarefaAtualizada);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', idCriado);
  });

  it('PUT /tarefas/1 deve retornar 404 e mensagem de erro', async () => {
    const tarefaInexistente = { id: "1", nome: "Qualquer", concluida: false };
    const res = await request(server).put('/tarefas/1').send(tarefaInexistente);
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ msg: "Tarefa não encontrada" });
  });

  it('DELETE /tarefas/:id deve remover a tarefa e retornar 204', async () => {
    const res = await request(server).delete(`/tarefas/${idCriado}`);
    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({});
  });

  it('DELETE /tarefas/1 deve retornar 404 e mensagem de erro', async () => {
    const res = await request(server).delete('/tarefas/1');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ msg: "Tarefa não encontrada" });
  });

});
