<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Get all Users in database: URI define
Route::get('users', 'UserController@getAllUsers');

//Get user by id: URI define
Route::get('user/{id}', 'UserController@getUserById');

//Get user by id: URI define
Route::get('user/connexion/{email}/{password}', 'UserController@getUserByEmailAndPassword');

//Create a user in dadabase: URI define
Route::post('user', 'UserController@createUser');

//Update a user in database: URI define
Route::put('user/{id}', 'UserController@updateUser');

//Delete a user in database: URI define
Route::delete('user/{id}', 'UserController@deleteUser');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
