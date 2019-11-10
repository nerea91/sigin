<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
	public function run()
	{
		$users = [
			['id' => 1, 'name' => 'Nerea', 'password' => Hash::make('secret'), 'email' => 'nerea.munoz@beroomers.com'],
		];

		DB::table('users')->insert($users);
	}
}
