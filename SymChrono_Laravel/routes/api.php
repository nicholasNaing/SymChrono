<?php

use App\Http\Controllers\CheckJournalController;
use App\Http\Controllers\DiaryModelController;
use App\Http\Controllers\FlashcardController;
use App\Http\Controllers\SelfAnalysisController;
use App\Http\Controllers\TodoTaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get("diary/{author_id}/{startDay}/{endDay}",[DiaryModelController::class,'showByDateAndAuthor']);
Route::resource("diary",DiaryModelController::class);

Route::get("flashcard/{author_id}/{startDay}/{endDay}",[FlashcardController::class,'showByDateAndAuthor']);
Route::resource("flashcard",FlashcardController::class);

Route::get("self-analysis/{author_id}/{startDay}/{endDay}",[SelfAnalysisController::class,'showByDateAndAuthor']);
Route::resource("self-analysis",SelfAnalysisController::class);

Route::get("todo/{author_id}/{date}",[TodoTaskController::class],'showByDateAndAuthor');
Route::resource("todo",TodoTaskController::class);

Route::get("finished-journal/{currentMonth}",[CheckJournalController::class,'showByMonth']);
Route::resource("finished-journal",CheckJournalController::class);




Route::get('/intro', [UserController::class, 'index']);
