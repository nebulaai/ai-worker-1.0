/* Waypoint for the header menu anmiation */

$('.first_section').waypoint(function () {
    $('header').addClass('bg');
}, { offset: '-20%' });

$('.first_section').waypoint(function () {
    console.log('run');
    $('header').removeClass('bg');
}, { offset: '-10%' });



/* Home page sigup form switch */

$('.ledger h2').click(function () {
    $('.ledger .form-body').removeClass('hide');
    $('.ai .form-body').addClass('hide');
    $('.ai').animate({
        paddingTop: '2rem',
        paddingBottom: '0',
    })
});
$('.ai h2').click(function () {
    $('.ai .form-body').removeClass('hide');
    $('.ledger .form-body').addClass('hide');
    $('.ai').animate({
        paddingTop: '10rem',
        paddingBottom: '3rem',
    })
});


/* Waypoint for home page sections anmiation */

$('body.home .second-section .first-row').waypoint(function () {
    $('body.home .second-section .row').addClass('moveUp');
}, { offset: '60%' });
$('body.home .third-section .second-row').waypoint(function () {
    $('body.home .third-section .row').addClass('moveUp');
}, { offset: '60%' });
$('body.home .fourth-section .row').waypoint(function () {
    $('body.home .fourth-section .row').addClass('moveUp');
}, { offset: '60%' });
$('body.home .fifth-section .row').waypoint(function () {
    $('body.home .fifth-section .row').addClass('moveUp');
}, { offset: '60%' });

/* Home page make the image same height as the text */

let heightSecond = $('.second-section').height();
$('#particles-js').css({ 'height': heightSecond + 'px' });

let heightThird = $('.third-section').height();
$('#particles-js1').css({ 'height': heightThird + 'px' });

let heightFourth = $('.fourth-section').height();
$('#particles-js2').css({ 'height': heightFourth + 'px' });

let heightFifth = $('.fifth-section').height();
$('#particles-js3').css({ 'height': heightFifth + 'px' });




/* AI page toggle icon change */

$('.btn.btn-link').click(function () {
    if ($(this).find('i').hasClass('fa-plus')) {
        $('.btn.btn-link').find('i').removeClass('fa-times');
        // $(this).find('i').removeClass('fa-plus');
        $(this).find('i').addClass('fa-times');
    } else {
        $(this).find('i').addClass('fa-plus');
    }

});

/* AI page side bar menu follow with right side contents */


$('.left.menu>ul').waypoint(function () {
    let width = $(window).width();
    if(width > 980){
        if ($('.left.menu>ul').hasClass('fix')) {
            $('.left.menu>ul').removeClass('fix');
        }
        else {
            $('.left.menu>ul').addClass('fix');
        }
    }
}, { offset: '50%' });

/*AI page side bar menu actived with paired content */
$('#overview').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.overview').addClass('actived');
}, { offset: '0' });

$('#enterprise').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.enterprise').addClass('actived');
}, { offset: '0' });

$('#community').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.community').addClass('actived');
}, { offset: '0' });

$('#tools').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.tools').addClass('actived');
}, { offset: '0' });

$('#fileType').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.fileType').addClass('actived');
}, { offset: '0' });

$('#programmingLanguage').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.programmingLanguage').addClass('actived');
}, { offset: '0' });

$('#executedFile').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.executedFile').addClass('actived');
}, { offset: '0' });

$('#parameterConfiguration').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.parameterConfiguration').addClass('actived');
}, { offset: '0' });

$('#path').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.path').addClass('actived');
}, { offset: '0' });

$('#moduleRequirements').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.moduleRequirements').addClass('actived');
}, { offset: '0' });

$('#suggestTaskDirectory').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.suggestTaskDirectory').addClass('actived');
}, { offset: '0' });

$('#features').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.features').addClass('actived');
}, { offset: '0' });

$('#requirement').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.requirement').addClass('actived');
}, { offset: '0' });

$('#instruction').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.instruction').addClass('actived');
}, { offset: '0' });

$('#benchmark').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.benchmark').addClass('actived');
}, { offset: '0' });

