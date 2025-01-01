import api from "../client";

type Category = {
  name: string;
  price: number;
  description: string;
  workingMinutes: number;
};

export const CreateCategory = async (data: Category) => {
  const response = await api.post("/category", data);
  return response.data;
};

export const GetCategories = async () => {
  const response = await api.get("/category");
  return response.data;
};

export const UpdateCategory = async (id: string, data: Category) => {
  const response = await api.patch(`/category/${id}`, data);
  return response.data;
};

export const DeleteCategory = async (id: string) => {
  const response = await api.delete(`/category/${id}`);
  return response.data;
};
