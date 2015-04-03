<?php namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\User;

use Exception;
use Illuminate\Contracts\Auth\Registrar;
use Illuminate\Database\QueryException;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class AuthController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Registration & Login Controller
	|--------------------------------------------------------------------------
	|
	| This controller handles the registration of new users, as well as the
	| authentication of existing users. By default, this controller uses
	| a simple trait to add these behaviors. Why don't you explore it?
	|
	*/

    public function __construct(Registrar $registrar) {
        $this->registrar = $registrar;
    }

    public function signin(Request $request) {
        $credentials = $request->only('email', 'password');

        try {
            if(!$token = JWTAuth::attempt($credentials)) {
                return response()->json(false, Response::HTTP_UNAUTHORIZED);
            }
        }
        catch(JWTException $e) {
            return response()->json(['error' => 'Cannot create token'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(compact('token'));
    }

    public function signup(Request $request) {
        //$credentials = $request->only('name', 'email', 'password');

        try {
            $validator = $this->registrar->validator($request->all());
                                                                                                                                                   
            if($validator->fails()) {
                return response()->json(['error' => 'validation_error', 'messages' => $validator->messages()], Response::HTTP_BAD_REQUEST);
            }
            
            $user = $this->registrar->create($request->all());
        }
        catch(QueryException $e) { // TODO: log the exception
            return response()->json(['error' => 'internal_error'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        catch(Exception $e) { // TODO: verify it is not a QueryException, log the exception
            return response()->json(['error' => 'user_exists'], Response::HTTP_CONFLICT);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'));
    }
}
