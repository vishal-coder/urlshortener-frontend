export async function createShortCode(values, username) {
  values.username = username;
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.REACT_APP_API}/shortner/createShortCode`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();
  return data;
}
