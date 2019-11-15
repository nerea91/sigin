<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Input extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'entry_in', 'entry_out', 'day_id', 'user_id'
    ];

    public function day()
	{
		return $this->belongsToOne('App\Day');
    }
    
   public function scopeLastOfCurrentUser($query)
   {
       return $query->where('user_id', auth()->user()->getKey())->orderBy('entry_in', 'desc');
   }

   /**
     * Get entry_in H:i
     *
     * @param  string  $value
     * @return string
     */
    public function getEntryInAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : '';
    }

   /**
     * Get entry_out H:i
     *
     * @param  string  $value
     * @return string
     */
    public function getEntryOutAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : '';
    }
}
