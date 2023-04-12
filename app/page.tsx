import { redirect } from 'next/navigation';

export default async function HomePage() {
  redirect('/admin');
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
