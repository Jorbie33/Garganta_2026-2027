import { useState } from "react";

export default function Card({ user, setUsers, users }) {
  const [isUpdate, setUpdate] = useState(false);

  function handleDelete() {
    setUsers(
      users.filter((currentUser) => currentUser.username !== user.username),
    );
  }

  function handleUpdateToggle() {
    setUpdate(!isUpdate);
  }

  function handleInputUpdateChange(e) {
    const { value } = e.target;

    const updatedUsers = users.map((currentUser) => {
      if (currentUser.username === user.username) {
        return { ...currentUser, username: value };
      }
      return currentUser;
    });

    setUsers(updatedUsers);
  }

  return (
    <div className="border rounded-md p-4">
      <p>
        Username:{" "}
        {isUpdate ? (
          <input
            name="username"
            value={user.username}
            onChange={handleInputUpdateChange}
            className="border text-white px-1"
          />
        ) : (
          user?.username || "Username"
        )}
      </p>
      <p>Age: {user?.age || "Age"}</p>

      <button
        onClick={handleUpdateToggle}
        className="bg-green-800 text-white px-2 py-1 mr-2 rounded"
      >
        {isUpdate ? "Done" : "Edit"}
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-800 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}

