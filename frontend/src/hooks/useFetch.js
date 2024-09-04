import { useEffect, useState } from "react";
import { getCsrfToken } from "../utils/auth";

export default function useFetch(method, url, body) {
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [data, setData] = useState();

  async function handleResponse(response) {
    const responseData = await response.json();
    if (!response.ok) {
      setError(responseData.message || "An error occured.");
    } else {
      setMessage(responseData.message);
      setError("");
      setData(responseData);
    }
  }

  async function fetchUrl() {
    if (method === "POST") {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: body,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
      });
      handleResponse(response);
    } else if (method === "GET") {
      const response = await fetch(url);
      handleResponse(response);
    }
  }

  return [error, message, data, fetchUrl];
}

//   useEffect(() => {
//     async function fetchUrl() {
//   if (method === "POST") {
//     const response = await fetch(url, {
//       method: "POST",
//       credentials: "include",
//       body: body,
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRFToken": getCsrfToken(),
//       },
//     });
//     handleResponse(response);
//   } else if (method === "GET") {
//     const response = await fetch(url);
//     handleResponse(response);
//   }
// }

//     fetchUrl();
//   }, [setError, setMessage, setData, method, url, body]);

// return [error, message, data];
// }
