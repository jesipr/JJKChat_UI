angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
    function ($http, $log, $scope, $location, $route, $routeParams, $localStorage) {
        var thisCtrl = this;
        this.gID = $routeParams.gID;
        this.pID = $localStorage.pID;

        this.messageList = [];

        this.newText = "";
        this.message = "";
        this.counter = 1000;

        this.loadMessages = function () {
            // Get the list of parts from the servers via REST API

            // First set up the url for the route
            var url = "http://127.0.0.1:5000/JJKChat/group/" + thisCtrl.gID + "/post";

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response) {
                    // The is the sucess function!
                    // Copy the list of parts in the data variable
                    // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.messageList = response.data;

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

            $log.error("Messages Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        this.loadMessages();

        this.postMsg = function () {
            var post = new Object();
            post.pid = thisCtrl.pID;
            post.gid = thisCtrl.gID;
            post.mtext = thisCtrl.newText;
            $http({
                url: 'https://http://127.0.0.1:5000/JJKChat/ChatApp/message',
                dataType: 'json',
                method: 'POST',
                data: post,
                headers: {
                    "Content-Type": "application/json"
                }


            }).then(// success call back
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


            thisCtrl.newText = "";
        };

        this.like = function (mID) {
            var url = "http://127.0.0.1:5000/JJKChat/ChatApp/like/message/" + mID + "/person/" + thisCtrl.pID;

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
        };

        this.dislike = function (mID) {
            var url = "http://127.0.0.1:5000/JJKChat/ChatApp/dislike/message/" + mID + "/person/" + thisCtrl.pID;

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
        };

        this.searchHashtags = function () {
            var url = "http://127.0.0.1:5000/JJKChat/ChatApp/messages/hashtag/" + thisCtrl.search + "/group/" + thisCtrl.gID;

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response) {
                    // The is the sucess function!
                    // Copy the list of parts in the data variable
                    // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.messageList = response.data.Messages;

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

            $log.error("Messages Loaded: ", JSON.stringify(thisCtrl.messageList));

        };
        this.reloadPage = function () {
            $route.reload()

        };
        this.viewReacts = function (mID) {
            $location.url('/reactDetails/' + mID);
        };

        this.replyToMessage = function (mID) {
            $location.url('/replyToMessage/' + mID + "/" + this.gID);
        };
        this.logOut = function () {
            delete $localStorage.pID;
            $location.url('/login');
        }

        this.goToGroups = function () {

            $location.url('/chatGroups');
        }
    }]);
