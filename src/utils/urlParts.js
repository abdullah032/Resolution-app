export default function urlParts(url) {
  const urlObj = new URL(`http://localhost:8080${url}`);
  const { pathname } = urlObj;
  const parameter = pathname.split("/")[2];
  const resource = pathname.split("/")[1];
  return { parameter, resource, ...urlObj };
}
