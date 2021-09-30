import { baseUrl } from "../Constants";

export function getOrPostMessages(id: string, requestOptions: any) {
  return fetch(`${baseUrl}/conversations/${id}/messages`, requestOptions).then(
    (response) => response.json()
  );
}

