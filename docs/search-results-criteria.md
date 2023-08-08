# How search result items are generated

## Understand the case and need

The ORS maps client has search suggestion and search results.
While the suggestion recommend results based on the text inputted, the search results show "all" the results with a
maximum of 100 items.
For consistency, items shown as suggestions should be among the results when the user decides to see "all" items,
by hitting `Enter` or by clicking on the search button.
As the results of the `autocomplete` ORS service brings different results, in some cases, when compared to the ORS
`geocode/search`, we are using `geocode/search` for both cases.

In the tests we conducted we noticed that in many cases `geocode/search` does not bring the items in the `venue` layer
(that represents POIs or "things" people search for, like a café, a bakery or a school) among the first items.
It seems this happens because in many cases other layers are prioritized and when we have only 10 slots
(in the case of search suggestion), they just don't appear in many cases.
The `autocomplete` does bring them in many cases, but let's remember that we want to keep the consistence,
that is why we are using the same endpoint/service for both (`geocode/search`).

## The perfect match for everyone

Although in many cases there might be a consensus about what should appear and what should come first on a list of
suggestions when given a text input as well as a focus point, usually different users have different opinions about
the results.
A user that has the map view focused on a city in Germany where there is a bakery named "Berlin" could expect to see
on the top of the list the "Berlin Bakery" while another user in the same city could expect to see on the top of the
list the city of Berlin, even if Berlin, in this fictitious case, is hundreds of kms away.

Similar and more complex cases happen, like someone searches for a street, which has the same name as a city.
In some cases there are several streets with the same name and venues with that name.
Some search returns a kind of pollution with lots of streets, but no venues, while in some cases lots of cities and
no street.
We could go on and depict several cases that might not be the best result.

## The goal of the ORS maps search

The goal is to have, among the suggested items, a mix of cities, addresses, venues, countries and other layers.
At the same time, we want to keep on the top what is considered the best match.
We want to represent on this list what is more important when considering local and global scopes
(a local POI and a city in another country).

## The solution implemented

As the `geocode/search` does not accept a parameter for layer priorities, or the amount of items per layer,
the current implementation creates results by doing three searches:

1. A search for items in the `locality` layer, passing a focus point
1. A search for items in the `county` layer, passing a focus point
1. A search for items in the other layers, except `locality`, `county` and `venue`
1. A search for items in the `venue` layer, that are within the current map view bounds

Having the results of the three searches, the app merges them using the following rules:

- If there are results for `locality` and `county` layers, they will fill 30% of the slots
- If there are results for all the layers except `locality`, `county` they will fill the other available slots

Important: _If some searches do not bring results, the empty slots are filled with extra items from the other searches_

Then the results are ordered by distance (considering the current map center), and some items are moved to certain
positions:

- if the search (1) brought results, its first item is moved to the `second` position
- if the search (2) brought results, the best match (item in position 0) is put on the `top of the list`
- if the search (2) brought results and there is a result that is on the `country` layer,
  it is moved to the third position (if it is not already the best match)

With this solution it seems that we could find a good balance and considering the possibilities and what the API offers
fulfill the expectations of the most of the users.
We do understand that there might be specific cases where the results presented are not the ones expected by the user.
If we identify them, then we will re-evaluate/improve this strategy.

## Comparison with other clients/services

It is important to highlight that we don't capture/user the same data that other commercial apps do to decide what is
the best match for individual users.
Some applications on the market have access to many user-specific data as well as statistics that help them to
determine the best match.
This commercial tools might have access or use data like:

- search history (even outside the maps-client)
- search patterns (people on a certain location, with a certain language defined, in certain time span or season tends
  to find xx results better)
- user location history
- user recent interactions with pages that has some connection with the service provider
- user recent dialogs (captured by a mobile microphone, for example)

The list could easily be extended. These are just some examples.
All this very intrusive and data intense analysis might result in better place search results in some cases, and they
might appear to be perfect for many users.
The services the ORS maps client use have a different approach.
Our goal is to provide the best possible results, considering the few data that the app sends to the service:
current map center/bounds, text inputted and browser language.
