import { baseUrl } from "../constants";

export function getOrPostConversations(requestOptions: any) {
  return fetch(`${baseUrl}/conversations`,requestOptions).then((response) => response.json());
}
