<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * The file
 *
 * id -> int
 * content -> text not null
 * saved_object -> SavedObject
 */
class SavedObject extends Model
{
    /** @use HasFactory<\Database\Factories\SavedObjectFactory> */
    use HasFactory;

    protected $fillable = ['content'];

    public function savedObjectProp(): BelongsTo
    {
        return $this->belongsTo(SavedObjectProp::class);
    }
}
