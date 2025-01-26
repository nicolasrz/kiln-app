<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Allowance extends Model
{
    protected $fillable = [
        'contract_address',
        'owner_address',
        'spender_address',
        'amount'
    ];


    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->attributes['amount'] = $attributes['amount'] ?? 0;
    }
}
