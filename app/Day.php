<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
    public const WEEKDAYS = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes','Sábado'];
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'date'
    ];

    protected $with = ['inputs'];

    public function inputs()
	{
		return $this->hasMany('App\Input');
	}

}
