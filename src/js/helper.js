// // //
// ⏺ helper.js: contains reusable utility functions for common tasks

// IMPORTED FILE ----------✅✅✅
import { TIMEOUT_SEC } from "./config.js";
// ----------⛔️⛔️⛔️

// TIME-OUT FUNCTION ----------✅✅✅
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// ----------⛔️⛔️⛔️

// AJAX (GET/SEND) FUNCTION ----------✅✅✅
export const AJAX = async function (url, uploadData = undefined) {
  try {
    // ⏺ API request
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST", // ⏺ it defines the HTTP method (“POST” / “GET”) for the request
          headers: {
            "Content-Type": "application/json", // ⏺ in the headers, it tells the server that the data being sent is in JSON format
          },
          body: JSON.stringify(uploadData), // ⏺ converts object into a JSON string so it can be sent in the body of the request
        })
      : fetch(url);

    const response = await Promise.race([
      fetchPro,
      timeout(TIMEOUT_SEC), // ⏺ 10 sec er moddhe API req hote hobe
    ]);
    const data = await response.json();
    // console.log(response, data);

    // ⏺ guard clause
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (error) {
    // console.log(error);
    throw error; // ⏺ remember😋?? long-story short we rethrow an error to let another part of the code handle it
  }
};
// ----------⛔️⛔️⛔️
