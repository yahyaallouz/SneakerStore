<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_email' => 'required|email',
            'total' => 'required',
            'items' => 'required|array',
        ]);

        return DB::transaction(function () use ($request) {
            // Generate tracking number - matching format TRK123A
            $tracking = 'TRK' . rand(100, 999) . chr(rand(65, 90));

            $order = Order::create([
                'tracking_number' => $tracking,
                'user_email' => $request->input('user_email'),
                'total' => $request->input('total'),
                'payment_method' => $request->input('payment_method', 'Card'),
            ]);

            foreach ($request->input('items') as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'size' => $item['size'] ?? 'N/A',
                    'price_at_purchase' => $item['price'],
                ]);
            }

            return response()->json([
                'message' => 'Order created',
                'orderId' => $order->id,
                'trackingNumber' => $tracking
            ], 201);
        });
    }

    public function track($trackingNumber)
    {
        // Case-insensitive search like Express
        $order = Order::whereRaw('LOWER(tracking_number) = ?', [strtolower($trackingNumber)])->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required'
        ]);

        $order = Order::findOrFail($id);
        $order->update([
            'status' => $request->input('status')
        ]);

        return response()->json(['message' => 'Order status updated']);
    }

    public function analytics(Request $request)
    {
        $period = $request->query('period');
        $days = 7;
        if ($period === '1m') $days = 30;
        elseif ($period === '3m') $days = 90;
        elseif ($period === '1y') $days = 365;

        // Calculate start date
        $startDate = now()->subDays($days)->startOfDay();

        $rows = DB::table('orders')
            ->select(
                DB::raw("DATE_FORMAT(created_at, '%Y-%m-%d') as date"),
                DB::raw("SUM(CASE WHEN status != 'Refunded' THEN total ELSE 0 END) as sales"),
                DB::raw("COUNT(CASE WHEN status != 'Refunded' THEN 1 END) as orders"),
                DB::raw("COUNT(CASE WHEN status = 'Refunded' THEN 1 END) as refunds")
            )
            ->where('created_at', '>=', $startDate)
            ->groupBy(DB::raw("DATE(created_at)"))
            ->orderBy('date', 'asc')
            ->get();

        $formattedRows = $rows->map(function ($row) {
            return [
                'date' => $row->date,
                'sales' => (float)$row->sales,
                'orders' => (int)$row->orders,
                'refunds' => (int)$row->refunds,
            ];
        });

        $totalSales = $formattedRows->sum('sales');
        $totalOrders = $formattedRows->sum('orders');
        $totalRefunds = $formattedRows->sum('refunds');

        return response()->json([
            'totalSales' => $totalSales,
            'totalOrders' => $totalOrders,
            'totalRefunds' => $totalRefunds,
            'timeSeries' => $formattedRows
        ]);
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);

        // Load items with database query join to match client side expectations (flat array properties)
        $items = DB::table('order_items')
            ->leftJoin('products', 'order_items.product_id', '=', 'products.id')
            ->where('order_items.order_id', $id)
            ->select(
                'order_items.*',
                'products.name',
                'products.brand',
                'products.image_url'
            )
            ->get();

        $orderArray = $order->toArray();
        $orderArray['items'] = $items;

        return response()->json($orderArray);
    }
}
