import type { GetAllUsersResponse } from "../../../types/api";
import axiosClient from "../clients/axiosClient";

export async function getAllUsers() {
    const response = await axiosClient.get("users")
    return response.data as GetAllUsersResponse;
}

export async function createGroupUser(users:unknown[]) {
    const response = await axiosClient.post("users", users)
    return response.data ;
}
