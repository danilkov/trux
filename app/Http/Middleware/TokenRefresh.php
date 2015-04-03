<?php namespace App\Http\Middleware;

//use Exception;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\JWTAuth;


class TokenRefresh {

    private $auth;

	public function __construct(JWTAuth $auth) {
        $this->auth = $auth;
	}

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return mixed
	 */
	public function handle($request) {
        try {
            if(!$token = $this->auth->setRequest($request)->getToken()) {
                return response()->json(['error' => 'token_not_provided'], Response::HTTP_BAD_REQUEST);
            }
            $newToken = $this->auth->refresh($token);
        }
        catch(TokenExpiredException $e) {
            return response()->json(['error' => 'token_expired'], Response::HTTP_UNAUTHORIZED);
        }
        catch(JWTException $e) {
            return response()->json(['error' => 'token_invalid'], Response::HTTP_UNAUTHORIZED);
        }
//        catch(Exception $e) { // TODO: log the exception
//            return response()->json(['error' => 'internal_error'], Response::HTTP_INTERNAL_SERVER_ERROR);
//        }

        return response()->json(compact('newToken'));
	}
}
