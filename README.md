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
- Full route cache is already created & initialized at build time at all pre-rendered pages, those all pages are cached
- If we use dynamic const to change caching then we automatically diable this full route cache
- It is very aggressive in production side

# Routes Cache

- All other 3 caches are managed on server side, RC is managed on client side
- Nextjs stores the RSC payload in memory in the browser
- This ensures extremely fast page transition since no server request is needed

# revalidatePath (rP)

- Used to throw away cache data
- dynamic, revalidate, noStore or using confg on fetch fun all these settings either diables caching or set a certain caching time period.
- rP instead revalidate some piece of cache on demand when we tell nextjs to do it, which is more efficient than disabling cache forever or setting a timeframe for caching.
- Path that we define inside rP, all the data related to that path & route cache related to that path will be deleted
- But the nested paths will not have their data & route cache deleted & revalidated unless we specify the 2nd argument as 'layout', default is 'page'

# revalidatetag (rT)

- It takes a tag as argument
- We assign the tags to requests that fetch data that will be cache
- We can assign multiple tags also to request
- Those tags BTS will be connected to cached data & then if we call rT with certain tag, nextjs will throw away any cached data that has that tag
- This will allow us to clear the cache if those different pages would assign the same tags to their requests
- Instead of calling multiple rP multiple time we can just use one tag on different pages & then just revalidate that tag to clear all cached data of those pages

# cache

- It is imported from react which is wrapped around one of our function for which request deduplication should then occur
- At protects from requets deduplication, request is sent only once to server apart from the fact that reqeuest is requested multiple times

# unstable_cache (in future cache) by next/cache

- It returns a promise
- It is used to cache the response from the data source
- It has 2nd argument: array of cache keys which is used internally to identify cache data
- It does caching aggressively therefore we don't get new data when we update the DB, therefore we have to tell nextjs that the data that is cached did changed
- We can tell this by using rP or we can use rT & add tag to cached data by passing 3rd argument ti this unstabel_cache
- 3rd agrument is confg object which allows us to setup 2 different setting
  - revalidate : with this we can set up time period in secs after which cache will always be revalidated
  - tags: with this we give array of tags, & when we call rT with these tags, then that cached data will be thrown away & new data is again loaded
