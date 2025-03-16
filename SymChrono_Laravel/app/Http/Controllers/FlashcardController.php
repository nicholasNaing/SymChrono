<?php

namespace App\Http\Controllers;

use App\Models\Flashcard;
use App\Http\Requests\StoreFlashcardRequest;
use App\Http\Requests\UpdateFlashcardRequest;
use Illuminate\Support\Carbon;

class FlashcardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreFlashcardRequest $request)
    {
        $flashcardPostData = $request->flashcardPostData;

        if(count($flashcardPostData) > 0){

            $timestamp = Carbon::now();

            $flashcard_data = array_map(function($flashcard) use ($timestamp){
                return [
                    'user_models_id'=>1,
                    'subject' => $flashcard['subject'],  // Accessing the 'title' property of each object in $flashCards
                    'content' => $flashcard['content'],  // Accessing the 'content' property of each object in $flashCards
                    'creation_date' => $timestamp,  // Adding consistent timestamp
                    'updated_date' => $timestamp,  // Adding consistent timestamp
                ];
            },$flashcardPostData);
            Flashcard::insert($flashcard_data);
            
            return response()->json([
                "data"=>$flashcard_data
            ]);

        }


        


        // $flashcard_data = [
        //     'user_models_id'=>1,
        //     'subject'=>$request->subject,     
        //     'content'=>$request->content   
        // ];

        // Flashcard::create($flashcard_data);

        // return response()->json([
        //     "data"=>"data has added"
        // ]);
    }

    /**
     * Display the specified resource.
     */
    public function showByDateAndAuthor($author_id,$startDay,$endDay)
    {


        $flashcard_query = Flashcard::where('user_models_id',$author_id)->whereBetween('creation_date',[$startDay,$endDay]);

        $flashcard_exist = false;

        $flashcard_exist = $flashcard_query->exists();

    
        $flashcard_data = $flashcard_query->get();



        if($flashcard_exist){
            return response()->json($flashcard_data);
        }else{
            return response()->json([]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Flashcard $flashcard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFlashcardRequest $request, Flashcard $flashcard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Flashcard $flashcard)
    {
        //
    }
}
