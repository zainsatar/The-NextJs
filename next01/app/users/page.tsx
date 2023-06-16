import type { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Users",
};

import React from "react";

export default async function UserPage() {
  const usersData: Promise<Users[]> = getAllUsers();
  const users = await usersData;

  const content = (
    <section>
      <p>
        <Link href={"/"}> Back to Home</Link>
      </p>
      <br />
      {users.map((user) => {
        return (
          <p key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </p>
        );
      })}
    </section>
  );

  return content;
}
