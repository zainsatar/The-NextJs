export default async function getAllUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 60 }, //show the data for 60 seconds and then again makes request to revalidate but we can also do it on page.tsx or layout.tsx level by using:  export const revalidate=60; 
  });

  if (!res.ok) throw new Error("Failed to fetch the users.");
  return res.json();
}
