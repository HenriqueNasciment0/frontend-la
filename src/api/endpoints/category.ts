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
