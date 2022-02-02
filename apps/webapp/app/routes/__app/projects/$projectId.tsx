import {LoaderFunction, useLoaderData} from "remix";
import {authenticator} from "~/services/auth";

export const loader: LoaderFunction = async ({params, request}) => {
  const token = await authenticator.isAuthenticated(request);
  console.log(params)
  return {id: params.projectId}
};

export default function ProjectPage() {
  const details = useLoaderData();
  return <h1>You made it to project {details.id}</h1>
}
