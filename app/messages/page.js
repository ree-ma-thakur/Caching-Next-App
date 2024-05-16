import Messages from "@/components/messages";

export default async function MessagesPage() {
  const response = await fetch(
    "http://localhost:8080/messages",
    // {
    //   // cache: "force-cache", // default, that is always cache
    //   cache: "no-store", //  now data will not be cached
    // }
    {
      next: {
        revalidate: 5, // after 5 seconds cache data will get disappear after that new request will be sent
      },
    }
  );
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
