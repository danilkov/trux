<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
//	protected $table = 'vehicles';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['id', 'type', 'brand', 'description', 'mileage'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
//	protected $hidden = [];

}
