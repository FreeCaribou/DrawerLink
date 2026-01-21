<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * The props of the file
 * 
 * id -> int
 * name -> string (255) not null
 * mime_type -> string (2000) not null
 * created_at -> datetime
 * updated_at -> datetime
 * saved_link -> SavedLink
 */
class SavedObjectProp extends Model
{
    /** @use HasFactory<\Database\Factories\SavedObjectPropFactory> */
    use HasFactory;

    protected $fillable = ['saved_link_id', 'name', 'mime_type'];

    public function savedLink(): BelongsTo
    {
        return $this->belongsTo(SavedLink::class);
    }
}