$('#environment').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.environment').addClass('actived');
}, { offset: '0' });

$('#sampleScore').waypoint(function () {
    $('.left.menu>ul li').removeClass('actived');
    $('.left.menu>ul li.sampleScore').addClass('actived');
}, { offset: '0' });

$('.left.menu>ul li').click(function () {
    $('.left.menu>ul li').removeClass('actived');
    $(this).addClass('actived');
});



/* AI page copy button */

// let clipboard = new ClipboardJS('.btn');
// clipboard.on('success', function (e) {
//     console.log(e);

// });
// clipboard.on('error', function (e) {
//     console.log(e);
// });

/* Pricing page form */

let zone = 'mtl01';
let currency = true;
let category = 'micro';
let zones = [
                    {
                        name: 'MTL 01(Montreal)',
                        micro: {
                            gpu: 1,
                            ram: 6,
                            storage: 1,
                            bandwidth: 100,
                            pricing: 0.02
                        },
                        classic: {
                            gpu: 2,
                            ram: 12,
                            storage: 2,
                            bandwidth: 100,
                            pricing: 0.06
                        },
                        premium: {
                            gpu: 1,
                            ram: 24,
                            storage: 4,
                            bandwidth: 400,
                            pricing: 0.15
                        },
                    },
                    {
                        name: 'TRO 01(Toronto)',
                        micro: {
                            gpu: 1,
                            ram: 6,
                            storage: 1,
                            bandwidth: 100,
                            pricing: 0.02
                        },
                        classic: {
                            gpu: 2,
                            ram: 12,
                            storage: 2,
                            bandwidth: 100,
                            pricing: 0.06
                        },
                        premium: {
                            gpu: 1,
                            ram: 24,
                            storage: 4,
                            bandwidth: 400,
                            pricing: 0.15
                        },
                    },
                    {
                        name: 'ESTC 01(Eastern China)',
                        micro: {
                            gpu: 1,
                            ram: 6,
                            storage: 1,
                            bandwidth: 100,
                            pricing: 0.02
                        },
                        classic: {
                            gpu: 2,
                            ram: 12,
                            storage: 2,
                            bandwidth: 100,
                            pricing: 0.06
                        },
                        premium: {
                            gpu: 1,
                            ram: 24,
                            storage: 4,
                            bandwidth: 400,
                            pricing: 0.15
                        },
                    }
                ]    



zones.forEach(element => {
    console.log(element);
    $('#location').append('<option value = "' + element.name + '">' + element.name + '</option>')
});

$('#location').change(function () {
    zone = $(this).val();
    currency = $('#box1').is(":checked");
    fillForm(zone, currency);
});

$('#box1').change(function () {
    zone = $('#location').val();
    currency = $(this).is(":checked");
    console.log(currency);
    fillForm(zone, currency);
});

$('#category').change(function () {
    category = $(this).val();
    if (category == 'micro') {
        $('#calculatorPrice').html($('#price1 .number').html() + '$/h');
    }
    else if (category == 'classic') {
        $('#calculatorPrice').html($('#price2 .number').html() + '$/h');
    }
    else {
        $('#calculatorPrice').html($('#price3 .number').html() + '$/h');
    }
});

$('#hourNumber').change(function () {
    let hour = parseFloat($(this).val());
    let price = 0.02;
    if (category == 'micro') {
        price = parseFloat($('#price1 .number').html());
    }
    else if (category == 'classic') {
        price = parseFloat($('#price2 .number').html());
    }
    else {
        price = parseFloat($('#price3 .number').html());
    }
    let total = hour * price;
    $('#total').html(total + '$');
});



