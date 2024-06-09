<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Patient;
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
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:6'],
            'role' => ['required', 'in:2,3'],
        ]);

        $user = new User([
            'email' => $credentials['email'],
            'password' => bcrypt($credentials['password']),
            'role' => $credentials['role'],
        ]);
        $user->save();

        if ($credentials['role'] == 2) {
            $request->validate([
                'name' => ['required', 'string'],
                'description' => ['required', 'string'],
            ]);

            $doctor = new Doctor([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
            ]);
            $doctor->user()->associate($user);
            $doctor->save();
            $registrationType = 'doctor';
        } else {
            $request->validate([
                'name' => ['required', 'string'],
                'surname' => ['required', 'string'],
                'age' => ['required', 'integer'],
                'phone' => ['required', 'string'],
                'description' => ['required', 'string'],
            ]);

            $patient = new Patient([
                'name' => $request->input('name'),
                'surname' => $request->input('surname'),
                'age' => $request->input('age'),
                'phone' => $request->input('phone'),
                'description' => $request->input('description'),
            ]);
            $patient->user()->associate($user);
            $patient->save();
            $registrationType = 'patient';
        }

        $token = $user->createToken('token_name')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
            $registrationType => ($credentials['role'] == 2) ? $doctor : $patient,
        ], 201);
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

        return ['token' => $token, 'user' => $user];
    }

    public function logout()
    {
        $user = request()->user();
        $user->tokens()->delete();
        return response()->noContent();
    }
}
