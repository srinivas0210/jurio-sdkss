import { baseUrl } from "../constants";

export function getContacts() {
  return fetch(`${baseUrl}/contacts`).then((response) => response.json());
}
