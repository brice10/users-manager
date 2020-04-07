<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

use App\User;

class UserController extends Controller
{
    //Get all Users in database
    public function getAllUsers() {
        return response()->json(User::all(), 200);
    }

    //Get user by id
    public function getUserById($id) {
		return response()->json(User::find($id), 200);
    }

    //Get user by id
    public function getUserByEmailAndPassword($email, $password) {
      return response()->json(User::where([
            ['email', '=', $email],
            ['password', '=', $password],
          ])->get()
        , 200);
    }

    //Create a user in dadabase
    public function createUser(Request $request) {
		return User::create($request->all());
    }

    //Update a user in database
    public function updateUser(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return $user;
    }

    //Delete a user in database
    public function deleteUser(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->delete();
        return 204;
    }
	
	//Return url of upload file
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function uploadImage(Request $request)
    {
		if ($request->hasFile('image'))
		{
			$file      = $request->file('image');
			$filename  = $file->getClientOriginalName();
			$extension = $file->getClientOriginalExtension();
			$picture   = date('His').'-'.$filename;
			$file->move(public_path('images'), $picture);
			return response()->json(["message" => "Image Uploaded Succesfully", "photoUrl" => "http://localhost:8000/api/" . $filename]);
		} else {
			return response()->json(["message" => "Select image first."]);
		}
    }
	
	public function getImage($photoUrl) {
		
	}
	
}