function fillForm(zone, currency) {
    console.log(category);
    let price1, price2, price3;
    zones.forEach(element => {
        if(zone === element.name){
            price1 = element.micro.pricing;
            price2 = element.classic.pricing;
            price3 = element.premium.pricing;
            if (category == 'micro') {
                $('#calculatorPrice').html(element.micro.pricing + '$/h');
            }
            else if (category == 'classic') {
                $('#calculatorPrice').html(element.classic.pricing + '$/h');
                console.log('classic');
            }
            else {
                $('#calculatorPrice').html(element.premium.pricing + '$/h');
            }
        }
    });
    if(!currency){
        $.get('https://api.coinmarketcap.com/v2/ticker/2692/', function(data){
            rate = data.data.quotes.USD.price;
            price1 = (price1 / rate).toFixed(2);
            price2 = (price2 / rate).toFixed(2);
            price3 = (price3 / rate).toFixed(2);
            $('#price1 .number').html(price1);
            $('#price2 .number').html(price2);
            $('#price3 .number').html(price3);
            $('.unit').html('NBAI/h');
        })
    }
    else{
        $('#price1 .number').html(price1);
        $('#price2 .number').html(price2);
        $('#price3 .number').html(price3);
        $('.unit').html('$/h');
    }
}


/* login in */
let url = 'http://192.168.88.14:8080/oauth/token?grant_type=password&scope=read&client_id=client_2&client_secret=123456';
let data = new FormData();
let userName = localStorage.getItem('userName');
let ifAI = false;
console.log(userName);
if(userName){
    $('.userName').val(userName);
}

function login(type) {
    if (type == 'ai') {
        username = $('#aiUserName').val();
        password = $('#aiUserPassword').val();
        ifAI = true;
    }
    else{
        username = $('#ledgerUserName').val();
        password = $('#ledgerUserPassword').val();
    }
    if($("input:checked").val()){
        localStorage.setItem('userName', username)
    }
    data.append('username', username);
    data.append('password', password);
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (data) {
            window.localStorage.setItem('token', data);
            if(ifAI){
                location.href = "dashboard/#/dev/index";
            }
            else{
                location.href = "dashboard/#/ledger/index";
            }
            console.log(data);
        },
        error: function (a, b, c) {
            // debugger
            console.log(a, b, c);

        },
        processData: false,
        contentType: false,
    });
}



let prices = [
    {
        GPU: '1066',
        scores: {
            vgg19: 98.4,
            inception3: 116.5,
            resnet50: 174.3,
        },
        performance: 389.3,
        price: 0,
    },
    {
        GPU: '2 x 1066',
        scores: {
            vgg19: 181.7,
            inception3: 225.3,
            resnet50: 342.3,
        },
        performance: 749.4,
        price: 0,
    },
    {
        GPU: '1070Ti',
        scores: {
            vgg19: 151.6,
            inception3: '181.0',
            resnet50: 257.1,
        },
        performance: 589.6,
        price: 0,
    },
    {
        GPU: '2 x 1070Ti',
        scores: {
            vgg19: 271.7,
            inception3: 345.5,
            resnet50: 500.3,
        },
        performance: 1117.4,
        price: 0,
    },
    {
        GPU: '1080Ti',
        scores: {
            vgg19: 223.4,
            inception3: 249.1,
            resnet50: '378.0',
        },
        performance: 850.5,
        price: 0,
    },
    {
        GPU: '2 x 1080Ti',
        scores: {
            vgg19: 395.4,
            inception3: 488.6,
            resnet50: 747.9,
        },
        performance: '1632.0',
        price: 0,
    },
    {
        GPU: '4 x 1080Ti',
        scores: {
            vgg19: '283.0',
            inception3: '882.0',
            resnet50: '1198.0',
        },
        performance: '2363.0',
        price: 0,
    },
]

prices.forEach(element => {
    console.log(element);
    $('#form').append('<div class="row body"><div class="col-sm-3 text-right box">' + element.GPU + '</div>' +
    '<div class="col-sm-5 text-center"><div class="row"><div class="col-sm-4 box">' + element.scores.vgg19 +
    '</div><div class="col-sm-4 box">' + element.scores.inception3 + '</div><div class="col-sm-4 box">' +
    element.scores.resnet50 + '</div></div></div><div class="col-sm-4 text-center"><div class="row"><div class="col-sm-7 box">' +
    element.performance + '</div><div class="col-sm-5 box">' + '</div></div></div></div>');
});