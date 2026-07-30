<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
            'password' => ['nullable', 'string', 'confirmed'],

        ]);
        if ($request->filled('password')) {
            $request->validate([
                'current_password' => [
                    'required',
                    'string',
                    function ($attribute, $value, $fail) {
                        if (! Hash::check($value, Auth::user()->password)) {
                            $fail('Bad current password');
                        }
                    },
                ],
            ]);
        }
        $user = User::find(Auth::id());
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        if ($request->filled('password')) {
            $user->password = Hash::make($request->input('password'));
        }

        $user->save();
        Log::info('User information updated '.$user->id);

        return back()->with('user', $user);
    }
}
