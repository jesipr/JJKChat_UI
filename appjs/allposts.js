angular.module('AppChat').controller('AllPostsController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
function ($http, $log, $scope, $location, $route, $routeParams, $localStorage) {
    var thisCtrl = this;
   // this.pID = $localStorage.pID;

    this.postsLists = [];

    this.loadGroups = function () {
        // Get the list of parts from the servers via REST API

        // First set up the url for the route
        var url = "http://127.0.0.1:5000/JJKChat/posts";

        // Now set up the $http object
        // It has two function call backs, one for success and one for error
        $http.get(url).then(// success call back
            function (response) {
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                console.log("response: " + JSON.stringify(response));

                thisCtrl.postsLists = response.data;
                console.log(thisCtrl.postsLists.post_id)
                console.log(thisCtrl.postsLists)

            }, // error callback
            function (response) {
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                if (status == 0) {
                    alert("No hay conexion a Internet");
                }
                else if (status == 401) {
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403) {
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404) {
                    alert("No se encontro la informacion solicitada.");
                }
                else {
                    alert("Error interno del sistema.");
                }
            });

    };



    this.loadGroups();

    this.getReactions = function (pID) {
        // Get the list of parts from the servers via REST API

        // First set up the url for the route
        var url = "http://127.0.0.1:5000/JJKChat/dislikes/"+ pID + "/count";

        // Now set up the $http object
        // It has two function call backs, one for success and one for error
        $http.get(url).then(// success call back
            function (response) {
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                console.log("response: " + JSON.stringify(response));

                thisCtrl.postsLists = response.data;
                console.log(thisCtrl.postsLists.post_id)
                console.log(thisCtrl.postsLists)

            }, // error callback
            function (response) {
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                if (status == 0) {
                    alert("No hay conexion a Internet");
                }
                else if (status == 401) {
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403) {
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404) {
                    alert("No se encontro la informacion solicitada.");
                }
                else {
                    alert("Error interno del sistema.");
                }
            });

    };

    this.enterGroup = function (gID) {
        $location.url('/chat/' + gID);
    }
    this.join = function (gID) {
        var url = "http://127.0.0.1:5000/JJKChat/ChatApp/group/" + gID + "/person/" + thisCtrl.pID;
        
                // Now set up the $http object
                // It has two function call backs, one for success and one for error
                $http.post(url).then(// success call back
                    function (response) {
                        // The is the sucess function!
                        // Copy the list of parts in the data variable
                        // into the list of parts in the controller.
                        console.log("response: " + JSON.stringify(response));
        
                    }, // error callback
                    function (response) {
                        // This is the error function
                        // If we get here, some error occurred.
                        // Verify which was the cause and show an alert.
                        var status = response.status;
                        if (status == 0) {
                            alert("No hay conexion a Internet");
                        }
                        else if (status == 401) {
                            alert("Su sesion expiro. Conectese de nuevo.");
                        }
                        else if (status == 403) {
                            alert("No esta autorizado a usar el sistema.");
                        }
                        else if (status == 404) {
                            alert("No se encontro la informacion solicitada.");
                        }
                        else {
                            alert("Error interno del sistema.");
                        }
        
        
                    }
                );
                $route.reload()
    }

    this.logOut = function () {
        delete $localStorage.pID;
        $location.url('/login');
    }

}]);
