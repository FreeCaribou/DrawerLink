<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;

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
 * user -> User
 * tags -> Tag[]
 * full_source -> string
 * base_source -> string a full source is https://jacobin.com/2026/02/natural-disaster-insurance-california-wildfires and the base source is jacobin.com
 * source_date -> date

 */
class SavedLink extends Model
{
    protected $fillable = ['label', 'description', 'user_id', 'draw_id', 'source_date', 'full_source', 'base_source'];

    public function savedObjectProps(): HasMany
    {
        return $this->hasMany(SavedObjectProp::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function draw(): BelongsTo
    {
        return $this->belongsTo(Draw::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function setSourceDateAttribute($value)
    {
        if (!empty($value)) {
            try {
                $this->attributes['source_date'] = Carbon::createFromFormat('d/m/Y', $value)->format('Y-m-d');
            } catch (\Exception $e) {
                $this->attributes['source_date'] = null;
            }
        } else {
            $this->attributes['source_date'] = null;
        }
    }
}
