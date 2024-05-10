<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use App\Models\Doctor;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Doctor::all();
    }

    /**
     * Display the specified resource.
     */
    public function show(Doctor $doctor)
    {
        return $doctor;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorRequest $request, Doctor $doctor)
    {
        $doctor->update($request->validated());
        return $doctor;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctor $doctor)
    {
        $doctor->delete();
        return response()->noContent();
    }
}
