import { User } from '../users/entities/user.entity';
import { Drawer } from '../drawers/entities/drawer.entity';
import { Link } from '../links/entities/link.entity';
import { EncryptionService } from '../encryption/encryption.service';
import { AppDataSource } from 'src/data-source';

export async function mockingData() {
  const users = await mockUsers();
  const drawers = await mockDrawers(users);
  const links = await mockLinks(drawers);
}

async function mockUsers(): Promise<User[]> {
  const repo = AppDataSource.getRepository(User);
  await repo.delete({});
  const e = new EncryptionService();
  return [
    await repo.save(await repo.create({ email: 'samy@drawerlink.com', password: await e.hash('yep'), pseudo: 'Samy' })),
    await repo.save(await repo.create({ email: 'caribou@drawerlink.com', password: await e.hash('plop'), pseudo: 'Caribou' }))
  ]
}

async function mockDrawers(users: User[]): Promise<Drawer[]> {
  const repo = AppDataSource.getRepository(Drawer);
  await repo.delete({});
  return [
    await repo.save(await repo.create({ label: 'Politic', user: users[0] })),
    await repo.save(await repo.create({ label: 'Game', description: 'For the games', user: users[0] })),
    await repo.save(await repo.create({ label: 'Science', description: 'I am myself a scientific', user: users[1] }))
  ]
}

async function mockLinks(drawers: Drawer[]): Promise<Link[]> {
  const repo = AppDataSource.getRepository(Link);
  await repo.delete({});
  return [
    await repo.save(await repo.create(
      {
        url: 'https://www.jacobinmag.com/',
        title: 'Jacobin Mag',
        description: 'Links ? Yep',
        drawer: drawers[0],
        user: drawers[0].user,
        tags: ['journal', 'links', 'daily']
      }
    )),
    await repo.save(await repo.create(
      {
        url: 'https://www.politico.eu/',
        title: 'Politico mag',
        description: 'Not realy a socialist mag',
        drawer: drawers[0],
        user: drawers[0].user,
        tags: ['journal'],
      }
    )),
    await repo.save(await repo.create(
      {
        url: 'https://berniesanders.com/',
        title: 'Bernie Sanders',
        description: 'Yep, do you feel the bern ?',
        drawer: drawers[0],
        user: drawers[0].user
      }
    )),
    await repo.save(await repo.create(
      {
        url: 'https://www.victoria3game.com/en',
        title: 'Victoria 3',
        description: 'We are still waiting ... Yep',
        drawer: drawers[1],
        user: drawers[1].user,
        tags: ['paradox']
      }
    )),
    await repo.save(await repo.create(
      {
        url: 'https://www.ipcc.ch/',
        title: 'IPPC',
        description: 'We are all going to die',
        drawer: drawers[2],
        user: drawers[2].user,
        tags: ['climat', 'warning']
      }
    ))
  ]
}