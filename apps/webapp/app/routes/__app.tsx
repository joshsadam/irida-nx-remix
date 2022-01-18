import {Form, LoaderFunction, Outlet, redirect} from 'remix';
import {authenticator} from '~/services/auth';

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {
  console.log('__app LoaderFunction');
  const token = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!token || new Date(token.expires_at) < new Date()) {
    return redirect('/login');
  }

  return {};
};

export default function AppLayout() {
  return (
    <div>
      <Form action="/logout" method="post">
        <button>Logout</button>
      </Form>
      <Outlet />
    </div>
  );
}
