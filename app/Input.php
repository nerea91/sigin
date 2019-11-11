<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Input extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'entry_in', 'entry_out', 'day_id'
    ];

    public function day()
	{
		return $this->belongsToOne('App\Day');
	}
}
