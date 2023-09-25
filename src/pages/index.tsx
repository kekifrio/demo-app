import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import UserAuth from "~/components/UserAuth";
import UserCards from "~/components/UserCards";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>El App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {sessionUser ? (
          <>
            <div>
              <UserAuth
                name={sessionUser.name ?? "Not Found"}
                email={sessionUser.email ?? "Not Found"}
                image={sessionUser.image ?? "Not Found"}
              />
            </div>

            <UserCards />
            <button
              className="mt-4 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              type="button"
              onClick={() => router.push("/add")}
            >
              Add User +
            </button>
          </>
        ) : (
          <button
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </main>
    </>
  );
}
