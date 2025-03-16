<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiaryModel extends Model
{
    const CREATED_AT = 'creation_date';
    const UPDATED_AT = 'updated_date';

    protected $fillable = ['user_models_id','morning','afternoon','evening'];

    public function user(){
        return $this->belongsTo(UserModel::class);
    }
}
