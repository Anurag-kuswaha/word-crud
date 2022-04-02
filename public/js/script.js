
function addOrUpdateWord() {
    console.log('up and running');
    // do ajax call
    $('.wordForm').on('submit', function (e) {
        console.log('hits the ajax');
        e.preventDefault();
        //do ajax call and respond according to the backend result;
        var form = $(this);
        var url = form.attr('action');
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: form.serialize(),
            success: function (data) {
                console.log(data);
                var toastHtml = '';
                if (data.success) {
                    toastHtml = `<p class="success"> ${data.message} </p> `;
                    //setTimeout( function (){location.href= '/';},2500);
                } else {
                    toastHtml = `<p class="failure"> ${data.message} </p> `;
                }
                if (data.data) {
                    let newListHtml = data.data.map(element => {
                        return `<div class="word"> ${element.word}  <span class="cross"> </span></div>`;
                    });
                    console.log(newListHtml);
                    $('.wordResult').empty().append(newListHtml);
                }
                $('.toastInfo').empty().append(toastHtml);
                setTimeout(function () { $('.toastInfo').empty(); }, 2500);
            },
            error: function (data) {
                console.log('error');
                var toastHtml = '';
                toastHtml = `<p class="failure"> ${data.message} </p> `;
                $('.toastInfo').empty().append(toastHtml);
                setTimeout(function () { $('.toastInfo').empty(); }, 2500);
            }
        });
    })
}
function deleteWord() {

    $(".wordResult span").on('click', function (e) {
        console.log(this);
        e.preventDefault();
        //do ajax call and respond according to the backend result;
        var form = { 'word': $(this).parent().text().trim() };
        var url = $('.wordResult').attr('href');
        console.log(url);
        console.log($(this).parent().text());
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: form,
            success: function (data) {
                console.log(data);
                var toastHtml = '';
                if (data.success) {
                    toastHtml = `<p class="success"> ${data.message} </p> `;
                    //setTimeout( function (){location.href= '/';},2500);
                } else {
                    toastHtml = `<p class="failure"> ${data.message} </p> `;
                }
                if (data.data) {
                    let newListHtml = data.data.map(element => {
                        return `<div class="word"> ${element.word}<span class="cross"> </span> </div>`;
                    });
                    console.log(newListHtml);
                    $('.wordResult').empty().append(newListHtml);
                }
                $('.toastInfo').empty().append(toastHtml);
                setTimeout(function () { $('.toastInfo').empty(); }, 2500);
            },
            error: function (data) {
                console.log('error');
                var toastHtml = '';
                toastHtml = `<p class="failure"> ${data.message} </p> `;
                $('.toastInfo').empty().append(toastHtml);
                setTimeout(function () { $('.toastInfo').empty(); }, 2500);
            }
        });
    })
}
addOrUpdateWord();
deleteWord();
$(document).ajaxComplete(function () {
    deleteWord();
});
