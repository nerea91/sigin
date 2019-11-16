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
        //$this->middleware('auth');
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
     * History
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
        $weeks = [];
        
        for($i = 0; $i <= $days;$i++) {
            $day = $since->toDateString();

            if( ! isset($weeks[$since->weekOfYear])) {
                $weeks[$since->weekOfYear] = [];
                $weeks[$since->weekOfYear]['days'] = [];
            }
                

            if( ! in_array($day, $dates)) {
                $dayEntity = Day::create(['date' => $day]);
                $daysStored[$day] = [ 'id' => $dayEntity->getKey() ,'date' => $day, 'inputs' => [['id' => '', 'entry_in' => '', 'entry_out' => '', 'diff' => '', 'diffInSeconds' => 0]] ];
            } else {
                foreach($daysStored[$day]['inputs'] as $key => $input) {
                    $in = Carbon::parse($input['entry_in']);
                    $daysStored[$day]['inputs'][$key]['diffInSeconds'] = $in->diffInSeconds($input['entry_out']);
                    list($hours, $minutes) = $this->getHoursAndMinutesPassedFromSeconds($daysStored[$day]['inputs'][$key]['diffInSeconds']);
                    $daysStored[$day]['inputs'][$key]['diff'] = sprintf('Has trabajado %s horas y %s minutos', $hours, $minutes);
                    
                }
                    
            }

            $daysStored[$day]['isCurrent'] = $day == $to ? true : false;
            $daysStored[$day]['weekDayName'] = Day::WEEKDAYS[$since->weekday()];
            $weeks[$since->weekOfYear]['days'][] = $daysStored[$day];
                
            $since->addDay();
        }

        $this->getHoursInWeeks($weeks);
        
        return response()->json(['weeks' => $weeks]);
    }

    /**
     * Create hour in/out
     *
     * @return JSON
     */
    public function createHour(Request $request)
    {
        $input = $request->all();

        $validatedData = $this->validateData($request);
        if( ! isset($validatedData['entry_in']) OR isset($validatedData['entry_out']))
            return response()->json(['input' => $input ]);
        
        $this->fillData($validatedData);
        $input = Input::create($validatedData);
        return response()->json(['input' => $input ]);
    }

     /**
     * Update hour in/out
     *
     * @return JSON
     */
    public function updateHour($id, Request $request)
    {
        $validatedData = $this->validateData($request);
        $this->fillData($validatedData);
        $input = Input::find($id);
        if( ! $input)
            return response()->json(['input' => $request->all() ]);
        
        $input->fill($validatedData);
        $input->save();
        $in = Carbon::parse($input->entry_in);
        
        list($hours, $minutes) = $this->getHoursAndMinutesPassedFromSeconds($in->diffInSeconds($input->entry_out));
        $input->diff  = sprintf('Has trabajado %s horas y %s minutos', $hours, $minutes);

        return response()->json(['input' => $input ]);
    }

    /**
     * Validate Input
     *
     * @param Request $request
     * @return Array | JsonResponse 
     */
    private function validateData(Request $request)
    {
        return $request->validate([
            'day_id' => 'required|exists:days,id',
            'entry_in' => 'nullable|date_format:"H:i"',
            'entry_out' => 'nullable|date_format:"H:i"',
        ]);    
    }

    /**
     * Fill data
     *
     * @param Request $request
     * @return void
     */
    private function fillData(&$validatedData)
    {
        $validatedData['user_id'] = auth()->user()->getKey();
        $day = Day::find($validatedData['day_id']);
        
        if(isset($validatedData['entry_in']))
            $validatedData['entry_in'] = substr($day->date, 0, 10).' '.$validatedData['entry_in'];
        
        if(isset($validatedData['entry_out']))
            $validatedData['entry_out'] = substr($day->date, 0, 10).' '.$validatedData['entry_out'];
    }

    /**
     * Get hours in week
     *
     * @param [type] $weeks
     * @return void
     */
    private function getHoursInWeeks(&$weeks)
    {
        foreach ($weeks as $key => $data) {
            $totalInSeconds = 0;
            foreach ($data['days'] as $days) {
                foreach ($days['inputs'] as $input) {
                    $totalInSeconds += $input['diffInSeconds'];
                }
            }
            $weeks[$key]['diffInSeconds'] = $totalInSeconds;
            list($hours, $minutes) = $this->getHoursAndMinutesPassedFromSeconds($totalInSeconds);

            $weeks[$key]['diffTotal'] = sprintf('Esta semana has trabajado %s horas y %s minutos', $hours, $minutes);
        }
    }

    /**
     * Get hours and minutes passed from $totalInSeconds
     *
     * @param Int $totalInSeconds
     * @return Array
     */
    private function getHoursAndMinutesPassedFromSeconds($totalInSeconds)
    {
        $totalInMinutes = $totalInSeconds/60;
        $totalInHours = $totalInSeconds/3600;

        $hours = intval($totalInHours);
        $minutes = intval($totalInMinutes - ($hours*60));
        return [$hours, $minutes];
    }
}
