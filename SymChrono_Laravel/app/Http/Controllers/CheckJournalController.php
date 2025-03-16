<?php

namespace App\Http\Controllers;

use App\Models\CheckJournal;
use App\Http\Requests\StoreCheckJournalRequest;
use App\Http\Requests\UpdateCheckJournalRequest;

class CheckJournalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = CheckJournal::all();
        return response()->json([
            "data"=>$data
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
    public function store(StoreCheckJournalRequest $request)
    {
        $journal_data = [
            'user_models_id'=>1,
            'current_month'=>$request->currentMonth,
            'calander_date'=>$request->calanderDate,
            'has_journal'=>$request->hasJournal
        ];

        CheckJournal::create($journal_data);

        return response()->json([
            "data"=>"data has added"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function showByMonth($currentMonth)
    {
        $checked_journal_list = CheckJournal::where('current_month',$currentMonth)->get();
        return response()->json([
            "data"=>$checked_journal_list
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CheckJournal $checkJournal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCheckJournalRequest $request, CheckJournal $checkJournal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CheckJournal $checkJournal)
    {
        //
    }
}
