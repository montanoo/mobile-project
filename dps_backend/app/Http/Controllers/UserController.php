<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required']
        ]);
        $doctor = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['required', 'string']
        ]);

        $existing = User::query()->firstWhere('email', $credentials['email']);
        if (!empty($existing)) {
            throw ValidationException::withMessages(['email' => 'User already exists']);
        }

        $user = new User($credentials);
        $user->save();

        $doctor = new Doctor($doctor);
        $doctor->user_id = $user->id; // Set the user_id manually
        $doctor->save();

        $token = $user->createToken('token_name')->plainTextToken;
        return ['token' => $token,
        'user' => $user,
        'doctor' => $doctor];
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $user;
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->noContent();
    }

    public function my()
    {
        return request()->user();
    }


    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', Password::min(8)->letters()],
        ]);

        $user = User::query()->firstWhere('email', $credentials['email']);

        if (empty($user)) {
            throw ValidationException::withMessages(['email' => 'Wrong credentials']);
        }

        if (!Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages(['email' => 'Wrong credentials']);
        }

        $token = $user->createToken('token_name')->plainTextToken;

        return ['token' => $token];
    }

    public function logout()
    {
        $user = request()->user();
        $user->tokens()->delete();
        return response()->noContent();
    }
}
