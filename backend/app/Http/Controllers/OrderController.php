<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required',
            'phone'         => 'required',
            'address'       => 'required',
            'product_name'  => 'required',
            'quantity'      => 'required|integer',
            'total_price'   => 'required|numeric',
        ]);

        $order = Order::create([
            'customer_name' => $validated['customer_name'],
            'phone'         => $validated['phone'],
            'address'       => $validated['address'],
            'product_name'  => $validated['product_name'],
            'quantity'      => $validated['quantity'],
            'total_price'   => $validated['total_price'],
            'status'        => 'Pending',
            'user_id'       => Auth::id(),
        ]);

        return response()->json($order, 201);
    }

    public function index()
    {
        // Admin sees ALL orders, users see only their own
        if (Auth::user() && Auth::user()->is_admin) {
            return Order::all();
        }
        
        return Order::where('user_id', Auth::id())->get();
    }

    public function updateStatus($id)
    {
        $order = Order::findOrFail($id);

        if ($order->status == 'Pending') {
            $order->status = 'Approved';
        } elseif ($order->status == 'Approved') {
            $order->status = 'Completed';
        }

        $order->save();
        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json([
            'message' => 'Order deleted successfully'
        ]);
    }
}