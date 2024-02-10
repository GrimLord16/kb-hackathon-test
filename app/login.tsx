import { Button } from "@/components/ui/button";
import useOneTapSignin from "@/utils/useOneTapSignin";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Login() {
  const { data: session, status, update } = useSession();

  const { isLoading: oneTapIsLoading } = useOneTapSignin({
    redirect: false,
    parentContainerId: 'oneTap',
  });

  // Client side fetch example
  useEffect(() => {
    const res = fetch('http://localhost:5005/bid', {
      method: 'GET',
      credentials: 'include', // Send cookies with jwt token
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json()).then(json =>
      console.log(json)
    )
  }, [])
  return (
    <>
      {/** Google one tap */}
      <div id="oneTap" style={{ position: 'absolute', top: '20px', right: '0' }} />
      {/** Google button tap */}
      <div>
        <Button
          onClick={() => {
            signIn("google");
          }}
        >
          Sign in with Google
        </Button>
        {session && (
          <>
            <p>Signed in as {session.user?.email}</p>
            <Button
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </Button>
          </>
        )
        }
      </div>
    </>
  );
}
