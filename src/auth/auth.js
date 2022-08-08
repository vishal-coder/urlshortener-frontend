export async function handleLogin(values) {
  const response = await fetch(`${process.env.REACT_APP_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  return data;
}

export async function submitRegistration(values) {
  const response = await fetch(`${process.env.REACT_APP_API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  return data;
}

export async function handleforgotpassword(values) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  return data;
}

export async function handleresetpassword(values, id, token) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/auth/resetPassword?id=${id}&token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  return data;
}
