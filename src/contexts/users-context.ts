import { createContext } from "react";
import type { User } from "../types/domain/user.types";

export interface UserContext {
    users: User[];
    setUsers: (users: User[]) => void;
    
    selectedUserIds: number[];
    setSelectedUserIds: (userIds: number[]) => void;
}

export const UsersContext = createContext<UserContext>({
    users: [],
    setUsers: (users:User[]) => {
        console.log(users);
    },
    selectedUserIds: [],
    setSelectedUserIds(userIds: number[]) {
        console.log(userIds);
    },
})