import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import {
  ModuleOptions,
  PasswordTokenConfig,
  ResourceOwnerPassword,
} from 'simple-oauth2';
import { sessionStorage } from './session.server';

const options: ModuleOptions = {
  client: {
    id: String(process.env.CLIENT_ID),
    secret: String(process.env.CLIENT_SECRET),
  },
  auth: {
    tokenHost: String(process.env.IRIDA_URL),
    tokenPath: `/api/oauth/token`,
  },
};

export let authenticator = new Authenticator(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    const username = form.get('username');
    const password = form.get('password');

    const client = new ResourceOwnerPassword(options);

    const tokenConfig: PasswordTokenConfig = {
      username,
      password,
      scope: `read write`,
    };

    const { token } = await client.getToken(tokenConfig);
    return token;
  })
);
