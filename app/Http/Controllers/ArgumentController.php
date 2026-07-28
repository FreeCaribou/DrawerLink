<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\ArgumentTopic;
use App\Models\Argument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

    public function addTopic(Request $request)
    {
        $request->validate([
            'label' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
        ]);

        $newArgumentTopic = ArgumentTopic::create([
            'label' => $request->label,
            'description' => $request->description,
            'user_id' => Auth::id(),
        ]);

        Log::info('Creation of argument topic');

        return redirect()->route('arguments-detail', ['argumentTopicId' => $newArgumentTopic->id]);
    }

    public function addArgument(int $argumentTopicId, Request $request)
    {
        $request->validate([
            'label' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
        ]);

        $argumentTopic = ArgumentTopic::with('arguments')->find($argumentTopicId);
        if (Auth::id() != $argumentTopic->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-argument-topic']);
        }

        $newArgument = Argument::create([
            'label' => $request->label,
            'description' => $request->description,
            'argument_topic_id' => $argumentTopicId
        ]);

        Log::info('Creation of an argument for the topic with id ' . $argumentTopicId);
    }
}
