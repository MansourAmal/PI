import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/admin/unvalidated-users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const validateUser = (userId) => {
    fetch(`/admin/validate-user/${userId}`, { method: 'PATCH' })
      .then((response) => response.json())
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      });
  };

  return (
    <div>
      <h1>Utilisateurs non validés</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => validateUser(user.id)}>Valider</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
