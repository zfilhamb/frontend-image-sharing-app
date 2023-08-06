import { instance } from "../axios/index.js";
import Swal from "sweetalert2";


async function getAllPhoto(category_id) {
    try {
        let path = "/photos"
        if(category_id) {
            path += `?category_id=${category_id}`
        }
        const response = await instance.get(path);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getPhotoDetail(id) {
    try {
        const response = await instance.get(`/photos/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong")
    }
}

async function createNewPhoto(data) {
    try {
        const response = await instance.post("/photos", data, {
            headers: { "Content-Type": "multipart/form-data" }
          });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deletePhotoById(id) {
    try {
        const response = await instance.delete(`/photos/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editPhoto(id, data) {
    try {
        const response = await instance.put(`/photos/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
          });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message || "Something went wrong"
          });
    }
}

export {
    getAllPhoto,
    createNewPhoto,
    deletePhotoById,
    editPhoto,
    getPhotoDetail
}