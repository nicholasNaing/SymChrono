<?php

namespace App\Http\Controllers;

use App\Models\DiaryModel;
use App\Http\Requests\StoreDiaryModelRequest;
use App\Http\Requests\UpdateDiaryModelRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class DiaryModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Log::info("This should work");
        return "hello world. This is the get method";
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
    public function store(StoreDiaryModelRequest $request)
    {

        $diary_data = [
            'user_models_id'=>1,
            'morning'=>$request->morning,
            'afternoon'=>$request->afternoon,
            'evening'=>$request->evening
        ];

        DiaryModel::create($diary_data);

        return response()->json([
            "data"=>"data has added"
        ]);
    }
 
    /**
     * Display the specified resource.
     */
    public function showByDateAndAuthor($author_id,$startDay,$endDay)
    {

        $diary_data_query = DiaryModel::where('user_models_id',$author_id)->whereBetween('creation_date',[$startDay,$endDay]);

        $diary_exist = false;

        $diary_exist = $diary_data_query->exists();

    
        $diary_data = $diary_data_query->get()->first();


        //!below should be here as a memoir to remember how dangerous it is to mess with TZ
        //this code just use whereDate to check only the date part which got a huge flaw
        //the data are stored in utc format which are different from local time zone format and at this point yk where it goes wrong
        

        // $selected_date = DiaryModel::where('user_models_id', $author_id)
        // ->whereDate('creation_date', $date); // This checks only the date part

        // $dateMatch = $selected_date->exists();

        // $selected_diary = $selected_date->get();

        if($diary_exist){
            return response()->json($diary_data);
        }else{
            return response()->json(null);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DiaryModel $diaryModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDiaryModelRequest $request, DiaryModel $diaryModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DiaryModel $diaryModel)
    {
        //
    }
}
