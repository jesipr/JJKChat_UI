angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
    function ($http, $log, $scope, $location, $route, $routeParams, $localStorage) {
        var thisCtrl = this;
        this.gID = $routeParams.gID;
        this.pID = $localStorage.pID;

        this.messageList = [];
        this.membersList = []; //Added by Jesi for viewMembers function
        this.contactsList = [];

        this.newText = "";
        this.newText2 ="";
        this.message = "";

        this.loadMessages = function () {

            var url = "http://127.0.0.1:5000/JJKChat/group/" + thisCtrl.gID + "/detailedpost";


            $http.get(url).then(
                function (response) {

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.messageList = response.data;

                },
                function (response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("Not found");
                    }
                    else {
                        alert("Internal error.");
                    }
                });

         //  $log.error("Messages Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        this.loadMessages();

        // this.postMsg = function () {
        //
        //     //Buscar la manera de crear un json object para guardar
        //     //el contenido de thisCtrl.newText en la parte de texto
        //     //del json que representa un post
        //
        //
        //     var post = new Object();
        //     post.post_id = thisCtrl.pID;
        //     post.media = thisCtrl.gID;
        //     post.message = thisCtrl.newText;
        //     post.first_name = "Jesiniel"
        //     post.last_name = "Nieves"
        //
        //
        //     this.messageList.unshift(post);
        //     // $http({
        //     //     url: 'https://http://127.0.0.1:5000/JJKChat/ChatApp/message',
        //     //     dataType: 'json',
        //     //     method: 'POST',
        //     //     data: post,
        //     //     headers: {
        //     //         "Content-Type": "application/json"
        //     //     }
        //
        //
        //     // }).then(// success call back
        //     //     function (response) {
        //     //         // The is the sucess function!
        //     //         // Copy the list of parts in the data variable
        //     //         // into the list of parts in the controller.
        //
        //     //         console.log("response: " + JSON.stringify(response));
        //
        //     //     }, // error callback
        //     //     function (response) {
        //     //         var status = response.status;
        //     //         if (status === 0) {
        //     //             alert("No internet connection");
        //     //         }
        //     //         else if (status === 401) {
        //     //             alert("Your session expired. Login again");
        //     //         }
        //     //         else if (status === 403) {
        //     //             alert("Not authorized");
        //     //         }
        //     //         else if (status === 404) {
        //     //             alert("Not found");
        //     //         }
        //     //         else {
        //     //             alert("Internal error.");
        //     //         }
        //     //     });
        //     //$route.reload()
        //
        //
        //     thisCtrl.newText = "";
        // };

        this.postMsg = function () {
            var post = new Object();
            post.user_id = thisCtrl.pID;
            //post.gid = thisCtrl.gID;
            post.message = thisCtrl.newText;
            post.media = "This is media"
            $http({
                url: "http://127.0.0.1:5000/JJKChat/group/" + thisCtrl.gID + "/post",
                dataType: 'json',
                method: 'POST',
                data: post,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                function (response) {
                    console.log("User: " + JSON.stringify(response.data));

                },
                function (response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("User not found");
                        loginCtrl.username = ""
                        loginCtrl.password = ""
                    }
                    else {
                        alert("Internal error.");
                    }
                });
            // $route.reload()

        };


        this.like = function (post_id) {
            var data = {};
            data.user_id = thisCtrl.pID;
            data.post_id = post_id;
            console.log("response: " + JSON.stringify(data));
            $http({
                url: "http://127.0.0.1:5000/JJKChat/post/" + post_id + "/likes",
                dataType: 'json',
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }


            }).then(// success call back
                function (response) {
                    // The is the sucess function!
                    // Copy the list of parts in the data variable
                    // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response.data));

                }, // error callback
                function (response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("Not found");
                    }
                    else if (status === 777) {
                            alert("Already reacted to this post");
                    }
                    else {
                        alert("Internal error.");
                    }
                });
            //$route.reload()
        };

        this.dislike = function (post_id) {
            var data = {};
            data.user_id = thisCtrl.pID;
            data.post_id = post_id;
            console.log("response: " + JSON.stringify(data));
            $http({
                url: "http://127.0.0.1:5000/JJKChat/post/" + post_id + "/dislikes",
                dataType: 'json',
                method: 'POST',
                data: JSON.stringify(data),
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
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("Not found");
                    }
                    else if (status === 777) {
                        alert("Already reacted to this post");
                    }
                    else {
                        alert("Internal error.");
                    }
                });
            //$route.reload()
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
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("Not found");
                    }
                    else {
                        alert("Internal error.");
                    }
                });

          //  $log.error("Messages Loaded: ", JSON.stringify(thisCtrl.messageList));

        };
        this.reloadPage = function () {
            $route.reload()

        };

        ///Added by Jesi
        this.viewMembers = function(){
            var url = "http://127.0.0.1:5000/JJKChat/group/" + thisCtrl.gID + "/members";


            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response) {
                    // The is the sucess function!
                    // Copy the list of parts in the data variable
                    // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.membersList = response.data;

                },
                function (response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("Not found");
                    }
                    else {
                        alert("Internal error.");
                    }
                });

         //   $log.error("Messages Loaded: ", JSON.stringify(thisCtrl.membersList));


        };


        this.removeMember = function (user_id) {
            var post = new Object();
            post.user_id = user_id;
            console.log("User: " + JSON.stringify(user_id));
            $http({
                url: "http://127.0.0.1:5000/JJKChat/group/" + thisCtrl.gID + "/members",
                dataType: 'json',
                method: 'DELETE',
                data: post,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                function (response) {
                    console.log("User: " + JSON.stringify(response.data));

                },
                function (response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("User not found");
                        loginCtrl.username = ""
                        loginCtrl.password = ""
                    }
                    else {
                        alert("Internal error.");
                    }
                });
            // $route.reload()

        };

        this.viewReacts = function (mID) {
            $location.url('/reactDetails/' + mID);
        };

        this.replyToMessage = function (post_id) {
            var post = new Object();
            post.user_id = thisCtrl.pID;
            post.reply_message = thisCtrl.newText2;
            $http({
                url: "http://127.0.0.1:5000/JJKChat/post/" + post_id + "/replies",
                dataType: 'json',
                method: 'POST',
                data: post,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                function (response) {
                    console.log("User: " + JSON.stringify(response.data));

                },
                function (response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("User not found");
                        loginCtrl.username = ""
                        loginCtrl.password = ""
                    }
                    else {
                        alert("Internal error.");
                    }
                });
            // $route.reload()

        };
        this.logOut = function () {
            delete $localStorage.pID;
            $location.url('/login');
        }

        this.goToGroups = function () {

            $location.url('/chatGroups');
        }

        this.loadContacts = function () {

            var url = "http://127.0.0.1:5000/JJKChat/user/" + thisCtrl.pID + "/contact";


            $http.get(url).then(
                function (response) {


                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.contactsList = response.data;
                    console.log(thisCtrl.contactsList)

                },
                function (response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("Not found");
                    }
                    else {
                        alert("Internal error.");
                    }
                });

        };

        this.addMember = function (user_id) {
            var post = new Object();
            post.user_id = user_id;
            console.log("User: " + JSON.stringify(user_id));
            $http({
                url: "http://127.0.0.1:5000/JJKChat/group/" + thisCtrl.gID + "/members",
                dataType: 'json',
                method: 'POST',
                data: post,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                function (response) {
                    console.log("User: " + JSON.stringify(response.data));

                },
                function (response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("User not found");
                        loginCtrl.username = ""
                        loginCtrl.password = ""
                    }
                    else {
                        alert("Internal error.");
                    }
                });
            // $route.reload()

        };

        this.loadContacts();

        //Run this.viewMembers
        this.viewMembers();


    }]);
