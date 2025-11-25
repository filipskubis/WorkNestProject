// http://localhost:3000${address}

type fetcherProps = {
  address: string;
  method?: "POST" | "GET" | "PUT" | "DELETE";
  body?: Record<string, any> | null;
};

export default async function fetcher({
  address,
  method = "GET",
  body = null,
}: fetcherProps) {
  const response = await fetch(`http://localhost:3000${address}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
    credentials: "include",
  });
  const data = await response.json();

  if (data?.ok === false) throw data.message;

  return data;
}
