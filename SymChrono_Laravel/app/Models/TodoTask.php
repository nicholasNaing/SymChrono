<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TodoTask extends Model
{
    protected $fillable = ['user_models_id','desc','checked_status'];

    public function user(){
        return $this->belongsTo(UserModel::class);
    }
}
