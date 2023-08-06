import { instance } from "../axios/index.js";

async function getAllCategory() {
    try {
        const response = await instance.get("/categories");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getCategoryDetail(id) {
    try {
        const response = await instance.get(`/categories/${id}`);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createNewCategory(data) {
    try {
        const response = await instance.post("/categories", data)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editCategory(id, data) {
    try {
        const response = await instance.put(`/categories/${id}`, { data });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteCategoryById(id) {
    try {
        const response = await instance.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export {
    getAllCategory,
    getCategoryDetail,
    createNewCategory,
    editCategory,
    deleteCategoryById
}  