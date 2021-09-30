import { baseUrl } from "../Constants";

export function getContacts() {
  return fetch(`${baseUrl}/contacts`).then((response) => response.json());
}
