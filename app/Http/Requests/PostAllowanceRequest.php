<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostAllowanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'contract_address' => 'required|string|max:255',
            'owner_address' => 'required|string|max:255',
            'spender_address' => 'required|string|max:255',
        ];
    }
}
