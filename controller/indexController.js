import { makeApiRequest } from "../utils/iService.js";
const ENDPOINT = "http://localhost:4000/Marvel";

// Obtener todos los personajes de Marvel
export async function getAll() {
  try {
    const response = await makeApiRequest({
      endPoint: ENDPOINT,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error al obtener los personajes de Marvel:", error);
    throw error;
  }
}

// Obtener un personaje de Marvel por ID
export async function getHeroById(id) {
  try {
    const response = await makeApiRequest({
      endPoint: `${ENDPOINT}/${id}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error al obtener el personaje de Marvel por ID:", error);
    throw error;
  }
}

// Crear un nuevo personaje de Marvel
export async function saveTarjet(infTarjet) {
  try {
    const response = await makeApiRequest({
      endPoint: ENDPOINT,
      method: "POST",
      body: infTarjet,
    });
    return response;
  } catch (error) {
    console.error("Error al crear el personaje de Marvel:", error);
    throw error;
  }
}

// Actualizar un personaje de Marvel por ID
export async function actualizarTarjet(id, tarjetData) {
  try {
    const response = await makeApiRequest({
      endPoint: `${ENDPOINT}/${id}`,
      method: "PUT",
      body: tarjetData,
    });
    return response;
  } catch (error) {
    console.error("Error al actualizar el personaje de Marvel:", error);
    throw error;
  }
}

// Eliminar un personaje de Marvel por ID
export async function deleteTarjet(id) {
  try {
    const response = await makeApiRequest({
      endPoint: `${ENDPOINT}/${id}`,
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error("Error al eliminar el personaje de Marvel:", error);
    throw error;
  }
}
