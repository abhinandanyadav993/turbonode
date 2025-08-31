'use client';

import { useEffect, useState } from 'react';
import type { IUser } from '@mhs/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((r) => r.json())
      .then((data) => setUsers(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users yet. Try POSTing to <code>{API_URL}/users</code> with a JSON body.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              {u.firstName} {u.lastName} — {u.email}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
