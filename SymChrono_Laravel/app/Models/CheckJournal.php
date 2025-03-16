<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CheckJournal extends Model
{
    const CREATED_AT = 'creation_date';
    const UPDATED_AT = 'updated_date';

    protected $fillable = ['user_models_id','current_month','calander_date','has_journal'];


    public function user(){
        return $this->belongsTo(UserModel::class);
    }
}
