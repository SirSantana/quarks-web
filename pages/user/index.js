import Link from "next/link";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export default function UserPage() {
  const { user, logout } = useAuth();

  const handleCloseSesion=()=>{
    logout()
    localStorage.clear()
  }
  console.log(user);
  return (
    <div>
      {user ? (
        <>
        <h2 style={{ color: "black" }}>Ya tienes una sesion iniciada</h2>
        <button onClick={handleCloseSesion}>Cerrar sesion</button>
        </>
      ) : (
        <>
          <h2 style={{ color: "black" }}>User Page</h2>
          <Link href="/user/login">
            <button>Login page</button>
          </Link>
        </>
      )}
    </div>
  );
}
