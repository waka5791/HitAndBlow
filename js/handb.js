(function ($) {
    $.fn.handb = function (options) {
        let TargetNum = 0;
        const checkTableDiv = $('#checkhandb');
        const targetDiv = $('#targetNumber');
        function getTarget() {
            TargetNum = targetDiv.val();
        }
        function hinandblow(num) {
            let _target = TargetNum.split('');
            let _chek = num.split('');
            let _hidxs = [];
            let _bidxs = [];
            let _useidx = [];
            $.each(_target, function (_idxA, _valA) {
                $.each(_chek, function (_idxB, _valB) {
                    if (_valA == _valB && _idxA == _idxB) {
                        _hidxs.push(_idxA);
                    }
                });
            });
            $.each(_hidxs.reverse(), function (i, v) {
                _target.splice(v, 1);
                //_chek.splice(v, 1);
            });
            $.each(_target, function (_idxA, _valA) {
                $.each(_chek, function (_idxB, _valB) {
                    if (_valA == _valB && !_bidxs.includes(_idxB)) {
                        _bidxs.push(_idxB);
                        return false;//9921 2199
                    }
                });
            });
            return [_hidxs.sort(), _bidxs.sort()];
        }
        function pretty(val, array) {
            let _span = $('<span>');
            let _x = '';
            if (array.length > 0) {
                let _p = val.split('');
                $.each(_p, function (i, v) {
                    if (array.includes(i)) {
                        _x += `<b style="font-size:1.1em;">${v}</b>`
                    } else {
                        _x += v;
                    }
                });
            }
            if (array.length > 0) {
                _span.html(`<span style="font-size:1.2em;">${array.length}</span> （${_x}）`);
            } else {
                _span.html(`<span style="font-size:1.2em;">${array.length}</span>`);
            }
            return _span;
        }
        function x(elem) {
            getTarget();
            let _val = elem.val();
            if (_val.length > TargetNum.length) {
                elem.val(_val.slice(0, -1));
                return;
            }
            [_h, _b] = hinandblow(_val);
            _divHit.html(pretty(_val, _h));
            _divBlow.html(pretty(_val, _b));
        }
        function main() {
            let _colMain = 'col-2';
            let _colSub = 'col-3'
            let _divRow = $('<div>').addClass('row');
            let _divA = $('<div>').addClass(_colMain).text('チェック');
            let _divHit = $('<div>').addClass(_colSub).text('ヒット');
            let _divBlow = $('<div>').addClass(_colSub).text('ブロー');
            _divRow.append(_divA);
            _divRow.append(_divHit);
            _divRow.append(_divBlow);
            checkTableDiv.append(_divRow);
            /*
                <div class="col input-group">
                <span class="input-group-text" id="addon-wrapping">設定値</span>
                <input class="form-control" type="text" id="targetNumber" size="5"></input>
                </div>
            */
            for (let _idx = 0; _idx < 100; _idx++) {
                let _divRow = $('<div>').addClass('row');
                let _divA = $('<div>').addClass(_colMain);
                let _inputId = 'input' + _idx;
                let _input = $('<input type="text" size="5">').attr({ id: _inputId });
                _divA.append(_input);
                let _divHit = $('<div>').addClass(_colSub);
                let _divBlow = $('<div>').addClass(_colSub);
                _divRow.append(_divA);
                _divRow.append(_divHit);
                _divRow.append(_divBlow);
                checkTableDiv.append(_divRow);
                $(`#${_inputId}`).on('input', function (e) {
                    getTarget();
                    let _val = $(this).val();
                    if (_val.length > TargetNum.length) {
                        $(this).val(_val.slice(0, -1));
                        return;
                    }
                    [_h, _b] = hinandblow(_val);
                    _divHit.html(pretty(_val, _h));
                    _divBlow.html(pretty(_val, _b));
                });
            }
        }
        main();

    }
})(jQuery);
