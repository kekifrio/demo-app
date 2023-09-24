import { signOut } from "next-auth/react";
type userPageProps = { name: string; email: string; image: string };

function UserPage({ name, email, image }: userPageProps) {
  return (
    <div className="absolute left-1/2 top-20 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-4">
      <img className="w-20 rounded-full" src={image} alt="" />
      <h3> {name}</h3>
      <p>{email}</p>

      <button
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}

export default UserPage;
