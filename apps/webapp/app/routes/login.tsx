import { ActionFunction, Form, LoaderFunction, redirect } from 'remix';
import { authenticator } from '~/services/auth';

export const loader: LoaderFunction = async ({ request }) => {
  let token = await authenticator.isAuthenticated(request);

  if (token && new Date(token.expires_at) > new Date()) {
    return redirect('/');
  }

  return {};
};

export const action: ActionFunction = async ({ request, context }) => {
  return await authenticator.authenticate('form', request, {
    successRedirect: '/',
    failureRedirect: '/login',
    context,
  });
};

export default function Login() {
  return (
    <Form method="post">
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
      </div>
      <button>Login</button>
    </Form>
  );
}
