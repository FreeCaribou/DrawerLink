<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\ArgumentTopic;

class ArgumentController extends Controller
{
    public function home()
    {
        $argumentTopics = ArgumentTopic::where('user_id', Auth::id())->with('arguments')->get();
        return Inertia::render('arguments-home', ['argumentTopics' => $argumentTopics]);
    }

    public function detail(int $argumentTopicId)
    {
        $argumentTopic = ArgumentTopic::with('arguments', 'savedLinks')->find($argumentTopicId);
        if (Auth::id() != $argumentTopic->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-argument-topic']);
        }

        return Inertia::render('argument-detail', ['argumentTopic' => $argumentTopic]);
    }
}
