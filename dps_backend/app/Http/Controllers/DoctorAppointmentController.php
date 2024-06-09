<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDoctorAppointmentRequest;
use App\Http\Requests\UpdateDoctorAppointmentRequest;
use App\Models\DoctorAppointment;

class DoctorAppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DoctorAppointment::all();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorAppointmentRequest $request)
    {
        $user = auth()->user();
        $patientId = $user->patient->id;
        // Validate the request data
        $validated = $request->validated();

        // Add patient_id to the validated data
        $validated['patient_id'] = $patientId;
        // Create the doctor appointment with the validated data
        $doctorAppointment = DoctorAppointment::create($validated);
        $doctorAppointment->save();
        return ['doctorAppointment' => $doctorAppointment];
    }

    /**
     * Display the specified resource.
     */
    public function show(DoctorAppointment $appointment)
    {
        $user = auth()->user();
        $userId = $user->patient->id;

        $appointments = DoctorAppointment::query()
            ->where('patient_id', $userId)
            ->with('doctor')
            ->get();

        return $appointments;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorAppointmentRequest $request, DoctorAppointment $doctorAppointment)
    {
        $doctorAppointment->update($request->validated());
        return $doctorAppointment;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DoctorAppointment $doctorAppointment)
    {
        $doctorAppointment->delete();
        return response()->noContent();
    }
}
