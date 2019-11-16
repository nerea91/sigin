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
        
        for($i = 0; $i <= $days;$i++) {
            $day = $since->toDateString();
            if( ! in_array($day, $dates)) {
                $dayEntity = Day::create(['date' => $day]);
                $daysStored[$day] = [ 'id' => $dayEntity->getKey() ,'date' => $day, 'inputs' => [['id' => '', 'entry_in' => '', 'entry_out' => '', 'diff' => '']] ];
            } else {
                foreach($daysStored[$day]['inputs'] as $key => $input) {
                    $daysStored[$day]['inputs'][$key]['diff'] = Carbon::parse($input['entry_in'])->diffForHumans($input['entry_out']);
                }
                    
            }

            $daysStored[$day]['isCurrent'] = $day == $to ? true : false;
                
            $since->addDay();
        }
        ksort($daysStored);
        return response()->json(['days' => $daysStored]);
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
        $input->diff = Carbon::parse($input->entry_in)->diffForHumans($input->entry_out);

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
}
