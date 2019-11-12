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
}
