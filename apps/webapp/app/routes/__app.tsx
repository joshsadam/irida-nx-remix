import { gql } from '@apollo/client';
import {
  Form,
  Link,
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
} from 'remix';
import client from '~/services/apollo-client';
import { authenticator } from '~/services/auth';

export const VIEWER_QUERY = gql`
  query VIEWER_QUERY {
    viewer {
      id
      username
    }
  }
`;

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {
  const token = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!token || new Date(token.expires_at) < new Date()) {
    return redirect('/login');
  }

  const response = await client.query({
    query: VIEWER_QUERY,
    context: {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  });

  return response.data.viewer;
};

export default function AppLayout() {
  const viewer = useLoaderData();
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Link to="/">Dashboard</Link> <Link to="/projects">Projects</Link>
        </div>
        <Form action="/logout" method="post">
          <button>Logout: {viewer.username}</button>
        </Form>
      </div>
      <Outlet />
    </div>
  );
}
