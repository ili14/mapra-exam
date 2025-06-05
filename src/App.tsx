import { useCallback, useEffect, useState } from "react";
import "./App.css";
import TabbingView from "./components/features/home/tabbing-view";
import UsersTab from "./components/features/home/tabbing-view/users-tab";
import { UsersContext } from "./contexts/users-context";
import { usersInit } from "./fakedata";
import type { User } from "./types/domain/user.types";
import CreateUserTab from "./components/features/home/tabbing-view/create-user-tab";
import { userApis } from "./lib/api/endpoins";
import { useQuery } from "@tanstack/react-query";

const initTabs = [
  { content: <CreateUserTab />, title: "create user" },
  { content: <UsersTab />, title: "users" },
];

// function createRandomUser(id: number): User {
//   return {
//     id: id,
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     profile: faker.image.avatar(),
//   };
// }

// const usersInit: User[] = Array.from({ length: 500 }, (_, index) => createRandomUser(index + 1));
// console.log(usersInit);

function App() {
  const [users, setUsers] = useState<User[]>(usersInit);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>(() => {
    const saved = localStorage.getItem("selectedUserIds");
    return saved ? JSON.parse(saved) : [];
  });

  const persistSelectedUserIds = useCallback((ids: number[]) => {
    setSelectedUserIds(ids);
    localStorage.setItem("selectedUserIds", JSON.stringify(ids));
  }, []);

  const query = useQuery({
    queryKey: ["users"],
    queryFn: userApis.getAllUsers,
  });

  useEffect(() => {
    setUsers(query.data ?? []);
  }, [query.data]);

  return (
    <>
      <div className="flex justify-center">
        <UsersContext value={{ users, setUsers, selectedUserIds, setSelectedUserIds: persistSelectedUserIds }}>
          <TabbingView tabData={initTabs} />
        </UsersContext>
      </div>
    </>
  );
}

export default App;
