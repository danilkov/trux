<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function() {
    return View::make('index');
}); //'HomeController@index'

Route::group(['prefix' => 'api/v1', 'namespace' => 'API'], function() {
    Route::post('/signin', 'AuthController@signin');
    Route::post('/signup', 'AuthController@signup');
    Route::get('/token-refresh', ['middleware' => 'token.refresh']);

    Route::post('/search', 'SearchController@simple');
});

Route::group(['prefix' => 'api/v1', 'namespace' => 'API', 'middleware' => 'token.auth'], function() {
    Route::post('/advancedSearch', 'SearchController@advanced');
});

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
