<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    public function getMyself()
    {
        return Inertia::render('user-page', [
            'user' => Auth::user(),
        ]);
    }

    public function updateMyself(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);
        $user = User::find(Auth::id());
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->save();
        Log::info('User information updated '.$user->id);

        return back()->with('user', $user);
    }
}
