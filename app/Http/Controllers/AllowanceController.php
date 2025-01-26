<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostAllowanceRequest;
use App\Http\Requests\PutAllowanceRequest;
use App\Models\Allowance;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AllowanceController extends Controller
{
    public function index(): Response
    {
        $allowances = Allowance::all();
        return Inertia::render('AllowancesIndex', ['allowances' => $allowances]);
    }

    public function create(): Response
    {
        return Inertia::render('AllowancesCreate');
    }

    public function store(PostAllowanceRequest $request): Response|RedirectResponse
    {
        try {
            $allowance = Allowance::create($request->validated());
            return redirect()
                ->route('allowances.index', ['h' => $allowance->id])
                ->with('message', 'Allowance created successfully');

        } catch (\Exception $e) {
            return Inertia::render('Allowances/Index', [
                'allowances' => Allowance::all(),
                'message' => 'Failed to create allowance: ' . $e->getMessage(),
            ]);
        }
    }

    public function edit(Allowance $allowance): Response
    {
        return Inertia::render('AllowancesEdit', ['allowance' => $allowance]);
    }

    public function update(PutAllowanceRequest $request, int $id): Response|RedirectResponse
    {
        try {
            $allowance = Allowance::findOrFail($id);
            $allowance->update($request->validated());

            return redirect()
                ->route('allowances.index', ['h' => $allowance->id])
                ->with('message', 'Allowance updated successfully');
        } catch (\Exception $e) {
            return redirect()
                ->route('allowances.index')
                ->with('message', 'Failed to update allowance: ' . $e->getMessage());
        }
    }

    public function destroy(int $id): Response|RedirectResponse
    {
        try {
            $allowance = Allowance::findOrFail($id);
            $allowance->delete();
            return redirect()->route('allowances.index')->with('message', 'Allowance deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('allowances.index')->with('message', 'Failed to delete allowance: ' . $e->getMessage());
        }
    }


}
