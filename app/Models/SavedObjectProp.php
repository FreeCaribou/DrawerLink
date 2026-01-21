<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
