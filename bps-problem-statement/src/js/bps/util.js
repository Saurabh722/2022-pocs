var util = {
    inputFormat: function(date) {
        var d = util.formatDate(date).split('/');
        return `${d[2]}-${d[1]}-${d[0]}`;
    },
    dayId: function(updates) {
        var d = new Date();

        if(updates) {
            var ordered = util.getReverseOrdered(updates);
            var key = Object.keys(ordered)[0];
            console.log(key);

            if(key) {
                var newD = new Date(parseInt(key));
                if (d.getDate() == newD.getDate() && d.getMonth() == newD.getMonth() && d.getFullYear() == newD.getFullYear()) {
                    return key;
                }
            }
        }
        return `${d.getTime()}`;
    },
    getReverseOrdered: function(unordered) {
        let ordered = {};
        if (unordered) {
            Object.keys(unordered).sort().reverse().forEach(function(key) {
                ordered[key] = unordered[key];
            });
        }
        return ordered;
    },
    formatDate: function(date) {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    },
    hideDetails: function($view) {
        $view.find('.title-view').slideDown();
        $view.find('.detail-view').slideUp();
        $view.removeClass('selected');
    },
    showDetails: function($view) {
        $view.addClass('selected');
        $view.find('.title-view').slideUp();
        $view.find('.detail-view').slideDown();
    }
}

export { util };