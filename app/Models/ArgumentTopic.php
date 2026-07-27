<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * When an user want to prepar some argument for a specific topic
 *
 * id -> int
 * label -> string (255) not null
 * description -> string (2000) null
 * created_at -> datetime
 * updated_at -> datetime
 */
class ArgumentTopic extends Model
{
    protected $fillable = ['label', 'description', 'user_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function arguments(): HasMany
    {
        return $this->hasMany(Argument::class);
    }
}
