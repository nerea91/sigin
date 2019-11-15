<?php

namespace App\Http\Controllers;

use App\Day;
use App\Input;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EntryController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Get current Day
     *
     * @return JSON
     */
    public function currentDay()
    {
        $now = Carbon::now()->toDateString();
        $day = Day::firstOrCreate(['date' => $now]);
        return response()->json(['input' => $day->inputs()->lastOfCurrentUser()->first()]);
    }
  
    /**
     * Log in Hour
     *
     * @return JSON
     */
    public function currentLogIn()
    {
        $now = Carbon::now();
        $day = Day::firstOrCreate(['date' => $now->toDateString()]);
        $input = Input::create(['entry_in' => $now->toDateTimeString(), 'day_id' => $day->getKey(), 'user_id' => auth()->user()->getKey()]);
        return response()->json(['input' => $input]);
    }

    /**
     * Log out Hour
     *
     * @return JSON
     */
    public function currentLogOut()
    {
        $now = Carbon::now();
        $day = Day::where(['date' => $now->toDateString()])->first();

        if($day) {
            $input = $day->inputs()->lastOfCurrentUser()->first();
            $input->entry_out = $now->toDateTimeString();
            $input->save();
            return response()->json(['input' => $input]);
        }
        return response()->json(['error' => 'Not found'], 404);
    }

     /**
     * Log out Hour
     *
     * @return JSON
     */
    public function history($days = 30)
    {
        $to = Carbon::now()->toDateString();
        $since = Carbon::now()->subDays($days);
        
        $daysStored = Day::whereBetween('date', [$since->toDateString(), $to])->whereHas('inputs', function($query){
            return $query->where('user_id', auth()->user()->getKey());
        })->get()->keyBy('date')->toArray();

        $dates = array_keys($daysStored);
        
        for($i = 0; $i <= $days;$i++) {
            $day = $since->toDateString();
            if( ! in_array($day, $dates)) {
                $daysStored[$day] = [ 'id' => $day ,'date' => $day, 'inputs' => [['id' => '', 'entry_in' => '', 'entry_out' => '', 'diff' => '']] ];
            } else {
                foreach($daysStored[$day]['inputs'] as $key => $input)
                    $daysStored[$day]['inputs'][$key]['diff'] = Carbon::parse($input['entry_in'])->diffForHumans($input['entry_out']);
            }
                
            $since->addDay();
        }
        ksort($daysStored);
        return response()->json(['days' => $daysStored]);
    }
}
