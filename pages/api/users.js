import { stores as users } from '../../data/stores';

export default function handler(req, res) {
  const { method, query, body } = req;

  if (method === 'GET') {
    const { username, storeId } = query;

    if (username) {
      const user = users.find((u) => u.id === username); // Using `id` as username
      return user
        ? res.status(200).json(user)
        : res.status(404).json({ message: 'User not found' });
    }

    if (storeId) {
      const filteredUsers = users.filter((user) =>
        Array.isArray(user.storeId)
          ? user.storeId.includes(storeId)
          : user.storeId === storeId
      );
      return res.status(200).json(filteredUsers);
    }

    return res.status(200).json(users);
  }

  if (method === 'POST') {
    const { username, password } = body;

    const user = users.find(
      (u) => u.id === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { password: pw, ...userData } = user;
    return res.status(200).json(userData);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
