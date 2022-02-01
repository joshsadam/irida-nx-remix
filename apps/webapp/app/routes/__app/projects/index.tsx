import { gql } from '@apollo/client';
import {
  ActionFunction,
  Form,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix';
import client from '~/services/apollo-client';
import { authenticator } from '~/services/auth';
import { IProject } from '@irida/types';
import { formatTimeStamp } from '@irida/utils';

const ALL_PROJECTS_QUERY = gql`
  query ALL_PROJECTS_QUERY {
    viewer {
      projects {
        id
        name
        createdDate
        modifiedDate
      }
    }
  }
`;

const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUTATION($name: String!) {
    createProject(input: { name: $name }) {
      id
    }
  }
`;

interface GraphqlResponse {
  data: {
    viewer: {
      projects: IProject[];
    };
  };
}

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'IRIDA REMIXED: Projects',
    description: 'Listing of all project that you have access to.',
  };
};

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
  return response.data.viewer.projects;
};

export const action: ActionFunction = async ({ request }) => {
  const token = await authenticator.isAuthenticated(request);
  let formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData);

  const response = await client.mutate({
    mutation: CREATE_PROJECT_MUTATION,
    variables: {
      name: values.name,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  });
  console.log({ response });
  return {};
};

export default function Projects() {
  const projects = useLoaderData<IProject[]>();
  return (
    <main>
      <h1>PROJECTS</h1>
      <table>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{formatTimeStamp(new Date(project.createdDate))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <hr />
      <br />

      <Form method="post">
        <label htmlFor="name">
          Project Name
          <input type="text" name="name" />
        </label>
        <button type="submit" name="_action" value="create">
          Create
        </button>
      </Form>
    </main>
  );
}
