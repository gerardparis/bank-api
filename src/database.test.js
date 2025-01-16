const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create person', async () => {
    expect.assertions(1);
    const person = await db.Person.create({
        id: 1,
        name: 'Pedro Lema',
        email: 'pedro.lema@gmail.com'
    });
    expect(person.id).toEqual(1);
});

test('get person', async () => {
    expect.assertions(2);
    const person = await db.Person.findByPk(1);
    expect(person.name).toEqual('Pedro Lema');
    expect(person.email).toEqual('pedro.lema@gmail.com');
});

afterAll(async () => {
    await db.sequelize.close();
});