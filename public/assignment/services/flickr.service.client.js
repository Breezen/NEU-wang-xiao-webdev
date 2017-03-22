(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);
    
    function FlickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var key = "4096313746442bee54fc7b8a5872b189";
            var secret = "308b1aa4f0a290cc";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();