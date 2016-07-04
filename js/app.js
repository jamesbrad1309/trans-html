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
        // var temp = input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>').replace(/\s\s+/g, '<span style="padding: 20px;"></span>');
        var final_output = '';
        var temp = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        //break small parts
        var parts = temp.split('\n');

        //foreach part calculate the padding
        for (var i = 0; i < parts.length; i++) {
            var item = parts[i];

            //important part
            var count = item.match(/^\s*/)[0].length;

            //color the classname
            var class_start_pos = item.indexOf('class');
            var class_name_start = item.indexOf('"', class_start_pos);
            var class_name_end = item.indexOf('"', class_name_start + 1);

            var class_name = item.substring(class_name_start + 1, class_name_end);
            // console.log("classname of item " + i.toString() + " are : " + class_name);

            var reg_class = new RegExp('"' + class_name + '"', 'g');
            item = item.replace(reg_class, '"<span class="text-class">' + class_name + '</span>"');

            //color the tagname
            var tag_state = item.substring(count + 4, count + 5);
            var tag_name = '';
            if (tag_state === '/') {
                tag_name = item.substring(count + 5, item.indexOf('&gt;', count + 5));
            } else {
                var close_bracket_pos = item.indexOf('&gt;', count + 4);
                var closest_space_pos = item.indexOf(' ', count + 4);
                var target_pos = 0;

                close_bracket_pos < closest_space_pos ? target_pos = close_bracket_pos : target_pos = closest_space_pos;
                tag_name = item.substring(count + 4, target_pos);
            }

            //color opening tag
            var reg_open = new RegExp('&lt;' + tag_name, 'g');
            item = item.replace(reg_open, '&lt;<span class="text-tag">' + tag_name + '</span>');

            //color the close tag
            var reg_close = new RegExp('&lt;/' + tag_name, 'g');
            item = item.replace(reg_close, '&lt;/<span class="text-tag">' + tag_name + '</span>');


            // console.log("item " + i.toString() + " : " + item.toString());

            var _default_padding_amount = 20;
            var _calculate_padding_amount = (count / 4) * _default_padding_amount;
            (_calculate_padding_amount > 0) ? item = '<span style="padding-left:' + _calculate_padding_amount + 'px">' + item.substring(count) + '</span>' : item = item;

            i != parts.length ? final_output = final_output + item + '<br>' : final_output = final_output + item;
            // console.log("padding -line" + (i+1).toString() + " - " + _calculate_padding_amount.toString() + "px");
        }

        $scope.output = final_output;
    });
}]);