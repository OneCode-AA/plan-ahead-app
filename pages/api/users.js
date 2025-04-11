import users from '../../data/users';

export default function handler(req, res) {
  const { method, query, body } = req;

  if (method === 'GET') {
    const { username, storeId } = query;

    // Filter by username
    if (username) {
      const user = users.find(u => u.username === username);
      return user
        ? res.status(200).json(user)
        : res.status(404).json({ message: 'User not found' });
    }

    // Filter by storeId
    if (storeId) {
      const filteredUsers = users.filter(user =>
        Array.isArray(user.storeId)
          ? user.storeId.includes(storeId)
          : user.storeId === storeId
      );
      return res.status(200).json(filteredUsers);
    }

    // Return all users if no filters
    return res.status(200).json(users);
  }

  if (method === 'POST') {
    const { username, password } = body;

    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Strip password before returning user
    const { password: pw, ...userData } = user;
    return res.status(200).json(userData);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
