<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SelfAnalysis extends Model
{
    const CREATED_AT = 'creation_date';
    const UPDATED_AT = 'updated_date';

    protected $fillable = ['user_models_id','emotion','blue','green','orange','red','yellow','expense','rating'];

    public function user(){
        return $this->belongsTo(UserModel::class);
    }
}
