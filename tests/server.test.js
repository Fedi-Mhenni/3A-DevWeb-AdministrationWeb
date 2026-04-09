const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  it('devrait retourner un message et les routes', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('API opérationnelle');
    expect(res.body.routes).toContain('/api/users');
    expect(res.body.routes).toContain('/health');
  });
});

describe('GET /api/users', () => {
  it('devrait retourner la liste des utilisateurs', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].nom).toBe('Alice');
    expect(res.body[1].nom).toBe('Bob');
  });
});

describe('GET /health', () => {
  it('devrait retourner status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
