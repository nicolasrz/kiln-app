<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AllowanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 9; $i++) {
            DB::table('allowances')->insert([
                'contract_address' => Str::random(15),
                'owner_address' => Str::random(15),
                'spender_address' => Str::random(15),
                'amount' => rand(1, 500),
            ]);
        }
    }
}
