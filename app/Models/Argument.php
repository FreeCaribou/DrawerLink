<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * An argument for a specific topic
 *
 * id -> int
 * label -> string (255) not null
 * description -> string (2000) null
 * created_at -> datetime
 * updated_at -> datetime
 */
class Argument extends Model
{
    protected $fillable = ['label', 'description', 'argument_topic_id'];
}
