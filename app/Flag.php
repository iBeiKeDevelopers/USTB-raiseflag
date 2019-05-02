<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Flag extends Model
{
    protected $table = "flags";
    
    const CREATED_AT = NULL;
    const UPDATED_AT = NULL;

    protected $fillable = [
        'used_time',
    ];
}
