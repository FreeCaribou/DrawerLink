<?php

namespace App\Http\Controllers;

use App\Models\Argument;
use App\Models\ArgumentTopic;
use App\Models\SavedLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ArgumentController extends Controller
{
    public function home()
    {
        $argumentTopics = ArgumentTopic::where('user_id', Auth::id())->withCount('savedLinks')->withCount('arguments')->get();

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

    public function editTopic(int $argumentTopicId, Request $request)
    {
        $request->validate([
            'label' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
        ]);

        $argumentTopic = ArgumentTopic::with('arguments')->find($argumentTopicId);
        if (Auth::id() != $argumentTopic->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-argument-topic']);
        }
        $argumentTopic->update([
            'label' => $request->label,
            'description' => $request->description,
        ]);
        Log::info('Update of of argument topic '.$argumentTopicId);
    }

    public function addArgument(int $argumentTopicId, Request $request)
    {
        $request->validate([
            'label' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
        ]);

        $argumentTopic = ArgumentTopic::with('arguments')->find($argumentTopicId);
        if (Auth::id() != $argumentTopic->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-argument-topic']);
        }

        $newArgument = Argument::create([
            'label' => $request->label,
            'description' => $request->description,
            'argument_topic_id' => $argumentTopicId,
        ]);

        Log::info('Creation of an argument for the topic with id '.$argumentTopicId);
    }

    public function addLink(int $argumentTopicId, Request $request)
    {
        $request->validate([
            'saved_link_id' => 'required',
        ]);

        $argumentTopic = ArgumentTopic::with('arguments')->find($argumentTopicId);
        $savedLink = SavedLink::find($request->saved_link_id);
        if (Auth::id() != $argumentTopic->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-argument-topic']);
        }
        if (Auth::id() != $savedLink->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-link']);
        }

        $argumentTopic->savedLinks()->attach($savedLink);

        Log::info('Link the argument topic '.$argumentTopicId.' with the saved link '.$request->saved_link_id);
    }

    public function deleteOneTopic(int $argumentTopicId)
    {
        $argumentTopic = ArgumentTopic::find($argumentTopicId);
        if (Auth::id() != $argumentTopic->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-argument-topic']);
        }

        $argumentTopic->delete();
        Log::info('Argument topic delete '.$argumentTopicId);

        return redirect()->route('arguments-home');
    }

    public function deleteOneArgument(int $argumentTopicId, int $argumentId)
    {
        $argumentTopic = ArgumentTopic::find($argumentTopicId);
        if (Auth::id() != $argumentTopic->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-argument-topic']);
        }
        $argument = Argument::find($argumentId);
        $argument->delete();
        Log::info('Argument delete '.$argumentId.' from topic '.$argumentTopicId);
    }

    public function deleteOneArgumentLink(int $argumentTopicId, int $savedLinkId)
    {
        $argumentTopic = ArgumentTopic::find($argumentTopicId);
        if (Auth::id() != $argumentTopic->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-argument-topic']);
        }
        $savedLink = SavedLink::find($savedLinkId);
        $argumentTopic->savedLinks()->detach($savedLink);

        Log::info('Argument link delete '.$savedLinkId.' from topic '.$argumentTopicId);
    }
}
