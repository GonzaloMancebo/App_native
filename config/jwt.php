<?php

/*
 * This file is part of jwt-auth.
 *
 * (c) Sean Tymon <tymon148@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

 return [
    'secret' => env('JWT_SECRET'),

    'ttl' => (int) env('JWT_TTL', 3600), // Default to 3600 if not set in .env

    'refresh_ttl' => (int) env('JWT_REFRESH_TTL', 20160), // Default to 20160 if not set in .env

    'algo' => env('JWT_ALGO', Tymon\JWTAuth\Providers\JWT\Provider::ALGO_HS256),

    'required_claims' => [
        'iss',
        'iat',
        'exp',
        'nbf',
        'sub',
        'jti',
    ],

    'persistent_claims' => [
        // 'foo',
        // 'bar',
    ],

    'lock_subject' => true,

    'leeway' => (int) env('JWT_LEEWAY', 0),

    'blacklist_enabled' => env('JWT_BLACKLIST_ENABLED', true),

    'blacklist_grace_period' => (int) env('JWT_BLACKLIST_GRACE_PERIOD', 0),

    'decrypt_cookies' => false,

    'providers' => [
        'jwt' => Tymon\JWTAuth\Providers\JWT\Lcobucci::class,
        'auth' => Tymon\JWTAuth\Providers\Auth\Illuminate::class,
        'storage' => Tymon\JWTAuth\Providers\Storage\Illuminate::class,
    ],
];

