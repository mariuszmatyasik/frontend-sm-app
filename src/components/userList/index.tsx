import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/repository/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  userId?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}
const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
          const userList = await getAllUsers();
          setUsers(userList);
          setLoading(false);
      } catch (err) {
          setError("Failed to load users.");
          setLoading(false);
      }
  };


    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 p-4">
      {users.map((user) => (
        <Card key={user.userId} className="shadow-lg">
          <CardHeader>
          <CardTitle>{user.displayName.split(' ')[0]?.charAt(0).toUpperCase() + user.displayName?.split(' ')[0]?.slice(1)}</CardTitle>
          </CardHeader>
          <CardContent>
                <p>{user.displayName}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};


  export default UsersList;