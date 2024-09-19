<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Boost;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\PurchaseBoostRequest;
use App\Http\Requests\ReadBoostRequest;
use App\Services\BoostService;
use Illuminate\Http\Request;

class BoostController extends BaseController
{
    public function __construct(
        protected BoostService $boostService
    )
    {
    }

    public function all(Request $httpRequest): JsonResponse
    {
        $isUserAuthorized = $this->checkTelegramData($httpRequest);
        if (!$isUserAuthorized) {
            return response()->json([
                'error' => 'Unauthorized',
                'error_code' => 'unauthorized',
            ], 401);
        }

        return response()->json($this->boostService->getAllBoosts());
    }

    public function read(ReadBoostRequest $httpRequest): JsonResponse
    {
        $isUserAuthorized = $this->checkTelegramData($httpRequest);
        if (!$isUserAuthorized) {
            return response()->json([
                'error' => 'Unauthorized',
                'error_code' => 'unauthorized',
            ], 401);
        }

        $boostIdentifier = $httpRequest->getBoostId();

        return response()->json($this->boostService->read($boostIdentifier));
    }

    public function purchase(PurchaseBoostRequest $httpRequest): JsonResponse
    {
        $isUserAuthorized = $this->checkTelegramData($httpRequest);
        if (!$isUserAuthorized) {
            return response()->json([
                'error' => 'Unauthorized',
                'error_code' => 'unauthorized',
            ], 401);
        }

        $boostIdentifier = $httpRequest->getBoostId();

        $currentUserData = $this->getCurrentUserInfo($httpRequest);
        $currentUserId = $currentUserData['id'];

        return response()->json($this->boostService->purchaseBoost($boostIdentifier, $currentUserId));
    }
}
