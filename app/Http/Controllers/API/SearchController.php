<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Response;

class SearchController extends Controller {

	/**
	 * Return simple search items
	 *
	 * @return Response
	 */
	public function simple() {
		// TODO: The user needs to be authenticated

        return Response::json([
           'items' => 'That should be an array of search items'
        ]);
	}

	/**
	 * Return advanced search items.
	 *
	 * @return Response
	 */
	public function advanced() {
		// TODO: The user needs to be logged in
		// and to have permissions (a payed plan)
        return Response::json([
            'items' => 'That should be an array of advanced search items'
        ]);
	}
}
