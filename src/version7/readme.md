# Version 7

- Possibly the most interesting of them all
- Completely dispenses with the idea of a global state
- Idea being, why do we duplicate the data, keeping it in the store and also in the DOM
- Especially when we derive the UI state from the API response anyway
- Why keep transient data in the store which will never be used as a source of reference to generate a new state. Always, the API data will be used to generate the new state and will replace the state in the store. So why keep this duplicated middle man.
- Why even do we have to go through the middle man to update the UI, why not just go direct.

- This attempt thinks about HTMX. The HTML is generated from the API data. Even when an event happens, the UI data is replaced with derived data from the API response never (as is normal) from the existing UI state.
- A bunch of convenient dom query and update functions are available.

- I actually think this is my preferred approach so far.
- I can see it being really easy to progress an application.
- Really easy to unit test also because we inherently push all the logic out of the components.
- The fact that slots can be promoted (valuables should be too) means we can satisfy the primary tenet that is, all components will answer to a mothership.

- An obvious drawback to it of course is that we do loose out on having the app state in an accessible object somewhere. The obvious example being a counter app. We will still need variable to hold the counter value. Updating the counter without updating the UI and vice versa can be a thing.
- Of course this can effortlessly happen in React also where useEffect is used to derive state independent of the wider app state. Also, the state of any given component can be independent and out of sync with the wider state.

- The slot thing also lends itself to server rendering quite well too because we're just generating a string of html. It's an identical process client or server side. Because of the slots the client automatically takes over. I guess we do need some way of populating the store/api-data on the client though.

const todoApiData = [{name: "one"}, {name: "two"}];
bringToClient("todoApiData", todoApiData); //serialize and json'afy it to some element
// a few moments later
populateFromServer("todoApiData", todoApiData);// no need bringToClient should do it
