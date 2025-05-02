import { api } from "./api";
export const changeVisibilitySetting = async (
    visibility:string,
) =>
{
    try {
        const response = await api.put (`user/edit/personal-info`, {visibility});
        return response;
    } catch (error) {
        console.log("error updating visibility settings", error);
        throw(error);
    }
}