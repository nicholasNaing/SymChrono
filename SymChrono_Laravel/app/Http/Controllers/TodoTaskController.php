<?php

namespace App\Http\Controllers;

use App\Models\TodoTask;
use App\Http\Requests\StoreTodoTaskRequest;
use App\Http\Requests\UpdateTodoTaskRequest;

class TodoTaskController extends Controller
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
    public function store(StoreTodoTaskRequest $request)
    {
         $todo_task_data = [
            'user_models_id'=>1,
            'desc'=>$request->desc,     
            'checked_status'=>$request->checkedStatus       
        ];
        TodoTask::create($todo_task_data);
        return response()->json([
            "data"=>"data has added"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(TodoTask $todoTask)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TodoTask $todoTask)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoTaskRequest $request, TodoTask $todoTask)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TodoTask $todoTask)
    {
        //
    }
}
