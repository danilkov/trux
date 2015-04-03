<?php namespace App\Http\Middleware;

use App;
use Closure;
//use Exception;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Http\Request;


class TokenAuthenticate {

    private $auth;

	public function __construct(JWTAuth $auth) {
        $this->auth = $auth;
	}

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle(Request $request, Closure $next) {
        try {
            if(!$token = $this->auth->setRequest($request)->getToken()) {
                return response()->json(['error' => 'token_not_provided'], Response::HTTP_BAD_REQUEST);
            }
            $user = $this->auth->toUser($token);
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

        if(!$user) {
            return response()->json(['error' => 'user_not_found'], Response::HTTP_NOT_FOUND);
        }

        // TODO: add permission check here
        $permission = $request->route()->getAction();//['permission'];
        /*if($user doesnthave $permission) {
            return response()->json(['error' => 'forbidden'], 403);
        }*/

        $request->merge(['token.auth.user' => $user]);
        return $next($request);
	}
}
