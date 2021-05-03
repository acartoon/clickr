function clickMe() {

    var click = {
        button: $('#button'),
        reset: $('#reset'),
        timerContainer: $('#timer'),
        clicks: 0,
        timer: 5000,
        TIMEOUT: 5000,
        counterContainer: $('#counter'),
        interval: false,
        timeout: false,
        countPlayer: 1,
        text: {
            start: 'CLICK ME',
            end: 'GAME OVER',
            stop: 'STOP'
        },

        getRandomInteger: function(max, min = 1) {
            return Math.round(min - 0.5 + Math.random() * (max - min + 1));
        },

        userName: [
            'Неопозднанный бурундук',
            'Неопозданная мартышка',
            'Неопозданная лягушка',
            'Неопознаный лимур', 'Спящий кот',
            'Медленный пингвин'
        ],
        templateResult: $('<tr><th scope="row"></th> <td></td> <td></td> </tr>'),

        saveResult: function(val) {
            var name = $('#name').val().length ?
                $('#name').val() :
                this.userName[this.getRandomInteger(this.userName.length) - 1];

            var newLine = this.templateResult.clone();
            newLine.find('th').text(this.countPlayer++);
            newLine.find('td').eq(0).text(name);
            newLine.find('td').eq(1).text(val);

            $('table').append(newLine);
        },

        onClick: function() {
            var _this = this;
            var step = 100;
            this.clicks++;
            this.counterContainer.text(_this.clicks);

            if(!this.interval) {
                this.interval = setInterval(function () {
                    _this.timer = _this.timer - step;
                    var val = (_this.timer / 1000).toFixed(2);
                    _this.timerContainer.text(val);
                }, step);
            }

            if(!this.timeout) {

                this.timeout = setTimeout(function () {
                    _this.resetPlay();
                }, _this.TIMEOUT);
            }
        },

        resetPlay: function() {
            var _this = this;
            this.button.off('click');

            if(!!this.interval) {
                clearInterval(this.interval);
                this.interval = false;
            }

            if(!!this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = false;
            }

            this.saveResult(this.clicks);
            this.timerContainer.text(this.text.end);
            this.clicks = 0;
            this.counterContainer.text(this.clicks);
            this.timer = this.TIMEOUT;
            this.button.text(this.text.stop);

            setTimeout(function () {
                _this.button.text(_this.text.start);
                _this.timerContainer.text('0');
                _this.button.on('click', function () {
                    _this.onClick();
                });
            }, _this.TIMEOUT)

        },

        init: function () {
            var _this = this;
            this.button.on('click', function (evt) {
                evt.preventDefault();
                _this.onClick(this);
            });

            this.reset.on('click', function (evt) {
                evt.preventDefault();
                _this.resetPlay();
            });

        }
    }
    return click.init();
}

clickMe();

