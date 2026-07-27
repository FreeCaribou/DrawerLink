<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\ArgumentTopic;

class ArgumentController extends Controller
{
    public function home()
    {
        $userId = Auth::user()->id;
        $argumentTopics = ArgumentTopic::where('user_id', $userId)->with('arguments')->get();

        return Inertia::render('arguments-home', ['argumentTopics' => $argumentTopics]);
    }

    public function detail(int $argumentTopicId)
    {
        $userId = Auth::user()->id;
        $argumentTopic = ArgumentTopic::with('arguments')->find($argumentTopicId);
        if ($userId != $argumentTopic->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-argument-topic']);
        }

        return Inertia::render('argument-detail', ['argumentTopic' => $argumentTopic]);
    }
}
