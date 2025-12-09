import React from 'react'

const users = [
  { id: 1, name: "Alice", age: 25, isActive: true, role: "admin" },
  { id: 2, name: "Bob", age: 17, isActive: false, role: "user" },
  { id: 3, name: "Charlie", age: 30, isActive: true, role: "user" },
  { id: 4, name: "Diana", age: 16, isActive: true, role: "moderator" },
  { id: 5, name: "Eve", age: 22, isActive: false, role: "user" }
];

export default function UserDashboard() {
  const users = [
    { id: 1, name: "Alice", age: 25, isActive: true, role: "admin" },
    { id: 2, name: "Bob", age: 17, isActive: false, role: "user" },
    { id: 3, name: "Charlie", age: 30, isActive: true, role: "user" },
    { id: 4, name: "Diana", age: 16, isActive: true, role: "moderator" },
    { id: 5, name: "Eve", age: 22, isActive: false, role: "user" }
  ];

  return (
    <div className="p-6 space-y-4">
      {users.map((user) => {
        if (user.age < 18) {
          return (
            <div key={user.id} className="bg-red-100 text-red-800 px-4 py-2 rounded-lg border border-red-200">
              👶 {user.name} - Minor
            </div>
          );
        } else if (!user.isActive) {
          return (
            <div key={user.id} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg border border-gray-300">
              💤 {user.name} - Inactive
            </div>
          );
        } else if (user.role === "admin" || user.role === "moderator") {
          return (
            <div key={user.id} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg border border-blue-200">
              ⭐ {user.name} - Staff
            </div>
          );
        } else {
          return (
            <div key={user.id} className="bg-green-100 text-green-800 px-4 py-2 rounded-lg border border-green-200">
              ✓ {user.name} - Active
            </div>
          );
        }
      })}
    </div>
  );
}