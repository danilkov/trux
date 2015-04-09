<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Vehicle;
use Response;

class SearchController extends Controller {

	/**
	 * Return simple search vehicles
	 *
	 * @return Response
	 */
	public function simple() {
        $vehicles = array(
            (new Vehicle())->newInstance(['id' => 0, 'type' => 'Truck', 'brand' => 'Volvo', 'description' => 'Blah1']),
            (new Vehicle())->newInstance(['id' => 1, 'type' => 'Truck', 'brand' => 'Mercedes', 'description' => 'Blah2']),
            (new Vehicle())->newInstance(['id' => 2, 'type' => 'Truck', 'brand' => 'Scania', 'description' => 'Blah3']),
            (new Vehicle())->newInstance(['id' => 3, 'type' => 'Truck', 'brand' => 'MAN', 'description' => 'Blah4']),
            (new Vehicle())->newInstance(['id' => 4, 'type' => 'Truck', 'brand' => 'MAZ', 'description' => 'Blah5']),
            (new Vehicle())->newInstance(['id' => 5, 'type' => 'Truck', 'brand' => 'KaMAZ', 'description' => 'Blah6']),
        );
        return Response::json([
           'vehicles' => $vehicles
        ]);
	}

	/**
	 * Return advanced search vehicles.
	 *
	 * @return Response
	 */
	public function advanced() {
		// TODO: The user needs to be logged in
		// and to have permissions (a payed plan)?
        $vehicles = array(
            (new Vehicle())->newInstance(['id' => 0, 'type' => 'Truck', 'brand' => 'Volvo', 'description' => 'Blah1', 'mileage' => 10000]),
            (new Vehicle())->newInstance(['id' => 1, 'type' => 'Truck', 'brand' => 'Mercedes', 'description' => 'Blah2', 'mileage' => 100000]),
            (new Vehicle())->newInstance(['id' => 2, 'type' => 'Truck', 'brand' => 'Scania', 'description' => 'Blah3', 'mileage' => 1]),
            (new Vehicle())->newInstance(['id' => 3, 'type' => 'Truck', 'brand' => 'MAN', 'description' => 'Blah4', 'mileage' => 1000]),
            (new Vehicle())->newInstance(['id' => 4, 'type' => 'Truck', 'brand' => 'MAZ', 'description' => 'Blah5', 'mileage' => 16000]),
            (new Vehicle())->newInstance(['id' => 5, 'type' => 'Truck', 'brand' => 'KaMAZ', 'description' => 'Blah6', 'mileage' => 25000]),
        );
        return Response::json([
            'vehicles' => $vehicles
        ]);
	}
}
