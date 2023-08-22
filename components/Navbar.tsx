// Header.tsx
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";



const Navbar: React.FC = () => {

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div>
      <Link legacyBehavior href="/">
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div >
        <Link legacyBehavior href="/">
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
      </div>
    );

    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  // User NOT logged in
  if (!session) {
    right = (
      <div>
        <Link legacyBehavior href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
      </div>
    );
  }

  //  if user is logged in
  if (session) {
    left = (
      <div>
        <p>Welcome {session.user.name}!</p>
      </div>
    );

    right = (
      <div>
        <Link legacyBehavior href="/">
          <a className="bold" data-active={isActive("/")}>
            Home
          </a>
        </Link>
        <Link
          href="/createMeal"
          style={{ textDecoration: "none", color: "#000" }}
        >
          New Meal
        </Link>
        <Link href="/search" style={{ textDecoration: "none", color: "#000" }}>
          Search Food
        </Link>
        <Link href="/" onClick={() => signOut()}>
          Log Out
        </Link>
      </div>
    );
  }

  return (
    <nav className="w-full">
      {left}
      {right}
    </nav>
  );
};

export default Navbar;
