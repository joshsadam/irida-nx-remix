import { gql } from '@apollo/client';
import { LoaderFunction, useLoaderData } from 'remix';
import client from '~/services/apollo-client';
import { authenticator } from '~/services/auth';
import { IProject } from '@irida/types';
import { formatTimeStamp } from '@irida/utils';

export const ALL_PROJECTS_QUERY = gql`
  query ALL_PROJECTS_QUERY {
    projects {
      id
      name
      createdDate
      modifiedDate
    }
  }
`;

interface GraphqlResponse {
  data: {
    projects: IProject[];
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const token = await authenticator.isAuthenticated(request);
  const response: GraphqlResponse = await client.query({
    query: ALL_PROJECTS_QUERY,
    context: {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  });
  return response.data.projects;
};

export default function Projects() {
  const projects = useLoaderData();
  return (
    <main>
      <h1>PROJECTS</h1>
      <table>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{formatTimeStamp(new Date(project.createdDate), 'en-CA')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
