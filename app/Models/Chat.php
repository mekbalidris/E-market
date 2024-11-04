<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'post_id',
        'user_id',
        'post_link'
    ];

    public $timestamps = false;
}