<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    public function diaries(){
        return $this->hasMany(DiaryModel::class);
    }

    public function TodoTasks(){
        return $this->hasMany(TodoTask::class);
    }

    public function flashcards(){
        return $this->hasMany(Flashcard::class);
    }
    public function checkjournal(){
        return $this->hasMany(CheckJournal::class);
    }
}
