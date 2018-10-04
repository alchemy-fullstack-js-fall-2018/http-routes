HTTP Routes
======

Create an HTTP server that exposes a REST API for a resource

Choose a resource (pets, todos, rock-bands, plants, whatever).

## Models

Create an object to store and fetch your models.

## Routes

### <resource>

Implement the following routes in `routes/<resources>.js`:

method | path
---|---
`GET` |     `/<resources>`
`GET` |     `/<resources>/:id`
`POST` |    `/<resources>`
`PUT` |     `/<resources>/:id`
`DELETE` |  `/<resources>/:id`

(NOTE: plural resource name)

Export a single `(req, res) => { /*...*/ }` function.

That function delegates to a dictionary or `Map` by method.

### Not Found (404)

Implement a module for returning not found expections that exports a `(req, res) => { /*...*/ }` function.

It should return 404 plus any custom page you want to show.

## App

1. Create a dictionary or `Map` with the plural resource name that contains the function from `routes`.
1. During request, check the path and match the resource to the dictionary.
1. If no match, use `404` handler

## Testing

* E2E test basic crud operations

## Rubric

* Models Setup: `2pts`
* Routes: `2pts`
* 404 Handler: `1pt`
* App: `2pts`
* Tests: `2pts`
* Clean Project Organization: `1pt`



1. Hello World sanity test.
2. Save something (and test that it got added/saved...does it have an id)
3. 'POST' 
    a. Move Save to a beforeEach
    b. Store returned object
    c. Check Save it to just test id
4. 'GET' test - retrieve by id and check that it matches saved
5. 'PUT' test - change a prop of saved and confirm that it matches saved.
6. 'DELETE' 
    a. Test Delete works
    b. GET delete to see if 404 works. 
7. 404 on id, resource, method
8. GET List
    a. Save a bunch of stuff
    b. GET then deepEqual
