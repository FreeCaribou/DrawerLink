<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * A draw, is like a category
 * 
 * id -> int
 * label -> string (255) not null
 * description -> string (2000) null
 * created_at -> datetime
 * updated_at -> datetime
 * saved_links -> SavedLink[]
 * user -> User
 */
class Draw extends Model
{
    protected $fillable = ['label', 'description', 'user_id'];

    public function savedLinks(): HasMany
    {
        return $this->hasMany(SavedLink::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
