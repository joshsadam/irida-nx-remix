import { MetaFunction, LoaderFunction, Form } from 'remix';
import { useLoaderData, json, Link } from 'remix';

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  return {};
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'IRIDA REMIXED',
    description: 'Welcome to IRIDA!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexDaa>();

  return (
    <div>
      <h1>IRIDA DASHBOARD</h1>
    </div>
  );
}
