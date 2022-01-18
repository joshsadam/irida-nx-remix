import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
} from 'remix';
import { authenticator } from '~/services/auth';
import { AuthorizationError } from 'remix-auth';

export const loader: LoaderFunction = async ({ request }) => {
  let token = await authenticator.isAuthenticated(request);

  if (token && new Date(token.expires_at) > new Date()) {
    return redirect('/');
  }

  return {};
};

export const action: ActionFunction = async ({ request, context }) => {
  try {
    await authenticator.authenticate('form', request, {
      successRedirect: '/',
      throwOnError: true,
      context,
    });
  } catch (e) {
    if (e instanceof AuthorizationError) {
      return json({ error: true });
    }
    return e;
  }
};

export default function Login() {
  const errors = useActionData();

  return (
    <Form method="post">
      {errors && (
        <div style={{ background: 'red', color: 'white', padding: `10px` }}>
          ❌ You screwed up your login!
        </div>
      )}
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
