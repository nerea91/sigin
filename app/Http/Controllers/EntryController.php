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
        return response()->json(['day' => $day]);
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
        $day->inputs()->create(['entry_in' => $now->toDateTimeString(), 'input_id' => $day->getKey()]);
        $day->load('inputs');
        return response()->json(['day' => $day]);
    }
}
