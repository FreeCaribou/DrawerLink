<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * A tag for the saved link
 * Useful for searching
 *
 * id -> int
 * label -> string (42) not null
 * created_at -> datetime
 * updated_at -> datetime
 * savedLinks -> SavedLink[]
 */
class Tag extends Model
{
    protected $fillable = ['label'];

    public function savedLinks(): BelongsToMany
    {
        return $this->belongsToMany(SavedLink::class);
    }
}
