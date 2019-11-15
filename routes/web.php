<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['prefix' => 'api'], function() {
    // all routes that don't need to go to react-router
    Route::get('users', function () {
        return response()->json(['users' => \App\User::all()]);
    })->middleware('auth');

    Route::get('logged', function () {
        return response()->json(['user' => auth()->user()]);
    });

    Route::post('/login', 'Auth\LoginController@login')->middleware('guest')->name('login');
    Route::get('/logout', 'Auth\LoginController@logout')->middleware('auth')->name('logout');
    Route::get('/current', 'EntryController@currentDay')->name('current-day');
    Route::get('/current/log-in', 'EntryController@currentLogIn')->name('current-log-in');
    Route::get('/current/log-out', 'EntryController@currentLogOut')->name('current-log-out');
    Route::get('/history/{days?}', 'EntryController@history')->name('history');
});

Route::get('/{path?}', function () {
    if( !  auth()->user() AND request()->getPathInfo() != '/sigin')
        return redirect('/sigin');
    return view('web')->with('user', auth()->user());
});