import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Page</h1>
      <Link href={'/about'}>Goto About page</Link>
      <br />
      <Link href={'/users'}>Goto Users page</Link>
    </main>
  )
}
