app.factory("GetMessages",["$resource",function($resource) {
  return $resource(
    "/books/:book_id/messages/:id",
    {book_id: "@book_id",id: "@id"},
    {update: {method: "PATCH"}}
  );
}]);