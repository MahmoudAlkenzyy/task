import axios from "axios";

export async function getData() {
  const { data } = await axios.get("https://mahmoudalkenzyy.github.io/json-server/data.json");

  console.log(data);

  return data;
}
