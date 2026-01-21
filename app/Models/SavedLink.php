<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * The core of the app, the link that we want to save
 * Can be an article, a blog, why not a video, whatever we want
 * Why the word "saved link" ? because link can be interpreted like a key word
 * 
 * id -> int
 * label -> string (255) not null
 * description -> string (2000) null
 * created_at -> datetime
 * updated_at -> datetime
 * saved_object_props -> SavedObjectProp[]
 */
class SavedLink extends Model
{
    protected $fillable = ['label', 'description'];

    public function savedObjectProps(): HasMany
    {
        return $this->hasMany(SavedObjectProp::class);
    }
}
