import { redirect } from "next/navigation";

export default async function Home() {
  redirect("https://kbh-test.netlify.app/auctions");
}

