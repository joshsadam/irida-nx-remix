import { ActionFunction, Form, LoaderFunction, redirect } from 'remix';
import { authenticator } from '~/services/auth';

export const loader: LoaderFunction = async ({ request }) => {
  let token = await authenticator.isAuthenticated(request);

  // Check token
  if (token) return redirect('/');
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
        <label>Email</label>
        <input type="text" name="username" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" required />
      </div>
      <button>Login</button>
    </Form>
  );
}
