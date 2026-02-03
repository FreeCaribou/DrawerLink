<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * The props of the file
 * 
 * The divide the object prop and the object so I can easily get the prop data without the big content
 * 
 * id -> int
 * name -> string (255) not null
 * mime_type -> string (2000) not null
 * size -> string not null (bytes)
 * created_at -> datetime
 * updated_at -> datetime
 * saved_link -> SavedLink
 * saved_object -> SavedObject
 */
class SavedObjectProp extends Model
{
    /** @use HasFactory<\Database\Factories\SavedObjectPropFactory> */
    use HasFactory;

    protected $fillable = ['saved_link_id', 'name', 'mime_type', 'size'];

    public function savedLink(): BelongsTo
    {
        return $this->belongsTo(SavedLink::class);
    }

    public function savedObject(): HasOne
    {
        return $this->hasOne(SavedObject::class);
    }
}
