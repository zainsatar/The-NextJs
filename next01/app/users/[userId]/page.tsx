import React from "react";
import { Metadata } from "next";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import getAllUsers from "@/lib/getAllUsers";
import { notFound} from "next/navigation";

type Params = {
  params: {
    userId: string;
  };
};

// To create dynamic metadata of the page
export async function generateMetadata({params:{userId}}:Params):Promise<Metadata>{
  const userData:Promise<User>=getUser(userId);
  const user:User=await userData;
  if(!user){
    return{
      title:"User not found"
    }
  }
  return({
    title:user.name,
    description:`This is the page of ${user.name}`
  })
}

// Fpr SSG (server site generation)
export const generateStaticParams=async()=>{
  const userData:Promise<User[]>=getAllUsers()
  const users= await userData;
  return users.map((user)=>{
    {
      userId:user.id.toString()
    }
  })
}

export default async function User({ params }: Params) {
  const userData: Promise<User> = getUser(params.userId);
  const userPostData: Promise<Post[]> = getUserPosts(params.userId); //Here we are making request to both user and posts in parallel as we have not used 'await' keyword in both requests.
  // const [user,userPosts]=await Promise.all([userData,userPostData]);
  const user = await userData;
  if(!user){
    notFound()
  }
  const content = (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UserPosts promise={userPostData} />
      </Suspense>
    </>
  );
  return content;
}
