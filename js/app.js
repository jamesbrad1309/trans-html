var app = angular.module('transApp', []);

function strBetween2Word(str, start, end) {
    var arrStr = str.split(start),
        results = [];
    for (var i = 0; i < arrStr.length; i ++) {
        var item = arrStr[i];
        if (arrStr[i].indexOf(end) !== -1) {
            item = item.split(end);
            results.push(item[0]);
        }
    }
    return results;
}

app.controller('transMainController', ["$scope", function ($scope) {
    $scope.input = '';
    $scope.output = '';

    $scope.$watch('input', function (input) {
        var temp = input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>').replace(/\s\s+/g, '<span style="padding: 20px;"></span>');
        var results = strBetween2Word(temp, '&lt;', '&gt;');
        for(var i = 0 ; i < results.length; i++){
            var item = results[i],
                start = '="',
                end = '"';
            var temp_arr = strBetween2Word(item,start,end);
            for(var n  = 0 ; n < temp_arr.length; n ++){
                temp = temp.replace(new RegExp(start + temp_arr[n] + end, "g"), start + '<span class="text-class">'+temp_arr[n]+'</span>' + end);
            }
        }
        $scope.output = temp;
    });
}]);