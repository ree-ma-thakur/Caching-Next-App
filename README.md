## https://nextjs.org/docs/app/building-your-application/caching

![alt text](image.png)

# REQUEST MEMOIZATION (RM)

- Nextjs stores data requests wuth the same confg
- This avoids unncessary duplicate data fetches
- It only happens during 1 request that's being handled on Nextjs server i.e Cache only persists during request duration
- Eg : In page.js & layout.js we have same API but different request headers therefore 2 requests were getting sent, but when we removed the header of both pages then only one request was getting sent as it was having same api & same data therefore because of RM only one request was sent to backend

# Data Cache

- Managed by Nextjs, RM aims to avoid duplicate requests to data source for single request that's handled by Nextjs server
- DC is all about storing & reusing data that has been fetched from data source if it hasn't changed.
- Nextjs stores & reuses fetched data until it's revalidated
- Idea behind this is not to avoid duplicate request but instead to avoid requests altogether unless the data has changed
- This avoids unnecessary requests to data source & speeds up the application
- The cache persists until it's revalidated(manually or after set time)
- Eg : After removing headers of page & layout if we naviagte to another page & come back to message page then no new request is sent to backend this is because of data cache, as it stored the response from fetch function & keep using it always, to get new request everytime we can use revalidatePath after we change some data or we can configure the fetch function using cache setting or next setting (in page.js). This is possible on fetch only as nextjs extends the fetch function
- We can also setup confg using export revalidate const function for a file (page.js) or by using export const dynamic
- We can also use unstable-noStore from next/cache; it disables cache in whole component

# Full Route Cache

- Nextjs stores the entire rendered HTML & RSC at build time
- This avoids unnecessary HTML render cycles & data fetches
- The cache persists until it's revalidated

# Routes Cache

- All other 3 caches are managed on server side, RC is managed on client side
- Nextjs stores the RSC payload in memory in the browser
- This ensures extremely fast page transition since no server request is needed
