import { getAllUsers, createUser } from '../../src/helpers'

describe('Api requests', () => {
  test('Must return an user array or empty array', async () => {
    const users = await getAllUsers();
    expect(users.length).toBeGreaterThanOrEqual(0);
  });

  test('Must create an user and must faild if user email is already created', async () => {
    const user = {
      email: 'testEmailUno@gmail.com',
      password: 'testPassword',
      user_name: 'testUserName',
      nick_name: 'testNickName',
      profile_image: ''
    }
    const response = await createUser(user)
    expect(response).toBeTruthy()
  });
});
