import { signOut } from "next-auth/react";

type userPageProps = { name: string; email: string; image: string };

function UserPage({ name, email, image }: userPageProps) {
  return (
    <div>
      <h3> {name}</h3>
      <p>{email}</p>
      <img src={image} alt="" />
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

export default UserPage;
