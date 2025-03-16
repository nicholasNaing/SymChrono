<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {

    return "<div className='bg-black text-white px-3 py-2'}>This shouldnt be hello world</div>";
});

Route::get('/server', function () {
    return request()->server('SERVER_SOFTWARE');
});
