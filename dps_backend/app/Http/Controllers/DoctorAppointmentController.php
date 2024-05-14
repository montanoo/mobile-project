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
        $validated = $request->validated();
        $doctorAppointment = DoctorAppointment::create($validated);
        $doctorAppointment->save();
        return ['doctorAppointment' => $doctorAppointment];
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return DoctorAppointment::find($id);;
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
