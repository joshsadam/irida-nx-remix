import { MetaFunction } from 'remix';

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'IRIDA REMIXED',
    description: 'Welcome to IRIDA!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div>
      <h1>IRIDA DASHBOARD</h1>
    </div>
  );
}
