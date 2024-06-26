/**
 * Retrieves user data from a JSON file located at "../../utils/users.json".
 * Optionally filters the data based on the provided designation filter.
 * @param {string} [filter] - Optional designation filter to apply to the data.
 * @returns {Promise<Array<Object>>} - A Promise that resolves with an array of user objects.
 * @throws {Error} - If the network response is not successful or an error occurs during processing.
 */

export default async function getData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not successful");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Something went wrong:", error);
    throw error; // Re-throw the error if necessary
  }
}
