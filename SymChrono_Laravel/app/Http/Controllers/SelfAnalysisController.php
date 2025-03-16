<?php

namespace App\Http\Controllers;

use App\Models\SelfAnalysis;
use App\Http\Requests\StoreSelfAnalysisRequest;
use App\Http\Requests\UpdateSelfAnalysisRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

use function PHPSTORM_META\map;

class SelfAnalysisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data =  SelfAnalysis::all();
        // $date = $data->creation_date;

        return response()->json([
            'date'=>$data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSelfAnalysisRequest $request)
    {
        $reflections = $request->reflectPostData;

        $self_analysis_data = [
            'user_models_id'=>1,
            'emotion'=>$request->emotionPostData,
            'blue'=>$reflections['blue'],
            'green'=>$reflections['green'],
            'orange'=>$reflections['orange'],
            'red'=>$reflections['red'],
            'yellow'=>$reflections['yellow'],
            'expense'=>$request->expensePostData,
            'rating'=>$request->ratingPostData,
        ];

        SelfAnalysis::create($self_analysis_data);
        
        // $data->map(function($data_row) use ($FrontEndDateOnly,&$dateMatch){
        //     Log::info($data_row);
        //     $BackEndDateOnly = Carbon::parse($data_row->creation_date)->format("d-m-Y");
        //     if($BackEndDateOnly === $FrontEndDateOnly){
        //         $dateMatch = true;
        //     };
            
        // });
        return response()->json([
            "data"=>"data added"
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function showByDateAndAuthor($author_id,$startDay,$endDay)
    {
       
        $self_analysis_query = SelfAnalysis::where('user_models_id',$author_id)->whereBetween('creation_date',[$startDay,$endDay]);

        $self_analysis_exist = false;

        $self_analysis_exist = $self_analysis_query->exists();

    
        $self_analysis_data = $self_analysis_query->get()->first();



        if($self_analysis_exist){
            return response()->json($self_analysis_data);
        }else{
            return response()->json(null);
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SelfAnalysis $selfAnalysis)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSelfAnalysisRequest $request, SelfAnalysis $selfAnalysis)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SelfAnalysis $selfAnalysis)
    {
        //
    }
}
