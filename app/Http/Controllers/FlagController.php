<?php

namespace App\Http\Controllers;

use Cache;
use App\Flag;
use Illuminate\Http\Request;

class FlagController extends Controller
{
    private $model;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Flag $flag)
    {
        $this->model = $flag;
    }

    public function index() {
        return view('index');
    }

    public function upload(Request $request) {
        $flag = $this->model->create($this->validate($request, [
            'used_time'     =>      'required|numeric|min:0',
        ]));

        if (!$flag)
            return response()->json([
                'errmsg'        =>          '数据库炸了',
            ], 200);

        $flags = //Cache::remember('flags', 5, function () {
            Flag::all()->sortByDesc('used_time')->values()->all();
        // });

        $min = 0;
        $max = sizeof ($flags) - 1;
        $total = $max;
        $target = $flag->used_time;

        if ($target < $flags[$min]->used_time) {
            if ($target <= $flags[$max]->used_time) {
                $min = $max;
            } else {
                while (true) {
                    if ($max - $min < 2)
                        break;
            
                    $tmp = intval (($min + $max) / 2);
                    if ($target < $flags[$tmp]->used_time)
                        $min = $tmp;
                    else
                        $max = $tmp;
                }
            }
        }

        return response()->json([
            'all'           =>      $total + 1,
            'rank'          =>      $min + 1,
            'status'        =>      201,
        ], 201);
    }
}
