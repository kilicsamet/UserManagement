
import { axiosApi } from "./configs/axiosConfigs"
import { defineCancelApiObject } from "./configs/axiosUtils"
export const UserAPI = {
    get: async function (id, cancel = false) {
        const response = await axiosApi.request({
            url: "users/" + id ,
            method: "GET",
            // Özellik adını kullanarak sinyal değerinin alınması
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },
    getAll: async function (params, cancel = false) {
        try {
            const response = await axiosApi.request({
            url: "users",
                method: "GET",
                params: params,
                signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
            })
          
            return response.data;

        } catch (error) {
            console.error('Error fetching all Users:', error);
            throw error;
        }
      
    },

create: async function (user, cancel = false) {
    try {
        const response = await axiosApi.request({
            url: "users/save/",
            method: "POST",
            data: user,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        });
        return response.data;
    } catch (error) {
        return error.response?.data;
    }
},
patch: async function (id, user, cancel = false) {
    try {
        const response = await axiosApi.request({
            url: "users/update/" + id ,
            method: "PATCH",
            data: user,
            signal: cancel ? cancelApiObject[this.patch.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    } catch (error) {
        return error.response?.data;
    }

},
delete: async function (id, cancel = false) {
    await axiosApi.request({
        url: "users/delete/" + id ,
        method: "DELETE",
        signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })
}

}
const cancelApiObject = defineCancelApiObject(UserAPI)