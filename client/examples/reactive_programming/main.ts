import * as Rx from 'rxjs';
import * as $ from 'jquery';

//requestStream.subscribe(function(requestUrl) {
//
//    // execute the request
//    var responseStream = Rx.Observable.create(function (observer) {
//        jQuery.getJSON(requestUrl)
//            .done(function (response) {
//                observer.onNext(response);
//            })
//            .fail(function (jqXHR, status, error) {
//                observer.onError(error);
//            })
//            .always(function () {
//                observer.onCompleted();
//            });
//    });
//
//    responseStream.subscribe(function(response) {
//        // do something with the response
//    });
//});
$(document).ready(function () {
    $('main-app').html(`
        <div class="ui container">
            <button class="refresh">Refresh</button>
            <ul>
                <li><button class="close1">Close 1</button></li>
            </ul>
        </div>
    `);

    //var requestStream = Rx.Observable.of('https://api.github.com/users');

    var refreshButton = document.querySelector('.refresh');
    var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

    var close1Button = document.querySelector('.close1');
    var close1ClickStream = Rx.Observable.fromEvent(close1Button, 'click');

    var requestStream = refreshClickStream
        .startWith('startup click')
        .merge(close1ClickStream)
        .map(function() {
            var randomOffset = Math.floor(Math.random()*500);
            return 'https://api.github.com/users?since=' + randomOffset;
        });

    //var responseMetastream = requestStream
    //    .map(function (requestUrl) {
    //        var jqueryPromise:any = $.getJSON(requestUrl);
    //        return Rx.Observable.fromPromise(jqueryPromise);
    //    });
    //
    //
    //responseMetastream.subscribe((response) => {
    //    console.log(response);
    //})
    //
    //responseStream.subscribe((json) => {
    //    console.log(json);
    //});

    var responseStream = requestStream
        .flatMap(function (requestUrl) {
            return Rx.Observable.fromPromise($.getJSON(requestUrl) as any);
        });

    var suggestion1Stream = close1ClickStream
        .startWith('startup click')
        .combineLatest(responseStream,
            function(click, listUsers:any[]) {
                return listUsers[Math.floor(Math.random()*listUsers.length)];
            }
        )
        .merge(
            refreshClickStream.map(function(){ return null; })
        )
        .startWith(null);

    suggestion1Stream.subscribe(function(suggestion) {
        console.log(suggestion);
        if (suggestion === null) {
            // hide the first suggestion DOM element
        }
        else {
            // show the first suggestion DOM element
            // and render the data
        }
    });

});