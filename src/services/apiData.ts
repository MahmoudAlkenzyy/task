import axios from "axios";

export async function getData() {
  const {
    data,
  }: {
    data: {
      customers: { id: number; name: string }[];
      transactions: { id: number; customer_id: number; date: string; amount: number; name: string | undefined }[];
    };
  } = await axios.get("https://mahmoudalkenzyy.github.io/json-server/data.json");

  return data;
}
