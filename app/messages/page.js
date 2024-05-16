import Messages from "@/components/messages";
import { unstable_noStore } from "next/cache"; // In future it can be noStore only; it is same as dynamic=force-dynamic

// export const revalidate = 5; // This will be same as next revalidate 5 in fetch function
// export const dynamic = "force-dynamic"; // same as cache no-store
// export const dynamic = "force-static"; // same as cache force-cache
// export const dynamic = "auto"; // default one

export default async function MessagesPage() {
  unstable_noStore();
  const response = await fetch(
    "http://localhost:8080/messages"
    // {
    //   // cache: "force-cache", // default, that is always cache
    //   cache: "no-store", //  now data will not be cached
    // }
    // {
    //   next: {
    //     revalidate: 5, // after 5 seconds cache data will get disappear after that new request will be sent
    //   },
    // }
  );
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
